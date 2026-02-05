import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-[#fdf8f1] min-h-screen">
      {/* Heritage Header Section */}
      <div className="bg-[#2C1B18] py-16 px-6 border-b-2 border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold">
            Legal Framework
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#fdf8f1] tracking-tight">
            Terms & <span className="text-[#D4AF37]">Conditions</span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#D4AF37]/50" />
            <p className="text-[#D4AF37]/70 italic font-serif text-sm">Established 1994</p>
            <div className="h-px w-12 bg-[#D4AF37]/50" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16">
        <div className="bg-white shadow-[0_10px_40px_rgba(44,27,24,0.05)] rounded-2xl p-8 md:p-12 border border-[#2C1B18]/5">
          
          <div className="text-[#2C1B18] leading-relaxed space-y-8">
            
            <section className="border-l-4 border-[#D4AF37] pl-6 py-2">
              <p className="text-lg italic font-serif">
                Dear Customers, Welcome to <span className="font-bold text-[#2C1B18]">GiftsnGifts</span>!
              </p>
            </section>

            <article className="space-y-4 font-light opacity-90">
              <p>
                The following Terms and Conditions shall apply to your use of the website owned and operated by 
                GiftsnGifts, a platform dedicated to preserving the authentic craftsmanship of North East India. 
                The services are provided through <span className="text-[#D4AF37] font-medium">www.giftngifts.in</span>, 
                under the brand name ‘GiftsnGifts’ (also referred to as “GNG” / “We” / “Us”).
              </p>

              <p>
                This document is published in accordance with the Rule 3(1) of the IT Rules, 2021, and Rule 5 of 
                the Consumer Protection Rules, 2020. By accessing our handcrafted treasures, you agree to these 
                terms in conjunction with our Privacy Policy and Disclaimer.
              </p>
            </article>

            {/* General Terms */}
            <div className="pt-8">
              <h2 className="text-xl font-serif text-[#2C1B18] border-b border-[#D4AF37]/20 pb-2 mb-6">
                1. General Terms
              </h2>
              <ul className="space-y-4">
                {[
                  "Represent and warrant that you are legally competent to enter into this agreement.",
                  "Accept the Terms outlined herein and agree to be bound by them when using our services.",
                  "Authorized use: If acting on behalf of an entity, you confirm authority to bind them to these terms."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-sm md:text-base">
                    <span className="text-[#D4AF37] font-serif font-bold">0{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="pt-8">
              <h2 className="text-xl font-serif text-[#2C1B18] border-b border-[#D4AF37]/20 pb-2 mb-6">
                2. Website Functionality & Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Browse and search for heritage treasures.",
                  "Secure payments via integrated gateways.",
                  "Place orders for global delivery.",
                  "Access expert support for queries."
                ].map((service, i) => (
                  <div key={i} className="bg-[#fdf8f1] p-4 rounded-lg border border-[#2C1B18]/5 text-sm">
                    <span className="text-[#D4AF37] mr-2">✦</span> {service}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm italic opacity-70">
                GNG reserves the right to modify or discontinue any artisanal collection without prior notice.
              </p>
            </div>

            {/* Restrictions */}
            <div className="pt-8">
              <h2 className="text-xl font-serif text-[#2C1B18] border-b border-[#D4AF37]/20 pb-2 mb-6">
                3. User Access & Restrictions
              </h2>
              <p className="text-sm md:text-base opacity-80">
                GNG retains the right to deny access if a user violates these heritage-preservation standards 
                or any applicable Indian law. Fraudulent activity regarding handcrafted goods may result 
                in permanent suspension and legal action.
              </p>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#2C1B18]/40">
            Last Updated: October 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;