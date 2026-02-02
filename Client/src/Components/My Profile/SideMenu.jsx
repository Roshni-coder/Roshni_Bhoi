import React, { useContext, useState } from "react";
import { Avatar, Button, Divider } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { FiHeart, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/Appcontext.jsx";

function SideMenu() {
  const { profile, logout } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "U";

  return (
    <div className="bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden lg:sticky lg:top-28 transition-all duration-300">
      
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden w-full px-6 py-4 flex items-center justify-between text-[#1A3A32] font-black uppercase text-[11px] tracking-widest bg-[#FDFBF7]"
      >
        <span>Account Navigation</span>
        {mobileOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      <div className={`${mobileOpen ? "max-h-[500px]" : "max-h-0"} lg:max-h-none overflow-hidden lg:block transition-all duration-500`}>
        {/* Header - Hidden on small mobile to save space if needed */}
        <div className="px-6 py-10 text-center bg-[#FDFBF7] border-b border-stone-50">
          <Avatar 
            sx={{ 
              bgcolor: "#1A3A32", 
              width: 64, 
              height: 64, 
              mx: "auto", 
              mb: 2,
              border: '3px solid #fff',
              boxShadow: '0 10px 20px rgba(26,58,50,0.1)'
            }}
          >
            {getInitials(profile?.name)}
          </Avatar>
          <h2 className="font-serif font-bold text-xl text-[#1A3A32] truncate">
            {profile?.name || "Guest Patron"}
          </h2>
          <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest mt-1 opacity-80">
            {profile?.email}
          </p>
        </div>

        <nav className="p-3 space-y-1 bg-white">
          <MenuTab to="/myProfile" icon={<FaRegUser />} label="My Profile" />
          <MenuTab to="/orders" icon={<IoBagCheckOutline />} label="My Orders" />
          <MenuTab to="/wishlist" icon={<FiHeart />} label="Wishlist" />

          <div className="px-4 py-3">
            <Divider sx={{ borderColor: '#FDFBF7' }} />
          </div>

          <button
            onClick={logout}
            className="group flex w-full items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <RiLogoutCircleLine size={18} className="group-hover:rotate-12 transition-transform" />
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  );
}

const MenuTab = ({ to, icon, label }) => (
  <NavLink to={to} className="block group">
    {({ isActive }) => (
      <div
        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
          isActive 
          ? "bg-[#1A3A32] text-white shadow-xl shadow-green-900/10" 
          : "text-stone-500 hover:bg-stone-50 hover:text-[#1A3A32]"
        }`}
      >
        <span className={`text-lg ${isActive ? "text-[#C5A059]" : "text-stone-300 group-hover:text-[#C5A059]"}`}>
          {icon}
        </span>
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      </div>
    )}
  </NavLink>
);

export default SideMenu;