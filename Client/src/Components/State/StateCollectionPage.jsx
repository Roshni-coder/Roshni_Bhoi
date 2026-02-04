import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowLeft,
  HiSortDescending,
  HiLocationMarker,
  HiStar,
  HiShoppingBag,
} from "react-icons/hi";
import api from "../../utils/api";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

function StateCollectionPage() {
  const { slug } = useParams();

  const [stateData, setStateData] = useState(null);
  const [products, setProducts] = useState([]);
  const [titleButtons, setTitleButtons] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchStateDetails();
    fetchProducts();
  }, [slug, sortBy]);

  const fetchStateDetails = async () => {
    try {
      const res = await api.get(`/api/states/${slug}`);
      if (res.data.success) setStateData(res.data.data);
    } catch {
      setStateData(getStateFallback(slug));
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/states/${slug}/products?sort=${sortBy}&page=${pagination.page}`
      );

      if (res.data.success) {
        setProducts(res.data.data || []);
        setPagination(res.data.pagination);
        setTitleButtons(getProductTitleButtons(res.data.data || []));
      }
    } finally {
      setLoading(false);
    }
  };

  const stateName = stateData?.name || formatStateName(slug);

  const filteredProducts = selectedTitle
    ? products.filter((p) =>
        p.title?.toLowerCase().includes(selectedTitle.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2C1A0F] font-sans overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#2C1A0F] pt-20 pb-10 md:pt-10 md:pb-10 px-4 sm:px-6 lg:px-8">
        {/* Artistic Overlays - Hidden or simplified on smaller screens for performance */}
        <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full bg-[#d4af37] opacity-[0.03] -skew-x-12 translate-x-1/4 sm:translate-x-20" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#2C1A0F] to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-[#d4af37] mb-6 md:mb-10 transition-colors duration-300"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">Back to Gallery</span>
          </Link>

          <div className="flex items-center gap-3 text-[#d4af37] mb-4 md:mb-6">
            <span className="h-px w-6 md:w-10 bg-[#d4af37] hidden sm:block" />
            <HiLocationMarker className="text-sm" />
            <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">Indigenous Collection</span>
          </div>

          <h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif leading-[1.1] mb-6" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Handcrafted in &nbsp;
            <span className="text-[#d4af37]">{stateName}</span>
          </h1>

          <p 
            className="text-white/60 max-w-2xl text-sm md:text-lg font-light leading-relaxed mb-10 font-sans" 
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {stateData?.description ||
              `Experience the soul of Indian heritage through authentic treasures from ${stateName}. Each piece tells a story of tradition.`}
          </p>

          {/* --- CATEGORY FILTERS (Scrollable) --- */}
          {titleButtons.length > 0 && (
            <div className="relative">
              <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  onClick={() => setSelectedTitle(null)}
                  className={`whitespace-nowrap px-5 py-2 md:px-7 md:py-3 rounded-full text-[10px] md:text-xs font-bold transition-all border
                    ${!selectedTitle 
                      ? "bg-[#d4af37] border-[#d4af37] text-[#2C1A0F] shadow-lg shadow-[#d4af37]/20" 
                      : "bg-white/5 border-white/10 text-white hover:border-white/30"}`}
                >
                  All Items
                </button>
                {titleButtons.map((title, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTitle(title)}
                    className={`whitespace-nowrap px-5 py-2 md:px-7 md:py-3 rounded-full text-[10px] md:text-xs font-bold transition-all border
                      ${selectedTitle === title
                        ? "bg-[#d4af37] border-[#d4af37] text-[#2C1A0F] shadow-lg shadow-[#d4af37]/20"
                        : "bg-white/5 border-white/10 text-white hover:border-white/30"
                      }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- STICKY NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
            <p className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-widest">
              {filteredProducts.length} Pieces Found
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-gray-100">
              <HiSortDescending className="text-[#d4af37] text-sm md:text-base" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[10px] md:text-xs font-bold text-[#2C1A0F] focus:outline-none cursor-pointer pr-1 appearance-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            
            {selectedTitle && (
              <button
                onClick={() => setSelectedTitle(null)}
                className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-[#d4af37] hover:text-[#2C1A0F] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- PRODUCT GRID --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-[4/5] rounded-2xl md:rounded-3xl mb-4" />
                <div className="h-3 md:h-4 bg-gray-100 rounded-full w-3/4 mb-3" />
                <div className="h-3 md:h-4 bg-gray-100 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 md:py-32">
            <div className="mb-6 inline-flex p-6 md:p-8 bg-gray-50 rounded-full">
               <HiShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-gray-200" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif mb-2">No masterpieces found</h3>
            <p className="text-gray-400 text-xs md:text-sm max-w-xs mx-auto">Try selecting a different category or clear your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 md:gap-x-10 md:gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- PAGINATION --- */}
        {pagination.pages > 1 && (
          <div className="mt-16 md:mt-28 flex justify-center items-center gap-2 md:gap-3">
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 
                  ${pagination.page === i + 1 
                    ? "bg-[#2C1A0F] text-white shadow-xl scale-110" 
                    : "bg-white text-gray-400 border border-gray-100 hover:border-[#d4af37]"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- PRODUCT CARD COMPONENT ---------- */
function ProductCard({ product, index }) {
  const discountPercentage = product.oldprice > product.price 
    ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100) 
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group"
    >
      <Link to={`/products/${product._id}`} className="block relative">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#F4F1EE] transition-all duration-700 group-hover:shadow-[0_20px_50px_-12px_rgba(44,26,15,0.15)] md:group-hover:-translate-y-3">
          <img
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 md:top-5 md:left-5 overflow-hidden rounded-full shadow-lg">
              <div className="flex items-center bg-orange-600 text-white px-2 py-1 md:px-3 md:py-1.5">
                <span className="text-[8px] md:text-[11px] font-bold whitespace-nowrap">
                  {discountPercentage}% OFF
                </span>
              </div>
            </div>
          )}

          {/* Quick Action - hidden on mobile, visible on hover desktop */}
          <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hidden md:flex">
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white text-[#2C1A0F] shadow-xl hover:bg-[#d4af37] hover:text-white">
              <HiShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 md:mt-7 px-1 md:px-2">
          <div className="flex flex-col gap-1 md:gap-2">
            <h2 className="font-serif text-sm md:text-lg leading-tight text-[#2C1A0F] line-clamp-2 md:line-clamp-1 transition-colors duration-300 group-hover:text-[#d4af37]">
              {product.title}
            </h2>
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-sm md:text-xl font-bold tracking-tight text-[#2C1A0F]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldprice > product.price && (
                  <span className="text-[10px] md:text-sm font-medium text-gray-400 line-through">
                    ₹{product.oldprice.toLocaleString()}
                  </span>
                )}
              </div>

              {product.rating > 0 && (
                <div className="flex items-center gap-0.5 md:gap-1 rounded-full bg-white px-1.5 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[11px] font-bold text-[#2C1A0F] border border-gray-100 shadow-sm">
                  <HiStar className="text-[#d4af37]" />
                  {product.rating}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Visual Indicator */}
          <div className="mt-4 hidden md:flex items-center gap-3">
             <div className="h-px w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#d4af37]">
               Explore
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- HELPERS (Same as your code) ---------- */
function formatStateName(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getProductTitleButtons(products = []) {
  return [...new Set(products.map((p) => p.title))].slice(0, 10);
}

function getStateFallback(slug) {
  return { 
    name: formatStateName(slug), 
    description: `Discover rare handcrafted masterpieces from the heart of ${formatStateName(slug)}.` 
  };
}

export default StateCollectionPage;