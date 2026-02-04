import React from "react";

function Badges({ status }) {
  const styles = {
    Pending: "bg-[#c5a059]/10 text-[#c5a059] border-[#c5a059]/30",
    Confirm: "bg-[#1a3a32]/5 text-[#1a3a32] border-[#1a3a32]/20",
    Shipped: "bg-slate-100 text-slate-700 border-slate-200",
    Delivered: "bg-[#1a3a32] text-white border-transparent",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
    Default: "bg-stone-100 text-stone-600 border-stone-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
        styles[status] || styles.Default
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full bg-current mr-2 ${
          status !== "Delivered" ? "animate-pulse" : ""
        }`}
      />
      {status}
    </span>
  );
}

export default Badges;
