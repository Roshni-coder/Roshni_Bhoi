import { useContext, useMemo } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import { HiSparkles } from "react-icons/hi";

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
    <div className="w-full">
      <h3 className="font-serif text-xl font-bold text-[#1A3C34] mb-6 border-b pb-2">Inquiry Summary</h3>
      
      {/* Product Mini List */}
      <div className="max-h-48 overflow-y-auto mb-6 space-y-3 pr-2">
        {bulkCart.map((item) => (
          <div key={item.productId} className="flex gap-3 items-center bg-[#FCFBF7] p-2 rounded-lg border border-gray-100">
            <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-md" />
            <div className="flex-1">
              <p className="text-xs font-bold text-[#1A3C34] truncate w-32">{item.productName}</p>
              <p className="text-[10px] text-gray-500">Qty: {item.quantity} × ₹{item.unitPrice}</p>
            </div>
            <p className="text-xs font-bold">₹{item.totalPrice.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({summary.totalPieces} items)</span>
          <span>₹{summary.totalOriginalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-emerald-600 font-bold">
          <span>Bulk Discount</span>
          <span>- ₹{summary.discountAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Logistics/Delivery</span>
          <span>₹{summary.deliveryCharge}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-dashed">
          <span className="font-bold text-[#1A3C34]">Estimated Quote</span>
          <span className="text-2xl font-black text-[#B58D2F]">₹{summary.finalTotal.toLocaleString()}</span>
        </div>
      </div>

      {summary.discountAmount > 0 && (
        <div className="mt-4 bg-emerald-50 p-3 rounded-lg flex items-center gap-2 border border-emerald-100">
          <HiSparkles className="text-emerald-500" />
          <p className="text-[10px] font-bold text-emerald-700 uppercase">B2B Tier Discount Applied</p>
        </div>
      )}
    </div>
  );
}

export default BulkSummary;