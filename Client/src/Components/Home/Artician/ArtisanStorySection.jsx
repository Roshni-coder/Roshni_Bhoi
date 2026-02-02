import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import artisanImg from "../../../assets/roshni/artician.png";

const ArtisanStorySection = () => {
  return (
    <section className="bg-[#FDFBF7] py-16 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Texture Layer */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: ARTISAN VISUAL (Editorial Style) --- */}
          <div className="relative order-2 lg:order-1">
            {/* The Background Offset Square */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-[#0F3D2E]/5 rounded-2xl hidden md:block" />
            
            {/* Main Image Wrapper */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={artisanImg}
                alt="Master Artisan"
                className="w-full h-[450px] md:h-[600px] object-cover transition-transform duration-[4s] group-hover:scale-105"
              />
              
              {/* Floating ID Tag */}
              <div className="absolute top-6 left-6 flex flex-col gap-1">
                <span className="bg-[#C5A059] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm w-fit shadow-lg">
                  Certified
                </span>
                <span className="bg-white text-[#0F3D2E] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm w-fit shadow-lg">
                  Loom Master
                </span>
              </div>

              {/* Bottom Quote Overlay - Simple & Integrated */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F3D2E]/90 to-transparent p-8 md:p-10">
                <p className="text-white text-lg md:text-xl font-serif italic leading-relaxed">
                  "Every thread I weave carries the wisdom of my ancestors."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#C5A059]" />
                  <span className="text-[#C5A059] text-[11px] font-black uppercase tracking-widest">Lakshmi Devi, Assam</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: THE STORY (Clean Typography) --- */}
          <div className="flex flex-col space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[#C5A059] text-[11px] font-black uppercase tracking-[0.4em]">Our Purpose</span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#0F3D2E] leading-[1.1] tracking-tighter">
                Meet the <br /> 
                <span className="italic font-light text-[#C5A059]">Makers</span>
              </h2>
            </div>

            <div className="space-y-6 text-stone-600">
              <p className="text-lg md:text-xl leading-relaxed font-light">
                In the quiet corners of North East India, traditions are not just taught; 
                <span className="text-[#0F3D2E] font-medium"> they are lived.</span> Every rhythmic movement of the loom preserves a legacy that stretches back centuries.
              </p>
              <p className="text-base leading-relaxed opacity-80">
                By choosing a handcrafted gift, you aren’t just buying an object; you are sustaining a family and becoming a custodian of a living heritage.
              </p>
            </div>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-stone-100">
              <div>
                <p className="text-3xl font-serif text-[#0F3D2E]">500+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-black mt-1">Artisans Supported</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#0F3D2E]">Direct</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-black mt-1">Sustainable Impact</p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="pt-4">
              <Link
                to="/artisans"
                className="group inline-flex items-center gap-4 bg-[#0F3D2E] text-white px-10 py-5 rounded-full transition-all duration-500 hover:bg-[#C5A059] hover:shadow-2xl hover:shadow-[#C5A059]/20 w-full sm:w-auto justify-center"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Read Their Stories</span>
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArtisanStorySection;