import React from "react";
import { HiShieldCheck, HiRefresh, HiCube, HiChat } from "react-icons/hi";

const TrustBar = () => {
  const trustItems = [
    {
      icon: <HiShieldCheck />,
      text: "Secure Payments",
      subtext: "100% encrypted checkout",
    },
    {
      icon: <HiRefresh />,
      text: "Hassle-Free Returns",
      subtext: "7-day easy exchange",
    },
    {
      icon: <HiCube />,
      text: "Artisan Packaging",
      subtext: "Eco-friendly gift wrap",
    },
    {
      icon: <HiChat />,
      text: "Personal Concierge",
      subtext: "WhatsApp Support (10-7)",
      isClickable: true,
    },
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210";
    const message = encodeURIComponent("Hi! I need help with my order on GiftsNGifts.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="relative overflow-hidden bg-[#1A110B] py-10 px-6 border-t border-[#C5A059]/20">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {trustItems.map((item, index) => (
            <div
              key={index}
              onClick={item.isClickable ? handleWhatsAppClick : undefined}
              className={`group flex items-center justify-start sm:justify-center lg:justify-start gap-5 px-4 
                ${index !== trustItems.length - 1 ? "lg:border-r border-[#C5A059]/10" : ""} 
                ${item.isClickable ? "cursor-pointer" : ""}`}
            >
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 flex items-center justify-center text-[#C5A059] text-xl transition-all duration-500 group-hover:bg-[#C5A059] group-hover:text-white group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="absolute inset-0 rounded-full bg-[#C5A059]/20 blur-md opacity-0 group-hover:opacity-100 transition-all" />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-white text-[13px] font-black uppercase tracking-widest leading-none mb-1.5 group-hover:text-[#C5A059] transition-colors">
                  {item.text}
                </span>
                <span className="text-stone-500 text-[11px] font-medium italic tracking-tight">
                  {item.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;