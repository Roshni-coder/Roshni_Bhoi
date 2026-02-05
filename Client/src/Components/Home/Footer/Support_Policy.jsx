import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
  FaCheckCircle,
  FaUndoAlt,
  FaBoxOpen,
  FaUserShield,
  FaComments,
} from 'react-icons/fa';

const CardSection = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(44,27,24,0.04)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)] transition-all duration-300 p-8 space-y-4 border border-[#2C1B18]/5 group">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="text-[#D4AF37] text-xl group-hover:scale-110 transition-transform" />}
      {title && <h2 className="text-lg font-serif font-bold text-[#2C1B18] tracking-wide">{title}</h2>}
    </div>
    <div className="text-sm text-[#2C1B18]/80 leading-relaxed">{children}</div>
  </div>
);

function Support_Policy() {
  return (
    <div className="bg-[#fdf8f1] min-h-screen font-sans">
      {/* Heritage Header Section */}
      <div className="bg-[#2C1B18] py-20 px-6 border-b-4 border-[#D4AF37]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <span className="text-[25rem] font-serif text-[#D4AF37]">S</span>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#D4AF37] text-[10px] md:text-[12px] uppercase tracking-[0.6em] mb-4 font-bold">
            Concierge Services
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdf8f1] tracking-tight">
            Support <span className="text-[#D4AF37]">& Service</span>
          </h1>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-[#D4AF37]/30" />
            <p className="text-[#D4AF37]/80 italic font-serif text-sm">Your Satisfaction is Our Heritage</p>
            <div className="h-px w-16 bg-[#D4AF37]/30" />
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-lg text-[#2C1B18]/70 italic font-serif max-w-2xl mx-auto mb-16">
          "Our relationship with you doesn't end at delivery. We are dedicated to ensuring your experience with our handcrafted treasures is as seamless as the craft itself."
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <CardSection title="Concierge Channels" icon={FaEnvelope}>
            <ul className="space-y-3">
              {/* <li className="flex items-center gap-2"><FaEnvelope className="text-[#D4AF37]" /> sales@giftNgifts.com</li> */}
              <li className="flex items-center gap-2"><FaPhoneAlt className="text-[#D4AF37]" /> +91 93650 55344</li>
              <li className="flex items-center gap-2"><FaComments className="text-[#D4AF37]" /> Live Artisanal Chat</li>
              <li className="mt-4 pt-4 border-t border-[#D4AF37]/10 text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">Response: 24–48 Hours</li>
            </ul>
          </CardSection>

          <CardSection title="Operating Hours" icon={FaRegClock}>
            <ul className="space-y-2 font-serif italic">
              <li>Monday – Saturday</li>
              <li className="text-xl text-[#2C1B18]">10:00 AM – 6:00 PM IST</li>
              <li className="pt-2 text-xs opacity-60 uppercase tracking-tighter not-italic font-sans">Closed on Sundays & Public Holidays</li>
            </ul>
          </CardSection>

          <CardSection title="Order Assistance" icon={FaCheckCircle}>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Tracking & Delivery Status</li>
              <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Cart & Payment Queries</li>
              <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Order Modification</li>
              <li className="mt-4 text-[10px] italic opacity-60">Please have your Order ID ready.</li>
            </ul>
          </CardSection>

          <CardSection title="Returns & Redressal" icon={FaUndoAlt}>
            <p className="mb-3 italic">Not fully satisfied?</p>
            <ul className="space-y-2">
              <li>• Returns accepted within 7 days</li>
              <li>• Must be in original heritage packaging</li>
              <li>• Refunds processed in 5–7 working days</li>
            </ul>
          </CardSection>

          <CardSection title="Craft Quality Issues" icon={FaBoxOpen}>
            <p className="mb-2">If your treasure arrives damaged:</p>
            <ul className="space-y-2">
              <li className="text-xs">1. Capture clear photos of the defect</li>
              <li className="text-xs">2. Email us within 48 hours of delivery</li>
              <li className="text-xs">3. We will arrange an artisanal replacement</li>
            </ul>
          </CardSection>

          <CardSection title="Resolution Journey" icon={FaUserShield}>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                <span>Standard Queries</span>
                <span className="text-[#D4AF37]">1-2 Days</span>
              </div>
              <div className="w-full bg-[#2C1B18]/5 h-1 rounded-full overflow-hidden">
                <div className="bg-[#D4AF37] h-full w-2/3"></div>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                <span>Complex Issues</span>
                <span className="text-[#D4AF37]">5 Days</span>
              </div>
            </div>
          </CardSection>

        </div>

        {/* Escalation Matrix Footer */}
        <div className="mt-20 bg-[#2C1B18] rounded-3xl p-10 text-center relative overflow-hidden">
          <h2 className="text-[#D4AF37] font-serif text-2xl mb-6">Escalation Path</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-white/80 text-sm">
            <div className="flex flex-col">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[.3em] mb-1">Level 1</span>
              <span>+91 93650 55344</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-[#D4AF37]/20"></div>
            <div className="flex flex-col">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[.3em] mb-1">Level 2</span>
              <span>+91 81470 21513</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[#2C1B18]/40 text-right uppercase tracking-[0.4em] mt-12 italic">
          Last updated: June 17, 2025 • GiftsnGifts India
        </p>
      </section>
    </div>
  );
}

export default Support_Policy;