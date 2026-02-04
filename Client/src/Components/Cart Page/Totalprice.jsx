import { Divider } from "@mui/material";
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext.jsx';
import { HiSparkles } from "react-icons/hi";

function Totalprice({ selectedItemIds }) {
  const { cartItems: contextCartItems } = useContext(AppContext);
  const allCartItems = contextCartItems || [];

  const cartItems = selectedItemIds
    ? allCartItems.filter(item => selectedItemIds.includes(item.product._id))
    : allCartItems;

  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.oldprice * item.quantity,
    0
  );
  const totalDiscountedPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = totalOriginalPrice - totalDiscountedPrice;

  return (
    <div className="w-full">
      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#322619] mb-6 sm:mb-8 border-b-2 border-dashed border-[#EDE3D2] pb-3 sm:pb-4 uppercase tracking-widest">
        Summary
      </h3>

      <div className="space-y-4 sm:space-y-5">
        <div className="flex justify-between text-[#544231]/70 text-sm font-medium">
          <span>Pieces ({cartItems.length})</span>
          <span>₹{totalOriginalPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-emerald-600 text-sm font-bold">
          <span>Artisan Discount</span>
          <span>- ₹{discountAmount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-[#544231]/70 text-sm font-medium">
          <span>Shipping</span>
          <span className="text-[#B58D2F] font-bold">Free of Charge</span>
        </div>

        <Divider className="!my-5 sm:!my-6 !border-[#EDE3D2] !border-dashed" />

        <div className="flex justify-between items-end gap-3">
          <span className="text-[#322619] font-serif text-base sm:text-lg font-bold uppercase tracking-widest">
            Total
          </span>
          <p className="text-3xl sm:text-4xl font-black text-[#322619] tracking-tighter leading-none">
            ₹{totalDiscountedPrice.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 bg-[#B58D2F]/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#B58D2F]/20 flex items-center gap-2 sm:gap-3">
        <HiSparkles className="text-[#B58D2F] text-lg sm:text-xl flex-shrink-0" />
        <p className="text-[10px] sm:text-xs font-bold text-[#B58D2F] uppercase tracking-wider">
          You saved ₹{discountAmount.toLocaleString()} today!
        </p>
      </div>
    </div>
  );
}


export default Totalprice;