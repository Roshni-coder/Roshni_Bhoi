/**
 * Shop By State – Boutique Experience
 * Mirrors Shop By Occasion (layout, hover, search, preview)
 * Dynamic, API-driven, no route changes
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { HiSparkles, HiSearch, HiArrowRight, HiStar } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------- ICON MAP -------------------------------- */
const stateIcons = {
  assam: "🍃",
  meghalaya: "⛰️",
  nagaland: "🧵",
  manipur: "🏺",
  tripura: "🎋",
  sikkim: "🪷",
  mizoram: "🌾",
  "arunachal-pradesh": "🏔️"
};

const featuredStates = ["assam", "meghalaya", "nagaland"];

/* -------------------------------------------------------------------------- */
function ShopByStatePage() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredState, setHoveredState] = useState(null);
  const [previewProducts, setPreviewProducts] = useState({});

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await api.get("/api/states?northeast=false");
      if (res.data.success) {
        setStates(res.data.data);
      }
    } catch (error) {
      setStates(getFallbackStates());
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------- Hover preview products ---------------------- */
  const handleHover = async (slug) => {
    setHoveredState(slug);
    if (!slug || previewProducts[slug]) return;

    try {
      const res = await api.get(`/api/state/${slug}/products?limit=3`);
      if (res.data.success) {
        setPreviewProducts((prev) => ({
          ...prev,
          [slug]: res.data.data.products.slice(0, 3)
        }));
      }
    } catch {}
  };

  const filteredStates = !searchQuery
    ? states
    : states.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  /* ---------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* ============================ HERO ============================ */}
      <section className="relative px-4 pt-12 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 mb-6"
          >
            <HiSparkles className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Crafts of India
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">
            Shop by <span className="italic text-amber-600">State</span>
          </h1>

          <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-10">
            Discover authentic handcrafted treasures from every corner of India,
            rooted in culture and tradition.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto z-40">
            <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search state e.g. Assam, Nagaland"
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none"
            />

            <AnimatePresence>
              {searchQuery && filteredStates.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden"
                >
                  {filteredStates.slice(0, 6).map((state) => (
                    <Link
                      key={state.slug}
                      to={`/state/${state.slug}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50"
                    >
                      <span className="text-2xl">
                        {stateIcons[state.slug] || "🎁"}
                      </span>
                      <span className="font-medium text-stone-700">
                        {state.name}
                      </span>
                      <HiArrowRight className="ml-auto w-4 h-4 text-stone-300" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============================ GRID ============================ */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-3xl bg-stone-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStates.map((state) => (
              <StateCard
                key={state.slug}
                state={state}
                isFeatured={featuredStates.includes(state.slug)}
                onHover={handleHover}
                isHovered={hoveredState === state.slug}
                previewProducts={previewProducts[state.slug]}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ============================ CARD ============================ */
function StateCard({ state, isFeatured, onHover, isHovered, previewProducts }) {
  const icon = stateIcons[state.slug] || "🎁";

  return (
    <Link
      to={`/state/${state.slug}`}
      onMouseEnter={() => onHover(state.slug)}
      onMouseLeave={() => onHover(null)}
      className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm"
    >
      {state.image?.url ? (
        <img
          src={state.image.url}
          alt={state.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-50" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {isFeatured && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-amber-400 text-black text-[9px] font-bold uppercase rounded-lg flex items-center gap-1">
          <HiStar className="w-3 h-3" /> Featured
        </div>
      )}

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-4xl mb-3">{icon}</span>
        <h3 className="text-white font-serif text-xl">{state.name}</h3>
        <p className="text-[11px] text-amber-300 uppercase tracking-widest mt-1">
          Explore 
        </p>
      </div>

      {/* Preview products (desktop only) */}
      <AnimatePresence>
        {isHovered && previewProducts?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-4 left-4 hidden md:flex flex-col gap-2"
          >
            {previewProducts.map((p, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-xl"
              >
                <img
                  src={p.images?.[0]?.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

/* ============================ FALLBACK ============================ */
function getFallbackStates() {
  return [
    { name: "Assam", slug: "assam" },
    { name: "Meghalaya", slug: "meghalaya" },
    { name: "Nagaland", slug: "nagaland" },
    { name: "Manipur", slug: "manipur" },
    { name: "Tripura", slug: "tripura" },
    { name: "Sikkim", slug: "sikkim" },
    { name: "Mizoram", slug: "mizoram" },
    { name: "Arunachal Pradesh", slug: "arunachal-pradesh" }
  ];
}

export default ShopByStatePage;
