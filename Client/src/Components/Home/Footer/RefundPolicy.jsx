import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-[#fdf8f1] min-h-screen font-sans">
      {/* Heritage Header Section */}
      <div className="bg-[#2C1B18] py-20 px-6 border-b-4 border-[#D4AF37]/20 relative overflow-hidden">
        {/* Subtle Background Decorative Element */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <span className="text-[25rem] font-serif text-[#D4AF37]">R</span>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#D4AF37] text-[10px] md:text-[12px] uppercase tracking-[0.6em] mb-4 font-bold">
            Customer Assurance
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdf8f1] tracking-tight">
            Refund <span className="text-[#D4AF37]">Policy</span>
          </h1>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-[#D4AF37]/30" />
            <p className="text-[#D4AF37]/80 italic font-serif text-sm">Our Commitment to Satisfaction</p>
            <div className="h-px w-16 bg-[#D4AF37]/30" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto p-4 md:p-12 lg:p-20">
        <div className="bg-white shadow-[0_20px_50px_rgba(44,27,24,0.04)] rounded-3xl p-6 md:p-16 border border-[#2C1B18]/5">
          
          <div className="text-[#2C1B18] leading-relaxed space-y-12">
            
            <section className="border-l-4 border-[#D4AF37] pl-8 py-2">
              <p className="text-lg md:text-xl font-serif opacity-90 italic">
                Your satisfaction with our handcrafted treasures is paramount. If a piece doesn't meet your expectations, we are here to help.
              </p>
            </section>

            {/* Refund Eligibility & Non-Refundable - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section className="space-y-4">
                <h2 className="text-xl font-serif text-[#2C1B18] flex items-center gap-3">
                  <span className="w-6 h-px bg-[#D4AF37]" />
                  Refund Eligibility
                </h2>
                <p className="text-sm md:text-base opacity-80 leading-relaxed">
                  Requests must be made within <span className="font-bold border-b border-[#D4AF37]">7 days</span> of receipt. Items must be unused, in original heritage packaging, with valid proof of purchase.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-serif text-[#2C1B18] flex items-center gap-3">
                  <span className="w-6 h-px bg-[#D4AF37]" />
                  Non-Refundable
                </h2>
                <p className="text-sm md:text-base opacity-80 leading-relaxed">
                  Customized, personalized, or perishable items (e.g., local treats or flowers) are final sale unless arriving damaged or defective.
                </p>
              </section>
            </div>

            {/* Process Timeline */}
            <div className="pt-4">
              <h2 className="text-xl md:text-2xl font-serif text-[#2C1B18] flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-[#D4AF37]" />
                The Refund Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: "01", title: "Inspection", desc: "We review the returned item upon arrival." },
                  { step: "02", title: "Approval", desc: "Notification sent regarding refund status." },
                  { step: "03", title: "Credit", desc: "Funds processed within 5–7 business days." }
                ].map((item, i) => (
                  <div key={i} className="bg-[#fdf8f1] p-6 rounded-2xl border border-[#D4AF37]/10 text-center">
                    <span className="text-[#D4AF37] font-serif text-2xl font-bold block mb-2">{item.step}</span>
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-2">{item.title}</h3>
                    <p className="text-xs opacity-70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Contact CTA */}
            <div className="bg-[#2C1B18] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-4">Need to Initiate a Return?</h2>
                  <p className="text-sm md:text-base opacity-80 mb-8 max-w-xl mx-auto">
                    Please reach out to our support concierge with your order number and any relevant photos of the product.
                  </p>
               </div>
               {/* Decorative Circle */}
               <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-[#D4AF37]/20 rounded-full" />
            </div>

          </div>
        </div>

        {/* Small Note */}
        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-[#2C1B18]/40">
          Shipping and handling charges are non-refundable except in cases of shipping errors.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;