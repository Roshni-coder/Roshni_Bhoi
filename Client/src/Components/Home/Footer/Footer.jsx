import React from "react";
import { 
  LiaShippingFastSolid, 
  LiaGiftSolid, 
  LiaUndoAltSolid, 
  LiaShieldAltSolid, 
  LiaHeadsetSolid 
} from "react-icons/lia";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

function Footer() {

  const footerLinks = {
    shop: ["Naga Handlooms", "Bamboo Crafts", "Assam Silk", "Traditional Jewelry", "Corporate Gifts"],
    company: ["Our Story", "Artisan Impact", "Press", "Terms & Conditions", "Privacy Policy"],
    support: ["Track Order", "Returns & Exchanges", "Shipping Info", "FAQs", "Contact Us"]
  };

  return (
    <footer className="bg-[#fdfcfb] border-t border-stone-200 pt-12">
      {/* 1. Trust Bar - Minimal & Clean
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 border-b border-stone-100 pb-12">
          {trustFeatures.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="text-3xl text-[#B58D2F] transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-stone-800">{item.title}</h4>
                <p className="text-[10px] text-stone-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* 2. Main Footer Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
                GiftsNGifts<span className="text-[#B58D2F]">.</span>
              </h2>
              <div className="h-[1px] w-0 bg-[#B58D2F] transition-all duration-500 group-hover:w-full"></div>
            </Link>
            <p className="text-stone-600 text-sm leading-relaxed max-w-sm italic opacity-80">
              "Bringing the soul of North East India to your doorstep. Every piece tells a story of tradition and conscious craftsmanship."
            </p>
            <div className="flex gap-3 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <Link
                  key={idx}
                  to="/"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 text-stone-500 hover:bg-[#B58D2F] hover:text-white hover:border-[#B58D2F] transition-all duration-300"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, i) => (
                <li key={i}>
                  <Link to="/" className="text-sm text-stone-600 hover:text-[#B58D2F] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link to="/" className="text-sm text-stone-600 hover:text-[#B58D2F] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">Join our Journey</h4>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Subscribe for exclusive artisan collections and cultural stories from the heart of the Northeast.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B58D2F] text-sm transition-all"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#322619',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  py: 1.8,
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  borderRadius: '12px',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#B58D2F', boxShadow: '0 8px 20px rgba(181, 141, 47, 0.2)' }
                }}
              >
                Subscribe
              </Button>
              <FormControlLabel
                control={<Checkbox size="small" sx={{ color: '#d6d3d1', '&.Mui-checked': { color: '#B58D2F' } }} />}
                label={<span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">I accept the terms</span>}
              />
            </form>
          </div>
        </div>
      </div>

      {/* 3. Credits Bar */}
      <div className="bg-stone-50 border-t border-stone-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center md:text-left">
            © 2026 GiftsnGifts • Handcrafted with love from North East India
          </p>
          <div className="flex items-center gap-6 opacity-40 grayscale hover:opacity-80 transition-all duration-700">
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest border-r border-stone-200 pr-6 hidden sm:block">Safe Payments</p>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
              alt="Payment Methods"
              className="h-3.5"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;