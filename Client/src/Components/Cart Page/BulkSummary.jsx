import { useContext, useMemo } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import { HiSparkles, HiOutlineGift, HiOutlineInformationCircle } from "react-icons/hi";

function BulkSummary() {
  const { bulkCart } = useContext(AppContext);

  const summary = useMemo(() => {
    const totalPieces = bulkCart.reduce((acc, item) => acc + item.quantity, 0);
    const totalOriginalPrice = bulkCart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    
    let discountRate = totalPieces >= 1000 ? 0.15 : totalPieces >= 500 ? 0.10 : totalPieces >= 100 ? 0.05 : 0;
    const discountAmount = Math.round(totalOriginalPrice * discountRate);
    const deliveryCharge = totalPieces > 0 ? 100 : 0;

    return {
      totalPieces,
      totalOriginalPrice,
      discountAmount,
      deliveryCharge,
      finalTotal: (totalOriginalPrice - discountAmount) + deliveryCharge
    };
  }, [bulkCart]);

  return (
    <div className="w-full flex flex-col h-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="font-serif text-2xl font-bold text-[#1A3C34]">Inquiry Summary</h3>
        <span className="bg-[#1A3C34]/10 text-[#1A3C34] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {summary.totalPieces} Items
        </span>
      </div>
      
      {/* Product Mini List - Improved Scroll Area */}
      <div className="flex-1 overflow-y-auto mb-8 pr-2 space-y-4 custom-scrollbar max-h-[400px]">
        {bulkCart.map((item) => (
          <div
            key={item.productId}
            className="group bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-[#B58D2F]/30 hover:shadow-sm"
          >
            {/* Top row */}
            <div className="flex gap-4 items-start">
              <div className="relative flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-50"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1A3C34] truncate leading-tight group-hover:text-[#B58D2F] transition-colors">
                  {item.productName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-[11px] text-gray-400">×</span>
                  <span className="text-[11px] font-medium text-gray-500">
                    ₹{item.unitPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-[#1A3C34]">
                  ₹{item.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* ✅ GIFT MESSAGE - Nested Card Style */}
            {/* {item.giftMessage && (
              <div className="mt-4 bg-[#FCFBF7] border border-[#B58D2F]/20 rounded-xl p-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1">
                    <HiOutlineGift className="text-[#B58D2F]/20 w-8 h-8 -rotate-12" />
                </div>
                
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1 h-3 bg-[#B58D2F] rounded-full"></div>
                    <p className="text-[9px] text-[#B58D2F] font-black uppercase tracking-widest">Personalization</p>
                </div>

                <p className="text-[11px] italic text-gray-600 leading-relaxed mb-2 relative z-10">
                  "{item.giftMessage}"
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] border-t border-[#B58D2F]/10 pt-2">
                  {item.senderName && (
                    <span className="flex items-center gap-1">
                      <span className="text-gray-400 uppercase font-medium">From:</span>
                      <span className="font-bold text-gray-700">{item.senderName}</span>
                    </span>
                  )}
                  {item.receiverName && (
                    <span className="flex items-center gap-1 border-l border-gray-200 pl-4">
                      <span className="text-gray-400 uppercase font-medium">To:</span>
                      <span className="font-bold text-gray-700">{item.receiverName}</span>
                    </span>
                  )}
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Pricing Summary Footer */}
      <div className="bg-[#1A3C34] text-white rounded-3xl p-6 shadow-xl shadow-[#1A3C34]/20 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="space-y-3 mb-6 relative z-10">
          <div className="flex justify-between text-xs text-white/70">
            <span>Subtotal ({summary.totalPieces} units)</span>
            <span className="font-medium">₹{summary.totalOriginalPrice.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-xs items-center">
            <span className="flex items-center gap-1.5 text-emerald-300">
               Bulk Savings
            </span>
            <span className="font-bold text-emerald-300">- ₹{summary.discountAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-white/70">
            <span>Logistics & Handling</span>
            <span className="font-medium">₹{summary.deliveryCharge}</span>
          </div>
        </div>

        <div className="flex justify-between items-end pt-5 border-t border-white/10 relative z-10">
          <div>
            <span className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1">Estimated Quote</span>
            <span className="text-3xl font-black text-[#B58D2F] tracking-tighter leading-none">
              ₹{summary.finalTotal.toLocaleString()}
            </span>
          </div>
          {summary.discountAmount > 0 && (
            <div className="flex flex-col items-end">
                 <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/10 mb-1">
                    <HiSparkles className="text-[#B58D2F] text-xs" />
                    <span className="text-[9px] font-bold uppercase tracking-tight text-[#B58D2F]">B2B Applied</span>
                 </div>
                 <span className="text-[9px] text-white/40">Includes volume discount</span>
            </div>
          )}
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-4 flex gap-2 items-center justify-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">
         <HiOutlineInformationCircle className="text-gray-300 w-3 h-3" />
         <span>Final pricing may vary after review</span>
      </div>
    </div>
  );
}

export default BulkSummary;