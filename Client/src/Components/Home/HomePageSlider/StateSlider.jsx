import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import api from "../../../utils/api";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// Dynamic image import
const stateImages = import.meta.glob(
  "../../../assets/states/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const getStateImage = (state) => {
  if (state.image?.url) return state.image.url;

  const cleanSlug = state.slug.toLowerCase();
  const underscoreSlug = cleanSlug.replace(/-/g, "_");

  for (const path in stateImages) {
    if (
      path.toLowerCase().includes(`/${cleanSlug}.`) ||
      path.toLowerCase().includes(`/${underscoreSlug}.`)
    ) {
      return stateImages[path].default;
    }
  }

  const fallback = Object.keys(stateImages).find((p) =>
    p.toLowerCase().includes("assam")
  );
  return fallback ? stateImages[fallback].default : "";
};

function StateSlider() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await api.get("/api/states?northeast=false");
      if (response.data.success) {
        setStates(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([
        { name: "Assam", slug: "assam", famousFor: "Tea, Muga Silk, Cane & Bamboo" },
        { name: "Meghalaya", slug: "meghalaya", famousFor: "Organic Honey, Living Root Bridges" },
        { name: "Nagaland", slug: "nagaland", famousFor: "Naga Shawls, Tribal Jewelry" },
        { name: "Manipur", slug: "manipur", famousFor: "Longpi Pottery, Moirang Phee" },
        { name: "Tripura", slug: "tripura", famousFor: "Bamboo Crafts, Risa Textiles" },
        { name: "Sikkim", slug: "sikkim", famousFor: "Organic Products, Thangka Art" },
        { name: "Arunachal Pradesh", slug: "arunachal-pradesh", famousFor: "Tribal Textiles, Carpets" },
        { name: "Mizoram", slug: "mizoram", famousFor: "Puan Textiles, Bamboo Products" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <section className="w-full pt-8 px-4 bg-[#fdfcfb]">
        <div className="max-w-8xl mx-auto px-2 sm:px-6">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-10 w-56 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[220px] bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-10 px-4 bg-[#fdfcfb] overflow-hidden">
      {/* Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');
        `}
      </style>

      <div className="max-w-8xl mx-auto px-2 sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-semibold">
              Crafts of India
            </span>
            <span className="h-[1px] w-6 bg-[#d4af37]" />
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#332a21]"
          >
            Shop by State
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xl">
            Discover authentic handcrafted treasures from artisans across India
          </p>
        </div>

        {/* Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={16}
            slidesPerView={4}
            navigation={{
              nextEl: ".state-next",
              prevEl: ".state-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1.05, spaceBetween: 12 },
              420: { slidesPerView: 1.3 },
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 4 },
            }}
          >
            {states.map((state, index) => (
              <SwiperSlide key={state._id || index}>
                <Link to={`/state/${state.slug}`}>
                  <div className="relative h-[220px] sm:h-[240px] lg:h-[250px] rounded-2xl overflow-hidden group/card shadow-sm hover:shadow-xl transition-all duration-500">

                    <img
                      src={getStateImage(state)}
                      alt={state.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {state.isFeatured && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-[#d4af37] text-white text-[9px] uppercase rounded-full">
                        Featured
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 transition-transform group-hover/card:-translate-y-2">
                      <h3
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="text-lg sm:text-xl text-white mb-2"
                      >
                        {state.name}
                      </h3>

                      <span
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        className="block text-gray-200 uppercase tracking-widest text-[10px] line-clamp-1"
                      >
                        {state.famousFor || state.shortDescription}
                      </span>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-white/80 uppercase tracking-widest">
                          {state.productCount > 0
                            ? `${state.productCount} Products`
                            : "Explore Collection"}
                        </span>
                        <span className="text-white text-lg transition-transform group-hover/card:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="state-prev absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-[#d4af37] hover:text-white">
            ‹
          </button>

          <button className="state-next absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-[#d4af37] hover:text-white">
            ›
          </button>
        </div>

        {/* View All */}
        <div className="flex justify-center my-6">
          <Link
            to="/states"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#d4af37]/30 transition-transform hover:-translate-y-1"
          >
            View All States & UTs →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StateSlider;
