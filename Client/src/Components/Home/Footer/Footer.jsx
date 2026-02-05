import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const privacyLinks = [
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Terms of Use", path: "/terms-of-use" },
  ];

  const serviceLinks = [
    { name: "Shipping Info", path: "/shipping-info" },
    { name: "Support Policy", path: "/support-policy" },
    { name: "FAQs", path: "/faqs" },
  ];

  return (
    <footer className="bg-[#2C1B18] text-[#fdf8f1] mt-auto">
      {/* Top Border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl sm:text-4xl font-serif text-[#D4AF37]">
                GiftsnGifts
              </h2>
              <p className="text-[10px] tracking-[0.35em] text-[#D4AF37]/80 mt-2">
                ARTISANAL HERITAGE
              </p>
            </Link>

            <p className="text-sm opacity-70 leading-relaxed max-w-sm italic">
              "Preserving the soul of North East India through every handcrafted
              treasure. From the hills of Meghalaya to the valleys of Assam."
            </p>
          </div>

          {/* Legals */}
          <div className="lg:col-span-3">
            <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">
              Legals
            </h3>
            <ul className="space-y-3">
              {privacyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-xs opacity-60 hover:text-[#D4AF37]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care */}
          <div className="lg:col-span-4">
            <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">
              Client Care
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-3">
                {serviceLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-xs opacity-60 hover:text-[#D4AF37]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t sm:border-t-0 sm:border-l border-[#D4AF37]/10 pt-4 sm:pt-0 sm:pl-6 space-y-4">
                <div>
                  <span className="text-[9px] uppercase text-[#D4AF37]/50">
                    Support Line
                  </span>
                  <p className="text-sm font-serif text-[#D4AF37]">
                    +91 93650 55344
                  </p>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[#D4AF37]/50">
                    Support Line
                  </span>
                  <p className="text-sm font-serif text-[#D4AF37]">
                    +91 81470 21513
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1F1311] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
           
            <p className="text-[10px] tracking-[0.35em] opacity-40">
              giftsngifts.in
            </p>
            <p className="text-[9px] opacity-30">
              © 2026 All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-6 text-[8px] uppercase opacity-40">
              <span>Authenticity Guaranteed</span>
              <span>Secure Checkout</span>
            </div>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
              alt="Payment Methods"
              className="h-4 opacity-40"
            />
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
