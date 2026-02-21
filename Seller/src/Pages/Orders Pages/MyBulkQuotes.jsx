import React, { useEffect, useState } from "react";
import { getSellerBulkQuotes, updateQuoteStatus } from "../../utils/bulkQuoteService";
import { toast } from "react-toastify";
import {
  FiPackage, FiMapPin, FiCalendar, FiMail,
  FiPhone, FiUser, FiBriefcase, FiInfo, FiHash,
  FiCheckCircle, FiXCircle, FiFilter, FiRefreshCw
} from "react-icons/fi";

const SellerBulkQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const data = await getSellerBulkQuotes(startDate, endDate);
    if (data.success) {
      setQuotes(data.filteredQuotes);
    } else {
      toast.error("Failed to fetch inquiries");
    }
    setLoading(false);
  };

  const handleStatusChange = async (quoteId, status) => {
    const res = await updateQuoteStatus(quoteId, status);
    if (res.success) {
      toast.success(`Quote marked as ${status}`);
      fetchQuotes();
    } else {
      toast.error("Status update failed");
    }
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      case "approved": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "rejected": return "bg-rose-50 text-rose-600 border-rose-100";
      case "completed": return "bg-blue-50 text-blue-600 border-blue-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Updating list...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Bulk Requests <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm font-bold">Seller Hub</span>
            </h1>
            <p className="text-slate-500 mt-1">Review, manage, and approve high-volume customer inquiries.</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <div className="px-4 py-2 text-center border-r border-slate-100">
              <p className="text-[10px] uppercase font-black text-slate-400">Total Requests</p>
              <p className="text-xl font-black text-slate-800">{quotes.length}</p>
            </div>
            <div className="px-4 py-2 text-center">
              <p className="text-[10px] uppercase font-black text-slate-400">Total Value</p>
              <p className="text-xl font-black text-indigo-600">
                ₹{quotes.reduce((acc, q) => acc + q.totalAmount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </header>

        {/* Filter Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full md:w-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FiCalendar /> From Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FiCalendar /> To Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={fetchQuotes}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-indigo-100 shadow-lg"
              >
                <FiFilter /> Filter
              </button>
              <button
                onClick={() => { setStartDate(""); setEndDate(""); fetchQuotes(); }}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                <FiRefreshCw /> Reset
              </button>
            </div>
          </div>
        </section>

        {quotes.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200">
            <FiPackage className="mx-auto text-7xl text-slate-200 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">No inquiries found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your date range or check back later for new customer requests.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {quotes.map((quote) => (
              <div key={quote._id} className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">

                {/* Card Top Header */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-slate-800 font-mono font-black text-xs">
                      #{quote.quoteId}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(quote.status)}`}>
                      {quote.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {quote.status === "Pending" && (
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusChange(quote._id, "Approved")} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm">
                          <FiCheckCircle size={14} /> Approve
                        </button>
                        <button onClick={() => handleStatusChange(quote._id, "Rejected")} className="flex items-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-rose-100">
                          <FiXCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                    {quote.status === "Approved" && (
                      <button onClick={() => handleStatusChange(quote._id, "Completed")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-100">
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left: Client & Delivery Info */}
                    <div className="lg:col-span-4 space-y-6 border-r border-slate-50 pr-0 lg:pr-8">
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">Customer Profile</h4>
                        <div className="space-y-3">
                          <p className="flex items-center gap-3 text-slate-900 font-bold"><FiBriefcase className="text-indigo-400" /> {quote.companyName}</p>
                          <p className="flex items-center gap-3 text-slate-600 text-sm"><FiUser className="text-slate-400" /> {quote.contactPerson}</p>
                          <div className="pt-2 flex flex-col gap-1.5 border-t border-slate-50">
                            <a href={`mailto:${quote.email}`} className="flex items-center gap-3 text-indigo-600 text-sm font-medium hover:underline"><FiMail className="text-slate-400" /> {quote.email}</a>
                            <p className="flex items-center gap-3 text-slate-600 text-sm font-medium"><FiPhone className="text-slate-400" /> {quote.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">Shipping & Logistics</h4>
                        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
                          <div className="flex gap-3 text-sm leading-relaxed">
                            <FiMapPin className="text-rose-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-slate-800 font-bold">{quote.deliveryAddress?.address}</p>
                              <p className="text-slate-500">{quote.deliveryAddress?.city}, {quote.deliveryAddress?.state}</p>
                              <p className="text-indigo-600 font-black mt-1">PIN: {quote.deliveryAddress?.pincode}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-slate-800 font-bold text-sm">
                            <FiCalendar className="text-indigo-400" />
                            <span>Deliver by: {new Date(quote.deliveryDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                 {/* Right: Items Table */}
<div className="lg:col-span-8 flex flex-col">
  <div className="flex items-center justify-between mb-5">
    <div>
      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Requested Products</h4>
      <p className="text-[11px] text-slate-500 mt-0.5">{quote.items.length} items in this quote</p>
    </div>
  </div>

  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50/80 border-b border-slate-200">
          <th className="px-6 py-4 text-[11px] uppercase font-bold text-slate-500 tracking-wider">Product Details</th>
          <th className="px-6 py-4 text-[11px] uppercase font-bold text-slate-500 tracking-wider text-center">Quantity</th>
          <th className="px-6 py-4 text-[11px] uppercase font-bold text-slate-500 tracking-wider text-right">Total Price</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {quote.items.map((item, idx) => (
          <tr key={idx} className="group hover:bg-slate-50/50 transition-all duration-200">
            <td className="px-6 py-5">
              <div className="flex flex-col gap-4">
                {/* Product Info */}
                <div className="flex items-start gap-4">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded-xl border border-slate-200 shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {item.productId?.title || item.productName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Unit Price: <span className="text-slate-700">₹{item.unitPrice.toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                {/* ✅ GIFT MESSAGE - Card Style */}
                {item.giftMessage && (
                  <div className="ml-0 md:ml-16 bg-indigo-50/40 border border-indigo-100 rounded-xl p-3 relative">
                    <div className="absolute -top-2 left-3 bg-white px-2 py-0.5 rounded-full border border-indigo-100 shadow-sm">
                      <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-tighter">Gift Note</p>
                    </div>
                    
                    <p className="text-xs text-slate-700 leading-relaxed italic mt-1.5">
                      "{item.giftMessage}"
                    </p>

                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-indigo-100/50">
                      {item.senderName && (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-indigo-400 font-medium uppercase">From:</span>
                          <span className="text-[11px] font-bold text-slate-700">{item.senderName}</span>
                        </div>
                      )}
                      {item.receiverName && (
                        <div className="flex items-center gap-1 border-l border-indigo-200 pl-3">
                          <span className="text-[10px] text-indigo-400 font-medium uppercase">To:</span>
                          <span className="text-[11px] font-bold text-slate-700">{item.receiverName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </td>

            <td className="px-6 py-5 text-center vertical-top">
              <div className="inline-flex items-center justify-center bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {item.quantity} units
              </div>
            </td>

            <td className="px-6 py-5 text-right vertical-top">
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                ₹{item.totalPrice.toLocaleString()}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Notes & Summary Footer */}
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    {/* Buyer Notes with Memo Look */}
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
        <div className="flex items-center gap-2 mb-3">
            <FiInfo className="text-amber-500 w-4 h-4" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Buyer Instructions</span>
        </div>
        <p className="text-slate-600 text-xs italic leading-relaxed">
            {quote.additionalNotes ? `"${quote.additionalNotes}"` : "No special instructions provided by the buyer."}
        </p>
    </div>

    {/* Grand Total Card */}
    <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100 flex flex-col items-end relative overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200 mb-1">
        Final Quote Total
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-medium text-indigo-200">₹</span>
        <span className="text-4xl font-black tracking-tighter">
            {quote.totalAmount.toLocaleString()}
        </span>
      </div>
      <p className="text-[10px] text-indigo-100/60 mt-2">All prices are inclusive of taxes & shipping</p>
    </div>
  </div>
</div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerBulkQuotes;