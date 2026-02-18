import React from "react";
import { Link } from "react-router-dom";
// Import the artisan image as provided in your assets
import artisanImg from "../../../assets/roshni/artician.png";

const ArtisanStorySection = () => {
  return (
    <section className="bg-[#FDFBF7] py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#C5A059]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#0F3D2E]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT: ARTISAN VISUALS (LG: 5 cols) --- */}
          <div className="lg:col-span-5 relative group">
            {/* Main Image Frame */}
            <div className="relative z-20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white">
              <img
                src={artisanImg}
                alt="Muga Silk Weaver from Assam"
                className="w-full h-[400px] md:h-[550px] lg:h-[600px] object-cover transition-transform duration-[3000ms] group-hover:scale-110"
              />
              {/* Authenticity Badge Overlay */}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Master Artisan</span>
              </div>
            </div>

            {/* Decorative Borders */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#C5A059]/30 rounded-tl-3xl z-10 hidden md:block" />
            <div className="absolute -bottom-10 -right-6 w-1/2 h-1/2 bg-[#0F3D2E]/5 rounded-3xl -z-10 group-hover:translate-x-4 transition-transform duration-700" />

            {/* --- FLOATING QUOTE CARD --- */}
            <div className="absolute -bottom-6 -right-2 md:-right-12 lg:-right-8 z-30 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-6 md:p-8 max-w-[260px] md:max-w-sm border border-stone-100 transform transition-all duration-500 hover:-translate-y-2">
              <span className="text-4xl font-serif text-[#C5A059]/40 leading-none">“</span>
              <p className="text-sm md:text-base italic text-[#4a3728] leading-relaxed font-serif -mt-2">
                Every thread I weave carries the wisdom of my ancestors. It is not just silk; it is our identity.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-[1px] w-8 bg-[#C5A059]" />
                <div>
                  <p className="font-serif font-bold text-[#332a21] text-sm md:text-base">Lakshmi Devi</p>
                  <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-black">Assam, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: STORY CONTENT (LG: 7 cols) --- */}
          <div className="lg:col-span-7 flex flex-col space-y-10 lg:pl-12 mt-10 lg:mt-0">
            {/* Section Eyebrow */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1.5px] w-10 bg-[#C5A059]" />
                <p className="text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.5em] font-black">
                  Our Human Connection
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#3A5A40] leading-[1.1] tracking-tight">
                Meet the <span className="font-light text-[#C5A059]">Makers</span> behind the magic
              </h2>
            </div>

            <div className="space-y-6 max-w-2xl text-[#6b5a4c] text-base md:text-lg leading-relaxed font-light">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#3A5A40] first-letter:mr-3 first-letter:float-left">
                Every gift you choose supports a living culture and the families who sustain it.
                In the quiet, mist-covered corners of <span className="text-[#3A5A40] font-medium border-b border-[#C5A059]/30">North East India</span>, traditions are not just taught; they are lived through every rhythmic movement of the loom.
              </p>

              <p className="italic bg-stone-50 p-6 rounded-2xl border-l-4 border-[#C5A059]/40">
                From the golden Muga silk of Assam to the resilient bamboo of Meghalaya, each piece is a vessel for centuries of identity. You aren't just buying an object; you're becoming a custodian of heritage.
              </p>
            </div>

            {/* IMPACT STATS */}
            <div className="grid grid-cols-3 gap-6 py-4 border-y border-stone-100">
              {[
                { label: "Artisans", val: "500+" },
                { label: "States", val: "08" },
                { label: "Impact", val: "Direct" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-2xl md:text-4xl font-serif text-[#0F3D2E]">{stat.val}</p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-black mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className=" flex flex-col sm:flex-row items-center gap-6">
              <Link
                to="/artisans"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full bg-[#3A5A40] text-white transition-all duration-500 hover:shadow-[0_15px_30px_rgba(15,61,46,0.3)] w-full sm:w-auto"
              >
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">
                  Read Their Stories
                </span>
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
              
              <p className="text-[11px] text-stone-400 font-medium uppercase tracking-widest hidden sm:block">
                Supported by the artisan guild
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArtisanStorySection;