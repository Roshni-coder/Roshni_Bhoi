import React, { useContext, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FiHeart, FiShoppingCart, FiArrowRight, FiInbox } from "react-icons/fi";
import SideMenu from "../My Profile/SideMenu.jsx";
import { AppContext } from "../context/Appcontext.jsx";
import { motion, AnimatePresence } from "framer-motion";

function WishlistPage() {
  const { wishlistItems, setWishlistItems, fetchWishlist } =
    useContext(AppContext);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/api/auth/delete-wishlist/${productId}`);
      setWishlistItems((prev) =>
        prev.filter((item) => (item?.product?._id || item?._id) !== productId)
      );
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
   <section className="min-h-screen bg-[#FDFBF7] py-5 sm:py-10">
  <div className="max-w-7xl mx-auto px-3 sm:px-6">
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-1/4 order-2 lg:order-1">
        <SideMenu />
      </aside>

      {/* MAIN */}
      <main className="w-full lg:w-3/4 order-1 lg:order-2">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 shadow-sm overflow-hidden">

          {/* HEADER */}
          <header className="px-4 py-5 sm:px-8 sm:py-8 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1A3A32] leading-tight">
                My Saved{" "}
                <span className="italic font-normal text-[#C5A059]">
                  Treasures
                </span>
              </h1>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 mt-1 font-semibold">
                {wishlistItems.length} Handcrafted pieces
              </p>
            </div>

            <div className="hidden sm:flex p-3 rounded-2xl bg-[#FDFBF7] border border-[#C5A059]/20">
              <FiHeart className="text-[#C5A059] text-2xl" />
            </div>
          </header>

          {/* CONTENT */}
          <div className="p-3 sm:p-6 md:p-8">
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
                <AnimatePresence>
                  {wishlistItems.map((item) => {
                    const product = item.product || item;
                    if (!product?._id) return null;

                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative flex gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl border border-stone-100 p-3 sm:p-4 hover:border-[#C5A059]/40 hover:shadow-lg transition"
                      >
                        {/* REMOVE */}
                        <button
                          onClick={() => handleRemove(product._id)}
                          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 rounded-full bg-white border text-stone-400 hover:text-red-500 hover:scale-110 transition"
                        >
                          <IoCloseSharp size={14} />
                        </button>

                        {/* IMAGE */}
                        <Link
                          to={`/products/${product._id}`}
                          className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden bg-[#FDFBF7] border flex-shrink-0"
                        >
                          <img
                            src={
                              product.images?.[0]?.url ||
                              product.image ||
                              "https://via.placeholder.com/300"
                            }
                            alt={product.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          />
                        </Link>

                        {/* INFO */}
                        <div className="flex flex-col justify-between min-w-0 flex-1">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest font-bold text-[#C5A059]">
                              {product.brand || "Artisan Craft"}
                            </span>

                            <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A3A32] truncate mt-1">
                              <Link to={`/products/${product._id}`}>
                                {product.title}
                              </Link>
                            </h3>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-base sm:text-lg font-bold text-[#1A3A32]">
                                ₹{product.price?.toLocaleString()}
                              </span>
                              {product.oldprice > product.price && (
                                <span className="text-[10px] sm:text-xs line-through text-stone-400">
                                  ₹{product.oldprice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            to={`/products/${product._id}`}
                            className="mt-2 inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[#1A3A32] hover:text-[#C5A059]"
                          >
                            View Piece
                            <FiArrowRight />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="py-16 sm:py-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#FDFBF7] border flex items-center justify-center mb-6">
                  <FiInbox className="text-3xl text-[#C5A059] opacity-50" />
                </div>
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#1A3A32]">
                  Your gallery is waiting
                </h3>
                <p className="text-sm text-stone-400 max-w-xs mt-3 italic">
                  Save the crafts that speak to your soul.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-[#1A3A32] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition"
                >
                  Begin Curating <FiShoppingCart />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  </div>
</section>

  );
}

export default WishlistPage;
