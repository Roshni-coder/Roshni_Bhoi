import React from "react";
import { motion } from "framer-motion"; // Optional: for smooth entry animations

// Illustration icons
import imageone from '../../../assets/banner/o.jpg';
import imagetwo from "../../../assets/banner/t.jpg";
import imagethree from "../../../assets/banner/f.jpg";
import imagefour from "../../../assets/banner/r.jpg";

const FeaturesSection = () => {
  const features = [
    {
      title: "Authentic & Handmade",
      subtitle: "Crafted with Care",
      description: "Made by skilled artisans using traditional techniques — never factory-produced.",
      img: imageone,
      num: "01"
    },
    {
      title: "Direct from Artisans",
      subtitle: "Fair & Ethical",
      description: "Sourced directly from creators to ensure fair pricing and ethical livelihoods.",
      img: imagetwo,
      num: "02"
    },
    {
      title: "Culturally Rich",
      subtitle: "Stories in Every Gift",
      description: "Each product reflects the heritage, culture, and traditions of the North East.",
      img: imagethree,
      num: "03"
    },
    {
      title: "Pan-India Delivery",
      subtitle: "Safe & Reliable",
      description: "Secure packaging and dependable delivery across every corner of India.",
      img: imagefour,
      num: "04"
    },
  ];

  return (
    <section className="py-20 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0F3D2E]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-[#C5A059]/40" />
            <span className="text-[#C5A059] text-[11px] font-black uppercase tracking-[0.3em]">
              Our Ethical Promise
            </span>
            <span className="h-[1px] w-12 bg-[#C5A059]/40" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#0F3D2E] leading-tight mb-6">
            Why <span className="italic text-[#C5A059]">Gifts</span> from North East?
          </h2>
          
          <p className="text-[#6b5a4c] text-lg font-light leading-relaxed opacity-80 italic">
            "Connecting you to the soulful craftsmanship of our ancestors through conscious gifting."
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-[2rem] border border-stone-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(197,160,89,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center"
            >
              {/* Floating Number Label */}
              <span className="absolute top-6 right-8 font-serif text-4xl text-[#C5A059]/10 font-bold group-hover:text-[#C5A059]/20 transition-colors">
                {feature.num}
              </span>

              {/* Image Container with Custom Shape */}
              <div className="relative mb-8 w-32 h-32 md:w-36 md:h-36">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/20 to-transparent rounded-full scale-110 group-hover:rotate-45 transition-transform duration-700" />
                
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-50">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Subtitle Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-[#0F3D2E] text-white px-4 py-1.5 rounded-full shadow-lg border border-white/10 scale-90 md:scale-100">
                    <span className="text-[9px] font-bold uppercase tracking-widest block whitespace-nowrap">
                      {feature.subtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center mt-4">
                <h3 className="text-xl font-serif text-[#0F3D2E] mb-4 group-hover:text-[#C5A059] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-[#6b5a4c] text-sm leading-relaxed font-light opacity-80 min-h-[60px]">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 flex justify-center">
                  <div className="h-[2px] w-8 bg-[#C5A059]/30 rounded-full group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Detail */}
        {/* <div className="mt-20 flex flex-col items-center gap-4">
          <div className="w-10 h-[1px] bg-[#C5A059]/20" />
          <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-[0.5em]">
            Tradition Redefined
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturesSection;