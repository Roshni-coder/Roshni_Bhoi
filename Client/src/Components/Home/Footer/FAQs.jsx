import React from "react";

const FAQItem = ({ question, answer }) => (
  <div className="group border-b border-[#D4AF37]/20 pb-6 transition-all duration-300">
    <h2 className="text-lg md:text-xl font-serif text-[#2C1B18] mb-3 flex items-start gap-3 group-hover:text-[#D4AF37] transition-colors cursor-default">
      <span className="text-[#D4AF37] mt-1 text-sm">✦</span>
      {question}
    </h2>
    <div className="pl-7 text-sm md:text-base text-[#2C1B18]/70 leading-relaxed font-light">
      {answer}
    </div>
  </div>
);

const FAQs = () => {
  return (
    <div className="bg-[#fdf8f1] min-h-screen font-sans">
      {/* Heritage Header Section */}
      <div className="bg-[#2C1B18] py-20 px-6 border-b-4 border-[#D4AF37]/20 relative overflow-hidden">
        {/* Subtle Background Decorative Element */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <span className="text-[25rem] font-serif text-[#D4AF37]">?</span>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#D4AF37] text-[10px] md:text-[12px] uppercase tracking-[0.6em] mb-4 font-bold">
            Knowledge Base
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdf8f1] tracking-tight">
            Common <span className="text-[#D4AF37]">Questions</span>
          </h1>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-[#D4AF37]/30" />
            <p className="text-[#D4AF37]/80 italic font-serif text-sm">How can we assist you today?</p>
            <div className="h-px w-16 bg-[#D4AF37]/30" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20">
        <div className="bg-white shadow-[0_20px_50px_rgba(44,27,24,0.04)] rounded-3xl p-8 md:p-16 border border-[#2C1B18]/5">
          
          <div className="space-y-10">
            <FAQItem 
              question="What payment methods do you accept?" 
              answer="We honor your trust with secure transactions via UPI (Paytm, PhonePe), Net Banking, all major Credit/Debit cards, and international gateways including Razorpay and PayPal." 
            />

            <FAQItem 
              question="How can I track my heritage order?" 
              answer="Once your handcrafted item is dispatched, a tracking link will be shared via email and SMS. You can also view real-time updates under the 'My Orders' section of your profile." 
            />

            <FAQItem 
              question="Can I cancel or modify my selection?" 
              answer="Orders may be modified or cancelled before they enter the shipping process. Once a treasure is dispatched, we cannot halt the delivery. Please contact our concierge immediately for urgent adjustments." 
            />

            <FAQItem 
              question="Do you offer same-day delivery?" 
              answer="Yes, for select artisanal pieces in metropolitan cities. Orders must be placed before 12 PM local time to qualify for our expedited same-day service." 
            />

            <FAQItem 
              question="What is your return policy?" 
              answer={<>We accept returns within 7 days for unused items in original packaging. For a full guide on the process, please visit our <span className="text-[#D4AF37] font-bold cursor-pointer underline underline-offset-4">Refund Policy</span> page.</>} 
            />

            <FAQItem 
              question="Do you offer gift wrapping?" 
              answer="Absolutely. We offer premium heritage gift wrapping that reflects the aesthetic of the North East. You can select this option at the checkout stage." 
            />

            <FAQItem 
              question="Is my personal information secure?" 
              answer="With the highest regard for your privacy, we use industry-standard encryption. Your personal data is treated with strict confidentiality and is never shared with unauthorized third parties." 
            />

            {/* Support CTA Section */}
            <div className="mt-16 pt-10 border-t-2 border-[#fdf8f1] text-center">
              <h3 className="font-serif text-2xl text-[#2C1B18] mb-4">Still have questions?</h3>
              <p className="text-sm text-[#2C1B18]/60 mb-8">Our support team is available from 9 AM – 9 PM IST to assist you.</p>
              
              <div className="flex flex-col  items-center justify-center gap-3">
                <span className="text-xs font-serif italic text-[#2C1B18]/40">or call us at</span>
                <p className="font-serif text-[#2C1B18] font-bold underline decoration-[#D4AF37]">(+91) 93650 55344</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-[#2C1B18]/40">
          GiftsnGifts • Curating the Finest Crafts of India
        </p>
      </div>
    </div>
  );
};

export default FAQs;