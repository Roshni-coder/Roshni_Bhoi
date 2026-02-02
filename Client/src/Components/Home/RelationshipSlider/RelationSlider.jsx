import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

const RelationSlider = () => {
  const [relations, setRelations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelations();
  }, []);

  const fetchRelations = async () => {
    try {
      const response = await api.get("/api/gift-for");
      if (response.data.success) {
        setRelations(response.data.all || []);
      }
    } catch (error) {
      console.error("Error fetching relations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#fdfcfb] py-12 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');
        `}
      </style>

      <div className="max-w-8xl mx-auto px-2 sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 md:mb-10 text-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-semibold">
              Gifts for Loved Ones
            </span>
            <span className="h-[1px] w-6 bg-[#d4af37]" />
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#332a21]"
          >
            Shop by Relationship
          </h2>
        </div>

        {/* Slider */}
        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            spaceBetween={18}
            slidesPerView={4}
            navigation={{
              nextEl: ".rel-next",
              prevEl: ".rel-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1.05, spaceBetween: 12 },
              420: { slidesPerView: 1.4 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {relations.map((relation, index) => (
              <SwiperSlide key={relation._id || index}>
                <Link
                  to={`/gift-for/${relation.slug}`}
                  className="relative block h-[220px] sm:h-[240px] lg:h-[250px] rounded-2xl overflow-hidden group/card cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Image */}
                  <img
                    src={
                      relation.image?.url ||
                      "https://via.placeholder.com/300x400?text=Gift"
                    }
                    alt={relation.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                  {/* Glass Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 transition-transform duration-500 group-hover/card:-translate-y-2">
                    <h3
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-lg sm:text-xl text-white mb-1 capitalize"
                    >
                      {relation.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        className="text-[10px] text-white/80 uppercase tracking-widest font-medium"
                      >
                        Explore Collection
                      </span>
                      <span className="text-white text-lg transition-transform duration-300 group-hover/card:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <button className="rel-prev absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#333] opacity-0 group-hover/slider:opacity-100 transition hover:bg-[#d4af37] hover:text-white">
            ‹
          </button>

          <button className="rel-next absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#333] opacity-0 group-hover/slider:opacity-100 transition hover:bg-[#d4af37] hover:text-white">
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelationSlider;
