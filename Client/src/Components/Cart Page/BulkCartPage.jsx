import { useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import { useNavigate } from "react-router-dom";
import BulkSummary from "./BulkSummary.jsx";
import { HiOutlineTrash, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiShoppingBagLine } from "react-icons/ri";

export default function BulkCartPage() {
  const {
    bulkCart,
    fetchBulkCart,
    removeBulkCart,
    updateBulkCartQuantity
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBulkCart();
  }, []);

 const handleQtyChange = (id, value) => {
  // 1. Allow user to clear the input to type a new number
  if (value === "1") {
    updateBulkCartQuantity(id, "1"); 
    return;
  }

  const numValue = Number(value);

  // 2. Prevent non-numbers or values less than 1
  if (isNaN(numValue) || numValue < 1) return;

  // 3. Update the context/state
  updateBulkCartQuantity(id, numValue);
};

  return (
    <div className="min-h-screen bg-[#FCFBF7] py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#B58D2F] p-3 rounded-xl shadow-lg shadow-[#B58D2F]/20 text-white">
            <RiShoppingBagLine size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#322619]">Bulk Inquiry Bag</h1>
            <div className="h-1 w-24 bg-[#B58D2F] mt-1 rounded-full"></div>
          </div>
        </div>

        <p className="text-[#544231]/70 mb-10 font-medium">
          You have <span className="text-[#B58D2F] font-bold">{bulkCart.length} corporate items</span> in your inquiry list
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: Items List */}
          <div className="lg:col-span-2 space-y-6">
            {bulkCart.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[#EDE3D2] rounded-3xl p-20 text-center">
                    <p className="font-serif text-2xl text-[#544231]/40">Your bulk cart is empty</p>
                    <button onClick={() => navigate('/alloccasions')} className="mt-4 text-[#B58D2F] font-bold underline">Browse Collections</button>
                </div>
            ) : (
                bulkCart.map((item) => (
                    <div key={item._id} className="bg-white border border-[#EDE3D2] rounded-3xl p-6 flex flex-col md:flex-row gap-8 relative transition-all hover:shadow-xl hover:shadow-[#322619]/5">
                      
                      {/* Product Image */}
                      <div className="w-full md:w-44 h-44 bg-[#F9F7F2] rounded-2xl overflow-hidden flex-shrink-0 border border-[#EDE3D2]/50">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
        
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-[#322619] mb-1">
                              {item.productName}
                            </h2>
                            <p className="text-xs uppercase tracking-widest text-[#B58D2F] font-bold">
                                Heritage Corporate Collection
                            </p>
                          </div>
                          <button
                            onClick={() => removeBulkCart(item.productId)}
                            className="text-[#544231]/30 hover:text-red-500 p-2 transition-colors"
                          >
                            <HiOutlineTrash size={24} />
                          </button>
                        </div>
        
                        <div className="flex flex-wrap items-end justify-between gap-4 mt-6">
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-[#544231]/60">Quantity Selection</p>
                                <div className="flex items-center bg-[#F9F7F2] border border-[#EDE3D2] rounded-full p-1 w-fit">
                                    <button 
                                        className="w-10 h-10 flex items-center justify-center text-xl font-bold text-[#322619]"
                                        onClick={() => handleQtyChange(item.productId, item.quantity - 1)}
                                    >−</button>
                                    <input
  type="number"
  value={item.quantity} // This will now show the empty string if the user deletes it
onChange={(e) => handleQtyChange(item.productId, e.target.value)}
  onBlur={(e) => {
    // If user leaves the input empty, reset to 1
    if (e.target.value === "" || Number(e.target.value) < 1) {
      handleQtyChange(item._id, 1);
    }
  }}
  className="bg-transparent text-center w-16 font-bold text-[#322619] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
/>
                                    <button 
                                        className="w-10 h-10 flex items-center justify-center text-xl font-bold text-[#322619]"
                                       onClick={() => handleQtyChange(item.productId, item.quantity + 1)}
                                    >+</button>
                                </div>
                            </div>
        
                            <div className="text-right">
                                <p className="text-sm text-[#544231]/50 line-through font-medium">₹{(item.unitPrice * item.quantity).toLocaleString()}</p>
                                <p className="text-3xl font-black text-[#322619]">
                                    ₹{item.totalPrice.toLocaleString()}
                                </p>
                                <p className="text-[10px] text-[#B58D2F] font-bold tracking-wider uppercase">Unit Price: ₹{item.unitPrice}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))
            )}

            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[#544231] font-bold uppercase tracking-widest text-sm mt-8 hover:text-[#B58D2F] transition-colors"
            >
                <HiOutlineArrowNarrowLeft size={20}/> Back to Collections
            </button>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-[#EDE3D2] p-8 rounded-[2rem] shadow-2xl shadow-[#322619]/5">
              <BulkSummary />
              <button
  onClick={() => {

    if (!bulkCart.length) {
      alert("Bulk cart is empty");
      return;
    }

    // const firstItem = bulkCart[0];

    // navigate(
    //   `/bulk-quote?product=${firstItem.productId}&quantity=${firstItem.quantity}`
    // );
    navigate("/bulk-quote");


  }}
  className="bg-[#322619] hover:bg-[#1A1A1A] text-white py-5 w-full mt-8 rounded-full font-bold uppercase tracking-[0.2em]"
>
  Proceed to Inquiry
</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}