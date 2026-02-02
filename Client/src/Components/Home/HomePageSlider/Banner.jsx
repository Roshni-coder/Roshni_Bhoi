import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

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
    <section className="w-full overflow-hidden">
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
          h-[60vh]
          sm:h-[65vh]
          md:h-[65vh]
          lg:h-[55vh]
        "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              {/* Background Image */}
              <img
                src={slide.img}
                alt="North East Handicrafts"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#2C1A0F]/40" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="
                  w-full
                  px-4
                  sm:px-8
                  md:px-14
                  lg:px-24
                ">
                  <div className="max-w-xl sm:max-w-2xl md:max-w-3xl">

                    {/* Heading */}
                    <h1 className="
                      font-serif text-[#F6F1E8]
                      text-2xl sm:text-3xl md:text-5xl lg:text-5xl
                      leading-snug md:leading-tight
                      mb-3 sm:mb-4
                      drop-shadow-lg
                    ">
                      Handcrafted Gifts from <br className="hidden sm:block" />
                      the Heart of North East India
                    </h1>

                    {/* Divider */}
                    <div className="
                      w-16 sm:w-20 md:w-28
                      h-1 bg-[#C6A75E]
                      mb-4 sm:mb-6
                    " />

                    {/* Subtitle */}
                    <p className="
                      text-[#F6F1E8]
                      text-xs sm:text-sm md:text-lg
                      leading-relaxed
                      mb-6 sm:mb-8
                      max-w-md sm:max-w-lg
                    ">
                      Supporting local artisans across Assam, Meghalaya,
                      Nagaland, Manipur, Mizoram, Arunachal & Tripura.
                    </p>

                    {/* Buttons */}
                    <div className="
                      flex flex-col sm:flex-row
                      gap-3 sm:gap-4
                      w-full sm:w-auto
                    ">
                      <Link to="/collection">
                        <button
                          className="
                            w-full sm:w-auto
                            bg-[#C6A75E] hover:bg-[#B89645]
                            text-[#2A1A0B]
                            px-6 py-3 sm:px-8
                            rounded-full
                            font-medium
                            transition-all
                            shadow-md hover:shadow-xl
                            text-sm sm:text-base
                          "
                        >
                          Shop Handcrafted Gifts
                        </button>
                      </Link>

                      <Link to="/artician">
                        <button
                          className="
                            w-full sm:w-auto
                            bg-[#F3EAD8] hover:bg-[#FFF7EA]
                            text-[#3A2A18]
                            px-6 py-3 sm:px-8
                            rounded-full
                            font-medium
                            transition-all
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3a2a18 !important;
          background: #f3ead8;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
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
          background: #f6f1e8;
          width: 20px;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

export default Banner;
