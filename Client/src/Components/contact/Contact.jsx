import React from "react";
import { HiLocationMarker, HiPhone, HiClock } from "react-icons/hi";

const Contact = () => {
  return (
    <div className="bg-[#faf9f6] min-h-screen font-sans text-[#2f3e2f] selection:bg-[#bfa46f] selection:text-white">
      {/* Header Section */}
      <div className="pt-24 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#fff9eb] border border-[#f3e0b5] px-5 py-1.5 rounded-full mb-8 shadow-sm">
          <span className="text-[#bfa46f] text-[10px] font-bold uppercase tracking-[0.2em]">Our Heritage Network</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-[#1f3d2b] tracking-tight">
          Get in <span className="italic text-[#d97706] font-light">Touch</span>
        </h1>
        
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg font-light">
          From the bustling heart of Mumbai to our roots in the serene landscapes of Assam, 
          we are here to assist you.
        </p>
      </div>

      {/* Main Info Container */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-xl shadow-black/5 border border-gray-50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* 1. Address Section - Prominent Layout */}
            <div className="p-10 md:p-14 flex flex-col items-center text-center group hover:bg-[#faf9f6] transition-colors duration-500">
              <div className="w-16 h-16 bg-[#1f3d2b]/5 rounded-2xl flex items-center justify-center mb-8 ">
                <HiLocationMarker className="text-3xl text-[#bfa46f] " />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#bfa46f] mb-8">Our Roots</h3>
              
              <div className="space-y-8 w-full">
                <div className="relative">
                  <span className="text-[10px] font-bold text-[#1f3d2b] uppercase block mb-2 tracking-widest opacity-60">Corporate Hub</span>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    7C/702, Dr. Babasaheb Ambedkar Road, <br/> Parel, Mumbai – 400012
                  </p>
                </div>
                
                <div className="pt-8 border-t border-dashed border-gray-200 relative">
                  <span className="text-[10px] font-bold text-[#1f3d2b] uppercase block mb-2 tracking-widest opacity-60">Registered Office</span>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    Krishna Apartment, Ambikapatty, <br/> Silchar – 788004, Assam
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Mobile Section */}
            <div className="p-10 md:p-14 flex flex-col items-center text-center group hover:bg-[#faf9f6] transition-colors duration-500">
              <div className="w-16 h-16 bg-[#1f3d2b]/5 rounded-2xl flex items-center justify-center mb-8 ">
                <HiPhone className="text-3xl text-[#bfa46f] " />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#bfa46f] mb-8">Connect Directly</h3>
              <div className="space-y-4">
                <a href="tel:+919365055344" className="text-md font-bold text-[#1f3d2b] block hover:text-[#d97706] transition-colors">
                  +91 93650 55344
                </a>
                <a href="tel:+918147021513" className="text-md font-bold text-[#1f3d2b] block hover:text-[#d97706] transition-colors">
                  +91 81470 21513
                </a>
              </div>
              <div className="mt-10 px-6 py-2 rounded-full border border-green-100 bg-green-50/50 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">WhatsApp Active</span>
              </div>
            </div>

            {/* 3. Timing Section */}
            <div className="p-10 md:p-14 flex flex-col items-center text-center group hover:bg-[#faf9f6] transition-colors duration-500">
              <div className="w-16 h-16 bg-[#1f3d2b]/5 rounded-2xl flex items-center justify-center mb-8 ">
                <HiClock className="text-3xl text-[#bfa46f] " />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#bfa46f] mb-8">Concierge Hours</h3>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full group-hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-700 font-medium mb-1">Monday – Saturday</p>
                <p className="text-3xl font-serif text-[#1f3d2b] my-2">10:00 – 18:00</p>
                <div className="h-px w-8 bg-[#bfa46f] mx-auto my-3"></div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Indian Standard Time</p>
              </div>
              <p className="mt-8 text-[11px] text-gray-400 italic">Closed on Sundays & Public Holidays</p>
            </div>

          </div>
        </div>

        {/* Brand Sign-off */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gray-200"></div>
            <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-bold">
              GiftsnGifts India
            </p>
            <div className="h-px w-12 bg-gray-200"></div>
          </div>
          {/* <div className="flex justify-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#bfa46f]/40"></span>
             <span className="w-1.5 h-1.5 rounded-full bg-[#bfa46f]/70"></span>
             <span className="w-1.5 h-1.5 rounded-full bg-[#bfa46f]"></span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;