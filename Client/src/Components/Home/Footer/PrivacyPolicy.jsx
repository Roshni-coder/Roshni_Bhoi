import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#fdf8f1] min-h-screen font-sans">
      {/* Heritage Header Section */}
      <div className="bg-[#2C1B18] py-20 px-6 border-b-4 border-[#D4AF37]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <span className="text-[25rem] font-serif text-[#D4AF37]">P</span>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#D4AF37] text-[10px] md:text-[12px] uppercase tracking-[0.6em] mb-4 font-bold">
            Data Stewardship
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdf8f1] tracking-tight leading-tight">
            Privacy <span className="text-[#D4AF37]">Policy</span>
          </h1>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-[#D4AF37]/30" />
            <p className="text-[#D4AF37]/80 italic font-serif text-sm">Effective: 15th June 2025</p>
            <div className="h-px w-16 bg-[#D4AF37]/30" />
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto p-4 md:p-12 lg:p-20">
        <div className="bg-white shadow-[0_20px_50px_rgba(44,27,24,0.04)] rounded-3xl p-6 md:p-16 border border-[#2C1B18]/5">
          
          <div className="text-[#2C1B18] leading-relaxed space-y-12">
            
            <section className="border-l-4 border-[#D4AF37] pl-8 py-2">
              <p className="text-lg md:text-xl font-serif opacity-90 italic">
                At <span className="font-bold text-[#2C1B18]">GiftsnGifts</span>, we protect your personal information 
                with the same care we use to curate the artisanal treasures of the North East.
              </p>
            </section>

            {/* Information Categories */}
            <div className="pt-4">
              <h2 className="text-2xl font-serif text-[#2C1B18] flex items-center gap-4 mb-8">
                <span className="w-10 h-px bg-[#D4AF37]" />
                Information We Collect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Personal", items: ["Name & Email", "Shipping Address", "Payment Details"] },
                  { title: "Account", items: ["Order History", "Credentials", "User Preferences"] },
                  { title: "Technical", items: ["IP Address", "Browser Type", "Device Information"] }
                ].map((box, i) => (
                  <div key={i} className="bg-[#fdf8f1] p-6 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-colors">
                    <h3 className="text-[#D4AF37] font-serif font-bold mb-4 flex items-center gap-2">
                       <span className="text-xs">✦</span> {box.title}
                    </h3>
                    <ul className="text-sm space-y-3 opacity-80">
                      {box.items.map((li, j) => <li key={j} className="flex items-start gap-2">• {li}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage & Sharing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              <section>
                <h2 className="text-xl font-serif text-[#2C1B18] mb-6 border-b border-[#D4AF37]/20 pb-2">How We Use Data</h2>
                <ul className="space-y-4 text-sm md:text-base opacity-85">
                  <li>• Processing artisanal orders & customer service</li>
                  <li>• Updates on heritage collections & promotions</li>
                  <li>• Personalizing your cultural shopping experience</li>
                  <li>• Fraud prevention & security monitoring</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-serif text-[#2C1B18] mb-6 border-b border-[#D4AF37]/20 pb-2">Third-Party Trust</h2>
                <p className="text-sm md:text-base opacity-85 mb-4">
                  We share limited data with trusted partners solely to facilitate your experience:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Razorpay", "PayPal", "Shipping Partners", "Analytics Tools"].map((partner) => (
                    <span key={partner} className="px-3 py-1 bg-[#2C1B18]/5 rounded-full text-[10px] uppercase tracking-widest font-bold">
                      {partner}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Rights & Contact */}
            <div className="bg-[#2C1B18] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Exercise Your Rights</h2>
                  <p className="text-sm opacity-80 mb-8 max-w-xl mx-auto">
                    You have the right to access, update, or delete your personal data. 
                    Contact our Mega Support Store for any privacy-related requests.
                  </p>
                  <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
                    <span className="hidden md:inline text-[#D4AF37]/30">|</span>
                    <p className="font-serif italic">(+91) 93650 55344</p>
                  </div>
               </div>
               <div className="absolute -left-10 -top-10 w-40 h-40 border border-[#D4AF37]/10 rounded-full" />
            </div>

          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-[#2C1B18]/40 px-4 leading-relaxed">
          GiftsnGifts - Celebrating authentic handmade products from the heart of North East India.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;