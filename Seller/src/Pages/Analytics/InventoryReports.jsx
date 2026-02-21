import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/api";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import { 
  MdInventory, MdTrendingUp, MdTrendingDown, 
  MdOutlineHourglassEmpty, MdNotificationsActive, MdPictureAsPdf 
} from "react-icons/md";
import { FiPackage, FiDownload, FiSearch, FiCalendar } from "react-icons/fi";

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

  // ✅ ફિલ્ટર લોજિક (Filter Logic)
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

  // ✅ EXCEL એક્સપોર્ટ (Excel Export)
  const exportExcel = () => {
    const sheetData = filteredProducts.map(p => ({
      "Product Name": p.name,
      "Daily Sale": p.dailySale,
      "Weekly Sale": p.weeklySale,
      "Monthly Sale": p.monthlySale,
      "Current Stock": p.currentStock,
      "Unit Price": p.price,
      "Total Valuation": p.value,
    }));
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, `Inventory_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  // ✅ PDF એક્સપોર્ટ (PDF Export)
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(30, 41, 59); // Dark Slate
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("INVENTORY PERFORMANCE REPORT", 14, 25);
    doc.setFontSize(10);
    doc.text(`Scope: ${filterStatus.toUpperCase()} | Generated: ${new Date().toLocaleString()}`, 14, 33);

    const tableRows = filteredProducts.map(p => [
      p.name, p.dailySale, p.weeklySale, p.monthlySale, p.currentStock, p.value
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Product', 'Daily', 'Weekly', 'Monthly', 'Stock', 'Value']],
      body: tableRows,
      headStyles: { fillColor: [79, 70, 229] }, // Indigo
      theme: 'grid'
    });

    doc.save(`Inventory_Performance.pdf`);
  };

  if (loading || !data) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-black tracking-widest animate-pulse uppercase text-xs">Processing Stock Matrix...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-10 space-y-8 bg-[#F8FAFC] min-h-screen">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Warehouse Intelligence</h1>
          <p className="text-sm text-slate-500 font-medium">Daily, Weekly and Monthly Performance Tracking</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button onClick={exportExcel} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
            <FiDownload className="text-emerald-500 text-lg" /> EXCEL
          </button>
          <button onClick={generatePDF} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs hover:bg-black transition-all shadow-lg">
            <MdPictureAsPdf className="text-lg text-rose-400" /> PDF REPORT
          </button>
        </div>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Asset Value" value={formatINR(data.summary.inventoryValue)} icon={<MdInventory/>} accent="indigo" />
        <StatCard title="Unsold Products" value={data.summary.unsoldCount} icon={<MdOutlineHourglassEmpty/>} accent="amber" />
        <StatCard title="Low Stock SKUs" value={data.summary.lowStockCount} icon={<MdNotificationsActive/>} accent="rose" />
        <StatCard title="Managed SKUs" value={data.summary.totalProducts} icon={<FiPackage/>} accent="emerald" />
      </div>

      {/* 3. SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" placeholder="Search product name..." 
            className="w-full pl-14 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-4 ring-indigo-500/5 outline-none transition-all font-semibold"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex p-1 bg-slate-100 rounded-2xl w-full md:w-auto overflow-x-auto whitespace-nowrap">
          <FilterTab active={filterStatus === "all"} label="All Products" onClick={() => setFilterStatus("all")} />
          <FilterTab active={filterStatus === "low"} label="Low Stock" onClick={() => setFilterStatus("low")} />
          <FilterTab active={filterStatus === "high"} label="High Stock" onClick={() => setFilterStatus("high")} />
          <FilterTab active={filterStatus === "out"} label="Stockout" onClick={() => setFilterStatus("out")} />
        </div>
      </div>

      {/* 4. DATA TABLE (Main Matrix) */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Asset Detail</th>
                <th className="px-4 py-6 text-center">Daily</th>
                <th className="px-4 py-6 text-center">Weekly</th>
                <th className="px-4 py-6 text-center">Monthly</th>
                <th className="px-4 py-6 text-center">In Stock</th>
                <th className="px-8 py-6 text-right">Net Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="group hover:bg-indigo-50/30 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                        <img src={p.image} className="w-full h-full object-cover" alt=""/>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 leading-tight mb-1">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">SKU: {p._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-xs ${p.dailySale > 0 ? 'bg-emerald-100 text-emerald-600 shadow-sm' : 'bg-slate-50 text-slate-300'}`}>
                        {p.dailySale > 0 ? `-${p.dailySale}` : "0"}
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`text-xs font-bold ${p.weeklySale > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                        -{p.weeklySale}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`text-xs font-bold ${p.monthlySale > 0 ? 'text-slate-700' : 'text-slate-400'}`}>
                        -{p.monthlySale}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border inline-block ${
                      p.currentStock <= 0 ? "bg-rose-50 text-rose-600 border-rose-100" :
                      p.currentStock < 10 ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-white text-slate-400 border-slate-100"
                    }`}>
                      {p.currentStock} Units
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-slate-900 text-sm tracking-tighter">
                    {formatINR(p.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center gap-4">
               <FiInbox className="text-slate-200 text-6xl" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Assets Matching Current Filter</p>
            </div>
          )}
        </div>
      </div>

      {/* 5. BOTTOM INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <InsightCard title="High Velocity Assets" data={data.fastMoving} type="fast" />
        <InsightCard title="Dormant Inventory" data={data.unsoldProducts.slice(0, 5)} type="unsold" />
      </div>
    </div>
  );
}

// ✅ SUB-COMPONENTS (Clean & Modern)
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
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
      {type === 'fast' ? <MdTrendingUp className="text-emerald-500 text-2xl" /> : <MdTrendingDown className="text-rose-500 text-2xl" />}
      <h3 className="font-black text-slate-700 uppercase tracking-widest text-xs">{title}</h3>
    </div>
    <div className="space-y-4">
      {data.map(p => (
        <div key={p._id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-50 hover:bg-white transition-all">
          <p className="text-xs font-bold text-slate-600 truncate w-2/3">{p.name}</p>
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${type === 'fast' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {type === 'fast' ? `${p.monthlySale} Sold` : 'No Sales'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default InventoryReports;