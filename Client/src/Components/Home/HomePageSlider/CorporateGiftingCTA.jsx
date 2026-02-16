import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineOfficeBuilding,
  HiOutlineGift,
  HiOutlineTruck,
  HiArrowRight,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

function CorporateGiftingCTA() {
  // Using a consistent serif stack for the entire component
  const serifFont = { fontFamily: "'Playfair Display', serif" };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F9F8F3] overflow-hidden">
      {/* Decorative Heritage Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#3A5A40]/5 skew-x-12 transform translate-x-20" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#A6894A]/10 rounded-full blur-3xl" />
        {/* Subtle texture overlay for a "handmade paper" feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="relative max-w-7xl mx-auto" style={serifFont}>
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A6894A]/10 border border-[#A6894A]/20 mb-6">
            <HiOutlineSparkles className="w-4 h-4 text-[#A6894A]" />
            <span className="text-[12px] font-bold text-[#A6894A] uppercase tracking-[0.2em]">
              Elevate Your Corporate Gifting
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Authentic Heritage for <br className="hidden sm:block" />
            <span className="text-[#3A5A40] ">Modern Businesses</span>
          </h2>

          <p className="text-[#555] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed opacity-90">
            Strengthen professional bonds with handcrafted treasures from North East India. 
            From artisan-made decor to sustainable stationery.
          </p>
        </div>

        {/* Stats Strip - Minimalist Serif Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: "500+", label: "Trusted Partners" },
            { value: "10K+", label: "Gifts Delivered" },
            { value: "100+", label: "Master Artisans" },
            { value: "4.5★", label: "Client Rating" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-[#EBE9E0] text-center group hover:border-[#A6894A] transition-colors">
              <div className="text-3xl font-bold text-[#3A5A40] mb-2">{stat.value}</div>
              <div className="text-xs font-bold text-[#888] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {/* Main CTA - Gift Finder */}
          <Link
            to="/gift-finder"
            className="group relative overflow-hidden rounded-3xl p-10 bg-[#3A5A40] text-white transition-all hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20">
                <HiOutlineSparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Gift Finder Quiz</h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Take our 1-minute quiz to find the perfect artisan gifts tailored to your budget.
              </p>
              <div className="flex items-center gap-3 font-bold text-base group-hover:gap-5 transition-all">
                Start Discovery <HiArrowRight className="w-5 h-5" />
              </div>
            </div>
            {/* Artistic Watermark */}
            <HiOutlineGift className="absolute -bottom-6 -right-6 w-48 h-48 opacity-10 rotate-12" />
          </Link>

          {/* Bulk Orders */}
          <Link
            to="/bulk-quote"
            className="group rounded-3xl p-10 bg-white border border-[#EBE9E0] hover:border-[#A6894A] transition-all hover:shadow-xl hover:-translate-y-2"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#A6894A]/10 flex items-center justify-center mb-8">
              <HiOutlineOfficeBuilding className="w-7 h-7 text-[#A6894A]" />
            </div>
            <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4 tracking-tight">Bulk Orders</h3>
            <p className="text-[#666] text-lg mb-8 leading-relaxed">
              Wholesale pricing and custom branding options for orders above 50 units.
            </p>
            <div className="flex items-center gap-3 text-[#A6894A] font-bold text-base group-hover:gap-5 transition-all">
              Request Catalog <HiArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* Occasions */}
          <Link
            to="/shop-by-occasion"
            className="group rounded-3xl p-10 bg-white border border-[#EBE9E0] hover:border-[#3A5A40] transition-all hover:shadow-xl hover:-translate-y-2"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#3A5A40]/10 flex items-center justify-center mb-8">
              <HiOutlineGift className="w-7 h-7 text-[#3A5A40]" />
            </div>
            <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4 tracking-tight text-[#1a1a1a]">Occasions</h3>
            <p className="text-[#666] text-lg mb-8 leading-relaxed">
              Curated hampers for Diwali, Annual Meets, and Employee Onboarding.
            </p>
            <div className="flex items-center gap-3 text-[#3A5A40] font-bold text-base group-hover:gap-5 transition-all">
              Browse Collections <HiArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Trust Badges - Simplified Serif footer */}
        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-[#EBE9E0] pt-12">
          {[
            { icon: <HiOutlineBadgeCheck />, text: "Custom Logo Branding" },
            { icon: <HiOutlineTruck />, text: "Reliable Pan-India Shipping" },
            { icon: <HiOutlineOfficeBuilding />, text: "Dedicated Account Manager" },
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3 text-base font-semibold text-[#444]">
              <span className="text-[#3A5A40] text-xl">{benefit.icon}</span>
              {benefit.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CorporateGiftingCTA;