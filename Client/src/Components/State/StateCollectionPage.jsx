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
    <div className="min-h-screen bg-[#FDFCFB] text-[#2C1A0F]">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');`}
      </style>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#2C1A0F] pt-20 pb-12 md:pt-12 md:pb-10 px-4">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37] opacity-[0.03] -skew-x-12 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#2C1A0F] to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-[#d4af37] mb-8 transition-colors duration-300"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Back to Gallery</span>
          </Link>

          <div className="flex items-center gap-3 text-[#d4af37] mb-6">
            <span className="h-px w-8 bg-[#d4af37]" />
            <HiLocationMarker className="text-sm" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">Indigenous Collection</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Handcrafted in &nbsp;
            <span className="italic text-[#d4af37]">{stateName}</span>
          </h1>

          <p className="text-white/60 max-w-2xl text-base md:text-lg font-light leading-relaxed mb-10 font-sans" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {stateData?.description ||
              `Experience the soul of Indian heritage through authentic artisanal treasures from ${stateName}. Each piece tells a story of tradition.`}
          </p>

          {titleButtons.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                <button
                  onClick={() => setSelectedTitle(null)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all border
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
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all border
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
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
              {filteredProducts.length} Pieces Found
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <HiSortDescending className="text-[#d4af37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#2C1A0F] focus:outline-none cursor-pointer pr-2 appearance-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            
            {selectedTitle && (
              <button
                onClick={() => setSelectedTitle(null)}
                className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#2C1A0F] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- PRODUCT GRID --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-[4/5] rounded-3xl mb-4" />
                <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="mb-6 inline-flex p-8 bg-gray-50 rounded-full">
               <HiShoppingBag className="w-12 h-12 text-gray-200" />
            </div>
            <h3 className="text-2xl font-serif mb-2">No masterpieces found</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">Try selecting a different category or clear your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-20">
            <AnimatePresence>
              {filteredProducts.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- PAGINATION --- */}
        {pagination.pages > 1 && (
          <div className="mt-28 flex justify-center items-center gap-3">
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all duration-300 
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

/* ---------- REFINED PRODUCT CARD ---------- */
function ProductCard({ product, index }) {
  // Logic to calculate discount percentage
  const discountPercentage = product.oldprice > product.price 
    ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100) 
    : 0;

  return (
   <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/products/${product._id}`} className="block relative">
        {/* --- IMAGE CONTAINER --- */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#F4F1EE] transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(44,26,15,0.2)] group-hover:-translate-y-3">
          <img
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0F]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* --- ENHANCED DISCOUNT BADGE --- */}
          {discountPercentage > 0 && (
            <div className="absolute top-5 left-5 overflow-hidden rounded-full shadow-2xl">
              <div className="flex items-center">
                
                {/* Percentage */}
                <div className="bg-orange-600 px-3 py-1.5 text-[11px] font-bold text-white">
                  {discountPercentage}% off
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Icon (Reveals on Hover) */}
          <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2C1A0F] shadow-xl hover:bg-[#d4af37] hover:text-white">
              <HiShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* --- PRODUCT INFO --- */}
        <div className="mt-7 px-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="font-serif text-lg leading-tight text-[#2C1A0F] transition-colors duration-300 group-hover:text-[#d4af37]">
                {product.title}
              </h2>
              
              {/* Price Row */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xl font-bold tracking-tight text-[#2C1A0F]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldprice > product.price && (
                  <span className="text-sm font-medium text-gray-400 line-through">
                    ₹{product.oldprice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Rating Pill */}
            {product.rating > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-[#FDFCFB] px-2.5 py-1 text-[11px] font-bold text-[#2C1A0F] border border-gray-100 shadow-sm">
                <HiStar className="text-[#d4af37]" />
                {product.rating}
              </div>
            )}
          </div>
          
          {/* --- VIEW ARTIFACT FOOTER --- */}
          <div className="mt-5 flex items-center gap-3">
             <div className="h-px w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 transition-colors duration-300 group-hover:text-[#d4af37]">
               View Artifact
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- HELPERS ---------- */
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