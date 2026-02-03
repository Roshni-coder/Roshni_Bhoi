import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// Assets
import wedding from "../../../assets/newimage/wedding.jpg";
import birthday from "../../../assets/newimage/birthday.png";
import fastival from "../../../assets/newimage/fastival.png";
import baby from "../../../assets/newimage/baby.png";
import anniversary from "../../../assets/newimage/anniversary.png";

const occasions = [
  { name: "Wedding", slug: "wedding", image: wedding, count: "150+ Gifts" },
  { name: "Birthday", slug: "birthday", image: birthday, count: "200+ Gifts" },
  { name: "Festival", slug: "festive-season", image: fastival, count: "300+ Gifts" },
  { name: "Baby Shower", slug: "baby-shower", image: baby, count: "120+ Items" },
  { name: "Anniversary", slug: "anniversary", image: anniversary, count: "180+ Gifts" },
];

function ShopByOccasion() {
  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-8 bg-[#fdfcfb] overflow-hidden">
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
              Celebrate Every Moment
            </span>
            <span className="h-[1px] w-6 bg-[#d4af37]" />
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#332a21]"
          >
            Shop by Occasion
          </h2>
        </div>

        {/* Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            spaceBetween={18}
            slidesPerView={4}
            navigation={{
              nextEl: ".occ-next",
              prevEl: ".occ-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1.05, spaceBetween: 12 },
              420: { slidesPerView: 1.4 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {occasions.map((item, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={`/occasion/${item.slug}`}
                  className="relative block h-[220px] sm:h-[240px] lg:h-[250px] rounded-2xl overflow-hidden group/card cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                  {/* Glass Content */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 transition-transform duration-500 group-hover/card:-translate-y-2">
                    <h3
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-lg sm:text-md font-bold text-white mb-1"
                    >
                      {item.name}
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

          {/* Navigation Arrows */}
          <button className="occ-prev absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#333] opacity-0 group-hover:opacity-100 transition hover:bg-[#d4af37] hover:text-white">
            ‹
          </button>

          <button className="occ-next absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#333] opacity-0 group-hover:opacity-100 transition hover:bg-[#d4af37] hover:text-white">
            ›
          </button>
        </div>

        {/* View All */}
        <div className="flex justify-center my-8">
          <Link
            to="/shop-by-occasion"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#d4af37]/30 transition-transform hover:-translate-y-1"
          >
            View All Occasion →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ShopByOccasion;
