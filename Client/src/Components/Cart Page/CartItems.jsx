import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck, HiOutlineMailOpen } from "react-icons/hi";

function CartItems({
  product,
  cartItemId,
  onRemove,
  onUpdateQuantity,
  quantity,
  isSelected,
  onSelect,
  giftMessage,
  senderName,
  receiverName,
}) {
  return (
    <div className="group relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-[#EDE3D2] transition-all duration-300 hover:shadow-lg hover:shadow-[#322619]/5">
      
      {/* Selection Checkbox - Positioned for easy thumb reach on mobile */}
      <div className="absolute top-4 left-4 sm:relative sm:top-0 sm:left-0">
        {onSelect && (
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(cartItemId)}
            sx={{
              "&.Mui-checked": { color: "#B58D2F" },
              "& .MuiSvgIcon-root": { fontSize: { xs: 24, sm: 28 } },
            }}
          />
        )}
      </div>

      {/* Image Section */}
      <div className="relative w-full sm:w-32 h-48 sm:h-32 bg-[#F9F6F0] rounded-2xl flex items-center justify-center p-4 flex-shrink-0 overflow-hidden border border-[#EDE3D2]/50">
        <Link to={`/products/${product._id}`} className="w-full h-full">
          <img
            src={product?.image || product?.images?.[0]?.url || "https://placehold.co/150"}
            alt={product?.title}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {product.oldprice > product.price && (
          <div className="absolute top-0 left-0 bg-[#A34343] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-br-xl">
            {Math.round(((product.oldprice - product.price) / product.oldprice) * 100)}% Off
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full flex flex-col gap-4">
        
        {/* Title and Remove Button */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <Link to={`/products/${product._id}`}>
              <h3 className="font-serif text-[#322619] font-bold text-lg sm:text-xl leading-snug hover:text-[#B58D2F] transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5">
              <HiOutlineBadgeCheck className="text-[#B58D2F] text-base" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#544231]/60">
                {product.brand || "Artisan Craft"}
              </span>
            </div>
          </div>

          <button
            onClick={() => onRemove(cartItemId)}
            className="p-2 text-[#544231]/30 hover:text-[#A34343] hover:bg-red-50 rounded-full transition-all flex-shrink-0"
            title="Remove Item"
          >
            <IoTrashOutline size={22} />
          </button>
        </div>

        {/* Modern Gift Message Card - Only shows if data exists */}
        {giftMessage && (
          <div className="relative p-4 bg-[#F9F6F0]/60 border border-dashed border-[#B58D2F]/30 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineMailOpen className="text-[#B58D2F] text-sm" />
              <span className="text-[10px] font-black text-[#B58D2F] uppercase tracking-widest">
                Attached Gift Note
              </span>
            </div>
            
            <p className="text-sm italic text-[#544231] font-serif leading-relaxed mb-3">
              "{giftMessage}"
            </p>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-[#EDE3D2]/60">
              {senderName && (
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase text-[#544231]/50 font-bold tracking-tighter">From</span>
                  <span className="text-xs font-bold text-[#322619]">{senderName}</span>
                </div>
              )}
              {receiverName && (
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase text-[#544231]/50 font-bold tracking-tighter">To</span>
                  <span className="text-xs font-bold text-[#322619]">{receiverName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer: Quantity and Price */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 mt-auto">
          
          {/* Elegant Pill Quantity Selector */}
          <div className="flex items-center bg-white border border-[#EDE3D2] p-1 rounded-full shadow-sm w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => quantity > 1 && onUpdateQuantity(cartItemId, quantity - 1)}
              disabled={quantity <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F9F6F0] text-[#322619] hover:bg-[#B58D2F] hover:text-white transition-all disabled:opacity-30"
            >
              –
            </button>
            <span className="w-12 text-center text-sm font-bold text-[#322619] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(cartItemId, quantity + 1)}
              disabled={quantity >= product.stock}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F9F6F0] text-[#322619] hover:bg-[#B58D2F] hover:text-white transition-all disabled:opacity-30"
            >
              +
            </button>
          </div>

          {/* Price Section */}
          <div className="flex flex-col items-end w-full sm:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-[#544231]/40 text-xs line-through decoration-[#B58D2F]/30">
                ₹{(product.oldprice * quantity).toLocaleString()}
              </span>
              <span className="text-[#322619] font-black text-2xl tracking-tighter">
                ₹{(product.price * quantity).toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              You saved ₹{((product.oldprice - product.price) * quantity).toLocaleString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

CartItems.propTypes = {
  product: PropTypes.object.isRequired,
  cartItemId: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  giftMessage: PropTypes.string,
  senderName: PropTypes.string,
  receiverName: PropTypes.string,
};

export default CartItems;