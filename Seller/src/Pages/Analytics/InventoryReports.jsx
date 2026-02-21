import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/api";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Changed to direct function import
import { 
  MdInventory, MdTrendingUp, MdTrendingDown, 
  MdOutlineHourglassEmpty, MdNotificationsActive, MdPictureAsPdf 
} from "react-icons/md";
import { FiPackage, FiDownload, FiSearch } from "react-icons/fi";

function InventoryReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); 

  const formatINR = (amt) => new Intl.NumberFormat('en-IN', { 
    style: 'currency', currency: 'INR', maximumFractionDigits: 0 
  }).format(amt || 0);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/seller-panel/analytics/inventory');
      if (res.data.success) setData(res.data.data);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  // ✅ DYNAMIC FILTER LOGIC
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.productReport.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterStatus === "low") return matchesSearch && p.currentStock > 0 && p.currentStock < 10;
      if (filterStatus === "out") return matchesSearch && p.currentStock <= 0;
      if (filterStatus === "high") return matchesSearch && p.currentStock >= 50;
      return matchesSearch;
    });
  }, [data, searchTerm, filterStatus]);

  // ✅ EXCEL EXPORT
  const exportExcel = () => {
    const sheetData = filteredProducts.map(p => ({
      "Product Name": p.name,
      "Daily Sale": p.dailySale,
      "Weekly Sale": p.weeklySale,
      "Monthly Sale": p.monthlySale,
      "Stock Level": p.currentStock,
      "Unit Price": p.price,
      "Inventory Value": p.value
    }));
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, `Inventory_Report_${filterStatus}.xlsx`);
  };

  // ✅ PDF GENERATOR (FIXED)
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header Style
    doc.setFillColor(63, 63, 70); // zinc-700
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("INVENTORY ANALYSIS REPORT", 14, 22);
    
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text(`Scope: ${filterStatus.toUpperCase()} | Generated: ${new Date().toLocaleString()}`, 14, 32);

    // Summary Body
    const tableRows = filteredProducts.map(p => [
      p.name, 
      p.dailySale, 
      p.monthlySale, 
      p.currentStock, 
      p.price.toString(), 
      p.value.toString()
    ]);

    // ✅ FIXED: Using autoTable(doc, options) instead of doc.autoTable
    autoTable(doc, {
      startY: 45,
      head: [['Product Name', 'Daily', 'Monthly', 'Stock', 'Price', 'Total Value']],
      body: tableRows,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255] }, // Indigo-600
      alternateRowStyles: { fillColor: [249, 250, 251] },
      margin: { top: 45 }
    });

    doc.save(`Inventory_Analysis_${filterStatus}.pdf`);
  };

  if (loading || !data) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold">Synchronizing Assets...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Inventory Reports</h1>
          <p className="text-sm text-slate-500 font-medium italic">Managed Inventory • {data.summary.totalProducts} Active SKUs</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button onClick={exportExcel} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
            <FiDownload className="text-emerald-500 text-lg" /> EXCEL
          </button>
          <button onClick={generatePDF} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs hover:bg-black transition-all shadow-lg">
            <MdPictureAsPdf className="text-lg text-rose-400" /> PDF REPORT
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Inventory Value" value={formatINR(data.summary.inventoryValue)} icon={<MdInventory/>} accent="indigo" />
        <StatCard title="Unsold Products" value={data.summary.unsoldCount} icon={<MdOutlineHourglassEmpty/>} accent="amber" />
        <StatCard title="Low Stock Items" value={data.summary.lowStockCount} icon={<MdNotificationsActive/>} accent="rose" />
        <StatCard title="In Stock Units" value={data.summary.totalProducts} icon={<FiPackage/>} accent="emerald" />
      </div>

      {/* CONTROLS: SEARCH & TABS */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" placeholder="Search product name..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-sm rounded-2xl w-full md:w-auto overflow-x-auto whitespace-nowrap">
          <FilterTab active={filterStatus === "all"} label="All SKUs" onClick={() => setFilterStatus("all")} />
          <FilterTab active={filterStatus === "low"} label="Low" onClick={() => setFilterStatus("low")} />
          <FilterTab active={filterStatus === "high"} label="Overstock" onClick={() => setFilterStatus("high")} />
          <FilterTab active={filterStatus === "out"} label="Stockout" onClick={() => setFilterStatus("out")} />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Product Information</th>
                <th className="px-4 py-6 text-center">Daily</th>
                <th className="px-4 py-6 text-center">Monthly</th>
                <th className="px-4 py-6 text-center">Stock Status</th>
                <th className="px-8 py-6 text-right">Net Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="group hover:bg-indigo-50/30 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                        <img src={p.image} className="w-full h-full object-cover" alt=""/>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 leading-tight mb-1">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {p._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`text-xs font-black ${p.dailySale > 0 ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {p.dailySale > 0 ? `-${p.dailySale}` : "0"}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center font-bold text-slate-500 text-xs">-{p.monthlySale}</td>
                  <td className="px-4 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      p.currentStock <= 0 ? "bg-rose-50 text-rose-600 border border-rose-100" :
                      p.currentStock < 10 ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                    }`}>
                      {p.currentStock} Units
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-slate-800 text-sm tracking-tighter">
                    {formatINR(p.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center gap-4">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-3xl"><FiSearch /></div>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching assets found</p>
            </div>
          )}
        </div>
      </div>

      {/* INSIGHT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <InsightCard title="Fastest Moving" data={data.fastMoving} type="fast" />
        <InsightCard title="Requires Attention" data={data.unsoldProducts.slice(0, 5)} type="unsold" />
      </div>
    </div>
  );
}

// ✅ CLEAN SUB-COMPONENTS
const StatCard = ({ title, value, icon, accent }) => {
    const themes = {
        indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
        amber: "text-amber-600 bg-amber-50 border-amber-100",
        rose: "text-rose-600 bg-rose-50 border-rose-100",
        emerald: "text-emerald-600 bg-emerald-50 border-emerald-100"
    };
    return (
        <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className={`${themes[accent]} p-5 rounded-2xl text-2xl transition-transform group-hover:scale-110 duration-500`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{title}</p>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{value}</h3>
            </div>
        </div>
    );
};

const FilterTab = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${active ? "bg-white text-indigo-600 shadow-md" : "text-slate-500 hover:text-slate-800"}`}>
    {label}
  </button>
);

const InsightCard = ({ title, data, type }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
      {type === 'fast' ? <MdTrendingUp className="text-emerald-500 text-2xl" /> : <MdTrendingDown className="text-rose-500 text-2xl" />}
      <h3 className="font-black text-slate-700 uppercase tracking-widest text-xs">{title}</h3>
    </div>
    <div className="space-y-4">
      {data.map(p => (
        <div key={p._id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-50 hover:bg-white hover:shadow-md transition-all">
          <p className="text-xs font-bold text-slate-600 truncate w-2/3">{p.name}</p>
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${type === 'fast' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {type === 'fast' ? `${p.monthlySale} Units Sold` : 'Zero Velocity'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default InventoryReports;