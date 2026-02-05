import React from "react";

const TermsOfUse = () => {
  return (
    <div className="bg-[#fdf8f1] min-h-screen font-sans">
      {/* Heritage Header Section */}
      <div className="bg-[#2C1B18] py-20 px-6 border-b-4 border-[#D4AF37]/20 relative overflow-hidden">
        {/* Subtle Watermark Decorative Element */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <span className="text-[25rem] font-serif text-[#D4AF37]">T</span>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#D4AF37] text-[10px] md:text-[12px] uppercase tracking-[0.6em] mb-4 font-bold">
            Usage Guidelines
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdf8f1] tracking-tight">
            Terms of <span className="text-[#D4AF37]">Use</span>
          </h1>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-[#D4AF37]/30" />
            <p className="text-[#D4AF37]/80 italic font-serif text-sm">Governing Our Artisanal Platform</p>
            <div className="h-px w-16 bg-[#D4AF37]/30" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto p-4 md:p-12 lg:p-20">
        <div className="bg-white shadow-[0_20px_50px_rgba(44,27,24,0.04)] rounded-3xl p-6 md:p-16 border border-[#2C1B18]/5 relative">
          
          <div className="text-[#2C1B18] leading-relaxed space-y-12">
            
            <section className="border-l-4 border-[#D4AF37] pl-8 py-2">
              <p className="text-lg md:text-xl font-serif opacity-90 italic">
                By accessing <span className="font-bold text-[#2C1B18]">GiftsnGifts</span>, you agree to respect the traditions, intellectual property, and guidelines of our handcrafted community.
              </p>
            </section>

            {/* Disclaimer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4">
              <section className="space-y-4">
                <h2 className="text-xl font-serif text-[#2C1B18] flex items-center gap-3">
                  <span className="w-6 h-px bg-[#D4AF37]" />
                  General Disclaimer
                </h2>
                <p className="text-sm md:text-base opacity-80">
                  The information on our platform is for informational purposes only. While we celebrate accuracy, we make no warranties regarding the absolute completeness or reliability of handcrafted descriptions.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-serif text-[#2C1B18] flex items-center gap-3">
                  <span className="w-6 h-px bg-[#D4AF37]" />
                  Limitation of Liability
                </h2>
                <p className="text-sm md:text-base opacity-80">
                  GiftsnGifts shall not be held liable for any damages arising from the use of our website or reliance on content. Individual product variations are a mark of artisanal authenticity.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-serif text-[#2C1B18] flex items-center gap-3">
                  <span className="w-6 h-px bg-[#D4AF37]" />
                  Third-Party Links
                </h2>
                <p className="text-sm md:text-base opacity-80">
                  For your convenience, we may link to cultural or courier partners. We do not endorse or control the content, legality, or policies of these external heritage-related sites.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-serif text-[#2C1B18] flex items-center gap-3">
                  <span className="w-6 h-px bg-[#D4AF37]" />
                  Professional Advice
                </h2>
                <p className="text-sm md:text-base opacity-80">
                  Product descriptions or recommendations are for gifting inspiration and are not intended as professional advice. Users are responsible for their purchasing decisions.
                </p>
              </section>
            </div>

            {/* Updates & Contact Footer */}
            <div className="bg-[#fdf8f1] rounded-2xl p-8 border border-[#D4AF37]/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-serif font-bold text-lg mb-1">Policy Updates</h3>
                  <p className="text-xs opacity-60">We reserve the right to modify these terms. Review periodically for changes.</p>
                </div>
                <div className="h-px w-full md:w-px md:h-12 bg-[#D4AF37]/30" />
                <div className="text-center md:text-right">
                  <h3 className="font-serif font-bold text-lg mb-1">Concierge Contact</h3>
                  <a href="mailto:support@giftNgifts.com" className="text-[#D4AF37] hover:text-[#2C1B18] font-bold text-sm transition-colors">
                    +91 93650 55344
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-[#2C1B18]/40 px-4">
          GiftsnGifts India • Authentic Artisanal Network • All Rights Reserved 2026
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;