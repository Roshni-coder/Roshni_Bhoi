import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Images
import one from "../../../assets/newimage/banne.jpg";
import bannerone from "../../../assets/newimage/one.jpg";
import two from "../../../assets/newimage/unnamed.jpg";
import four from "../../../assets/newimage/four.jpg";
import { Link } from "react-router-dom";

const slides = [
  { img: one },
  { img: bannerone },
  { img: two },
  { img: four },
];

function Banner() {
  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden rounded-none sm:rounded-2xl">

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1200}
        slidesPerView={1}
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="
          w-full
          h-[70vh]
          sm:h-[65vh]
          md:h-[65vh]
          lg:h-[55vh]
        "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              {/* Image */}
              <img
                src={slide.img}
                alt="North East Handicrafts"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Warm Heritage Overlay */}
              <div className="absolute inset-0 bg-[#2C1A0F]/30 z-10" />

              {/* Content */}
              <div className="
                relative z-20 h-full
                flex items-center
                px-4 sm:px-8 md:px-16 lg:px-24
              ">
                <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">

                  {/* Heading */}
                  <h1 className="
                    font-serif text-[#F6F1E8]
                    text-3xl sm:text-3xl md:text-5xl lg:text-6xl
                    leading-snug md:leading-tight
                    mb-3 sm:mb-4
                    drop-shadow-lg
                  ">
                    Handcrafted Gifts from <br className="hidden sm:block" />
                    the Heart of North East India
                  </h1>

                  {/* Golden Line */}
                  <div className="
                    w-25 sm:w-20 md:w-28
                    h-1 bg-[#C6A75E]
                    mb-4 sm:mb-6
                  " />

                  {/* Subtitle */}
                  <p className="
                    font-heritage text-[#F6F1E8]
                    text-xs sm:text-sm md:text-lg
                    mb-6 sm:mb-8
                    max-w-full sm:max-w-lg md:max-w-xl
                    leading-relaxed
                  ">
                    Supporting local artisans across Assam, Meghalaya, Nagaland,
                    Manipur, Mizoram, Arunachal & Tripura.
                  </p>

                  {/* Buttons */}
                  <div className="
                    flex flex-col sm:flex-row
                    gap-3 sm:gap-4
                  ">

                    {/* Gold Button */}
                    <Link to="/collection">
                    <button
                      className="
                        bg-[#C6A75E]
                        hover:bg-[#B89645]
                        text-[#2A1A0B]
                        px-6 py-3 sm:px-7 md:px-8
                        rounded-full
                        font-medium
                        transition-all duration-300
                        shadow-md hover:shadow-xl
                        text-sm sm:text-base
                      "
                    >
                      Shop Handcrafted Gifts
                    </button>
                    </Link>

<Link to="/artician">
                    {/* Cream Button */}
                    <button
                      className="
                        bg-[#F3EAD8]
                        hover:bg-[#FFF7EA]
                        text-[#3A2A18]
                        px-6 py-3 sm:px-7 md:px-8
                        rounded-full
                        font-medium
                        transition-all duration-300
                        shadow-md hover:shadow-xl
                        text-sm sm:text-base
                      "
                    >
                      Meet Our Artisans
                    </button>
</Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper arrows & dots */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3A2A18 !important;
          background: #F3EAD8;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        @media (min-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 44px;
            height: 44px;
          }
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 14px;
        }

        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.6);
        }

        .swiper-pagination-bullet-active {
          background: #F6F1E8;
          width: 20px;
          border-radius: 10px;
        }
      `}</style>

    </div>
  );
}

export default Banner;
