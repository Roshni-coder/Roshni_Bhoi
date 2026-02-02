import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import { AppContext } from "../../Components/context/Appcontext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const CollectionGrid = ({ selectedCategory }) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedin, wishlistItems, setWishlistItems, fetchWishlist } = useContext(AppContext);

  const isInWishlist = (id) => wishlistItems.some((item) => item._id === id);

  const toggleWishlist = async (e, product) => {
    e.preventDefault(); e.stopPropagation();
    if (!isLoggedin) { toast.info("Please login to add to wishlist"); return; }

    const inWishlist = isInWishlist(product._id);
    try {
      if (inWishlist) {
        await api.delete(`/api/auth/delete-wishlist/${product._id}`);
        setWishlistItems((prev) => prev.filter((item) => item._id !== product._id));
        toast.success("Removed from wishlist");
      } else {
        await api.post("/api/auth/wishlist", { productId: product._id });
        setWishlistItems((prev) => [...prev, product]);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Update failed");
      fetchWishlist();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/client/productsbycategory");
        if (data?.success && Array.isArray(data.categories)) {
          const flattened = data.categories.flatMap((cat) =>
            cat.products
              .filter((p) => p.approved)
              .map((p) => ({ ...p, categoryName: cat.category }))
          );
          // Stable Randomization: Only happens once when data is fetched
          setAllData(flattened.sort(() => Math.random() - 0.5));
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") return allData;
    return allData.filter((p) => p.categoryName === selectedCategory);
  }, [selectedCategory, allData]);

  if (loading) {
    return (
      <div className="py-40 text-center">
        <div className="inline-block w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 font-serif italic tracking-[0.2em] text-[#C5A059] text-sm">REVEALING TREASURES...</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 py-12 md:py-20">
      {/* Grid: Adaptive Column Count */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              key={product._id}
              className="group"
            >
              <Link to={`/products/${product._id}`} className="block relative">
                {/* 1. Visual Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-2xl shadow-sm border border-stone-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#C5A059]/10">
                  <img
                    src={product?.images?.[0]?.url || "https://via.placeholder.com/400x500"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Wishlist Toggle */}
                  <button
                    onClick={(e) => toggleWishlist(e, product)}
                    className={`absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                      isInWishlist(product._id)
                        ? "bg-[#0F3D2E] text-white shadow-lg"
                        : "bg-white/90 text-stone-800 hover:bg-white hover:scale-110 shadow-md"
                    }`}
                  >
                    <FiHeart size={18} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
                  </button>

                  {/* Boutique Badges */}
                  <div className="absolute top-0 left-0 flex flex-col items-start">
                    {product.discount > 0 && (
                      <div className="bg-[#0F3D2E] text-white text-[9px] font-black tracking-widest px-3 py-1.5 uppercase rounded-br-xl">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* "Discover" CTA on Hover - visible on MD+ */}
                  <div className="absolute bottom-6 left-0 right-0 hidden md:flex justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0F3D2E]">
                      View Details <FiArrowRight />
                    </div>
                  </div>
                </div>

                {/* 2. Detail Container */}
                <div className="mt-5 md:mt-7 text-center md:text-left px-1">
                  <div className="flex flex-col items-center md:items-start gap-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C5A059]">
                      {product.brand || "Authentic Heritage"}
                    </p>
                    <h3 className="font-serif text-lg md:text-xl text-[#0F3D2E] line-clamp-1 leading-snug group-hover:text-[#C5A059] transition-colors duration-300">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                    <span className="text-xl font-bold text-[#0F3D2E]">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    {product.oldPrice > product.price && (
                      <span className="text-sm text-stone-300 line-through font-light italic">
                        ₹{product.oldPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center">
          <div className="w-20 h-[1px] bg-[#C5A059] mx-auto mb-6"></div>
          <p className="font-serif italic text-stone-400 text-2xl">
            This collection is currently being woven.
          </p>
          <button onClick={() => window.history.back()} className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#0F3D2E] border-b border-[#0F3D2E] pb-1">
            Back to Home
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default CollectionGrid;