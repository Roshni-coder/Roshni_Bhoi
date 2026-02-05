import React from "react";

const ShippingInfo = () => {
  const deliveryStages = [
    { type: "Standard Delivery", time: "3–5 business days", icon: "📦" },
    { type: "Express Delivery", time: "1–2 business days", icon: "🚀" },
    { type: "Same-Day Delivery", time: "Order before 12 PM", icon: "✨" },
  ];

  return (
    <div className="bg-[#fdf8f1] min-h-screen">
      {/* Heritage Header Section - Matching the Meghalaya/Assam Header Style */}
      <div className="bg-[#2C1B18] py-16 px-6 border-b-2 border-[#D4AF37]/30 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold">
            Logistics & Care
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#fdf8f1] tracking-tight">
            Shipping <span className="text-[#D4AF37]">Information</span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#D4AF37]/40" />
            <p className="text-[#D4AF37]/70 italic font-serif text-sm">Timely Treasures</p>
            <div className="h-px w-12 bg-[#D4AF37]/40" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="bg-white shadow-[0_10px_40px_rgba(44,27,24,0.05)] rounded-2xl p-8 md:p-12 border border-[#2C1B18]/5">
          
          <p className="text-[#2C1B18] text-center italic font-serif mb-12 opacity-80">
            "At GiftsnGifts, we strive to deliver your handcrafted treasures with the same care they were created with."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {deliveryStages.map((stage, index) => (
              <div key={index} className="bg-[#fdf8f1] p-6 rounded-xl border border-[#D4AF37]/20 text-center ">
                <div className="text-2xl mb-2">{stage.icon}</div>
                <h3 className="text-[#2C1B18] group-hover:text-[#D4AF37] font-serif font-bold text-sm mb-1">{stage.type}</h3>
                <p className="text-[11px] text-[#2C1B18]/60 group-hover:text-white/70 uppercase tracking-widest">{stage.time}</p>
              </div>
            ))}
          </div>

          <div className="space-y-10 text-[#2C1B18]">
            {/* Delivery Areas */}
            <section className="relative pl-8">
              <div className="absolute left-0 top-0 text-[#D4AF37] font-serif text-xl">✦</div>
              <h2 className="font-serif text-xl mb-3 text-[#2C1B18]">Delivery Areas</h2>
              <p className="text-sm leading-relaxed opacity-80">
                We currently deliver across major cities in India. For remote or non-serviceable areas in the heart of the North East, availability will be confirmed at checkout.
              </p>
            </section>

            {/* Shipping Charges */}
            <section className="relative pl-8">
              <div className="absolute left-0 top-0 text-[#D4AF37] font-serif text-xl">✦</div>
              <h2 className="font-serif text-xl mb-3 text-[#2C1B18]">Shipping Charges</h2>
              <div className="bg-[#fdf8f1] p-4 rounded-lg inline-block border-l-4 border-[#D4AF37]">
                <p className="text-sm font-bold">Free shipping on orders above ₹999</p>
                <p className="text-xs opacity-60 mt-1">Orders below ₹999: Delivery charge of ₹49–₹99</p>
              </div>
            </section>

            {/* Packaging & Tracking */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section className="relative pl-8">
                <div className="absolute left-0 top-0 text-[#D4AF37] font-serif text-xl">✦</div>
                <h2 className="font-serif text-lg mb-2">Gift Packaging</h2>
                <p className="text-sm opacity-80">All items are securely packed in eco-friendly heritage wraps. Gift wrapping is available for select artisanal products.</p>
              </section>

              <section className="relative pl-8">
                <div className="absolute left-0 top-0 text-[#D4AF37] font-serif text-xl">✦</div>
                <h2 className="font-serif text-lg mb-2">Order Tracking</h2>
                <p className="text-sm opacity-80">Receive a real-time tracking link via email or SMS once your heritage treasure is dispatched.</p>
              </section>
            </div>

            {/* Support */}
            <section className="mt-12 p-8 bg-[#2C1B18] rounded-2xl text-center">
              <h2 className="font-serif text-[#D4AF37] text-xl mb-2">Need Assistance?</h2>
              <p className="text-white/70 text-sm mb-4">Our dedicated team is available 9 AM – 9 PM to assist with your journey.</p>
              <div className="h-px w-24 bg-[#D4AF37]/30 mx-auto" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;