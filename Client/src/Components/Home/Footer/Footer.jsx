import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const privacyLinks = [
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Terms of Use", path: "/terms-of-use" },
    // { name: "Disclaimer", path: "/disclaimer" },
  ];

  const serviceLinks = [
    { name: "Shipping Info", path: "/shipping-info" },
    { name: "Support Policy", path: "/support-policy" },
    { name: "FAQs", path: "/faqs" },
    // { name: "Bulk Orders", path: "/bulk-orders" },
    // { name: "Order Tracking", path: "/order-tracking" },
  ];

  return (
    <footer className="bg-[#2C1B18] text-[#fdf8f1] selection:bg-[#D4AF37] selection:text-[#2C1B18] mt-auto">
      {/* Heritage Gradient Top Border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* 1. Brand Story Column */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <Link to="/" className="inline-block group">
                <h2 className="text-4xl font-serif tracking-tight text-[#D4AF37] transition-all group-hover:brightness-125">
                  GiftsnGifts
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-px w-6 bg-[#D4AF37]/40"></div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/80">
                    Artisanal Heritage
                  </p>
                </div>
              </Link>
            </div>
            
            <p className="text-sm opacity-70 leading-relaxed font-light max-w-sm italic">
              "Preserving the soul of North East India through every handcrafted treasure. 
              From the hills of Meghalaya to the valleys of Assam, we bring timeless 
              craftsmanship to your doorstep."
            </p>

            {/* Premium Social Links
            <div className="flex items-center gap-10 pt-4">
              {[
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaYoutube, label: "YouTube" }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to="/"
                  className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-500 hover:scale-110"
                  aria-label={item.label}
                >
                  <item.Icon className="text-xl" />
                </Link>
              ))}
            </div> */}
          </div>

          {/* 2. Legals Column */}
          <div className="lg:col-span-3">
            <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-10 border-b border-[#D4AF37]/10 pb-2 inline-block">
              Legals
            </h3>
            <ul className="space-y-4">
              {privacyLinks.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path} 
                    className="text-xs opacity-60 hover:opacity-100 hover:text-[#D4AF37] transition-all tracking-widest font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Client Services & Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-10 border-b border-[#D4AF37]/10 pb-2 inline-block">
              Client Care
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ul className="space-y-4">
                {serviceLinks.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      className="text-xs opacity-60 hover:opacity-100 hover:text-[#D4AF37] transition-all tracking-widest font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-6 pt-6 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#D4AF37]/10 sm:pl-8">
                 
                <div className="space-y-1">
                  <span className="text-[9px] uppercase text-[#D4AF37]/50 font-bold tracking-tighter">Support Line</span>
                  <p className="text-sm font-serif italic text-[#D4AF37] tracking-wider">‪+91 93650 55344‬</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase text-[#D4AF37]/50 font-bold tracking-tighter">Support Line</span>
                  <p className="text-sm font-serif italic text-[#D4AF37] tracking-wider">‪+91 81470 21513‬</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Security */}
      <div className="bg-[#1F1311] py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="flex flex-col items-center md:items-start gap-2">
             <p className="text-[10px]  tracking-[0.4em] opacity-30">
              giftsngifts.in
             </p>
             <p className="text-[9px] opacity-20 tracking-wider">
               © 2026 All Rights Reserved. Crafted with love in North East India.
             </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <span className="text-[8px] uppercase tracking-[0.3em]">Authenticity Guaranteed</span>
                <span className="text-[8px] uppercase tracking-[0.3em]">Secure Checkout</span>
            </div>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
              alt="Payment Methods"
              className="h-4 grayscale invert opacity-30 hover:opacity-80 transition-all cursor-help"
            />
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;