import React, { useContext, useState, useRef, useEffect, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, IconButton, Tooltip, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../../context/Appcontext";

// Icons
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { FiHeart, FiUser, FiLogOut, FiPackage, FiChevronRight, FiX } from "react-icons/fi";
import Search from "./Search";
import NavCategory from "./NavCategry.jsx";
import logo from "../../../../assets/roshni/main logo.png";

/* ---------------- Badge: Updated to Coffee Color ---------------- */
const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    backgroundColor: "#6F4E37", // Rich Coffee Brown
    color: "#fff",
    fontSize: "10px",
    fontWeight: "900",
    border: "2px solid #fff",
  },
});

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, logout, cartItems, wishlistItems } = useContext(AppContext);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1000]">
        <div className="h-[2px] bg-gradient-to-r from-[#0F3D2E] via-[#C5A059] to-[#0F3D2E]" />

        <div className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white border-b border-gray-50"}`}>
          <nav className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">

              {/* Mobile Toggle */}
              <div className="lg:hidden flex-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex flex-col justify-center items-center group"
                >
                  <span className={`w-6 h-0.5 bg-[#0F3D2E] transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`} />
                  <span className={`w-6 h-0.5 bg-[#0F3D2E] my-0.5 transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
                  <span className={`w-6 h-0.5 bg-[#0F3D2E] transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`} />
                </button>
              </div>

              {/* Logo - Centered on Mobile, Left on Desktop */}
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="GiftsnGifts" className="h-10 md:h-14 lg:h-18 w-auto object-contain transition-transform hover:scale-105" />
              </Link>

              {/* Desktop Search - Hidden on Tablet/Mobile */}
              <div className="hidden lg:block flex-[2] max-w-2xl px-10">
                <Search />
              </div>

              {/* Action Icons */}
              <div className="flex-1 flex items-center justify-end gap-1 md:gap-3">
                {/* Mobile Search Icon
                <IconButton onClick={() => navigate('/search-results')} className="lg:hidden !text-[#0F3D2E]">
                  <MdSearch size={24} />
                </IconButton> */}

                {/* Wishlist & Cart swapped positions as requested */}
                <NavIcon title="Wishlist" icon={<FiHeart />} to="/wishlist" badgeCount={wishlistItems.length}  />
                <NavIcon title="Cart" icon={<MdOutlineShoppingCart />} to="/cartlist" badgeCount={cartItems.length} />

                {/* Desktop Profile Section */}
                <div ref={userMenuRef} className="relative hidden sm:block pl-4 border-l border-stone-100">
                  {userData ? (
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="w-10 h-10 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center font-bold border-2 border-white shadow-md hover:ring-2 hover:ring-[#C5A059] transition-all"
                    >
                      {userData.name[0].toUpperCase()}
                    </button>
                  ) : (
                    <Button
                      onClick={() => navigate("/login")}
                      className="!bg-[#3A5A40] !text-white !rounded-full !px-6 !text-[11px] !font-black !tracking-widest hover:!bg-[#C5A059]"
                    >
                      SIGN IN
                    </Button>
                  )}

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-4 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 origin-top-right">
                      <div className="p-5 bg-stone-900 text-white relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#C5A059]/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <p className="text-[9px] text-[#C5A059] font-black uppercase tracking-[0.2em] mb-1 opacity-90">{userData?.email}</p>
                        <p className="font-serif text-lg leading-tight truncate">{userData?.name}</p>
                      </div>
                      <div className="p-2">
                        <DropdownItem icon={<FiUser />} label="My Profile" to="/myProfile" />
                        <DropdownItem icon={<FiPackage />} label="My Orders" to="/orders" />
                          <DropdownItem icon={<FiPackage />} label="Bulk-cart" to="/bulk-cart" />
                        <div className="my-2 border-t border-stone-50" />
                        <button onClick={logout} className="group w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <FiLogOut className="text-lg group-hover:scale-110 transition-transform" /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Sub-navigation categories: Hidden on scroll */}
          <div className={` transition-all duration-500 `}>
            <NavCategory />
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER --- */}
      <div className={`fixed inset-0 z-[1100] ${mobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 flex flex-col transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-8">
            <img src={logo} className="h-8 w-auto" />
            <IconButton onClick={() => setMobileMenuOpen(false)} className="!bg-stone-50"><FiX /></IconButton>
          </div>
          
          <Search />

          <div className="mt-8 space-y-2 flex-grow overflow-y-auto pr-2 no-scrollbar">
            <MobileNavItem label="Home" to="/" />
            <MobileNavItem label="Shop by Occasion" to="/shop-by-occasion" />
            {/* <MobileNavItem label="Gift Finder Quiz" to="" /> */}
            <MobileNavItem label="Shop by State" to="/stop-by-state" />
            <MobileNavItem label="Collection" to="/collection" />
            <MobileNavItem label="Our Artisans" to="/artician" />
            <MobileNavItem label="Corporate Gifting" to="/bulk-quote" />
             <MobileNavItem label="Contact Us" to="/contactus" />
          </div>

          <div className="mt-auto pt-6 border-t border-stone-100">
            {userData ? (
              <div className="space-y-3">
                <MobileNavItem label="Account Dashboard" to="/myProfile" />
                <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-red-50 text-red-600 font-bold text-sm">
                  <FiLogOut /> Sign Out
                </button>
              </div>
            ) : (
              <Button fullWidth onClick={() => navigate("/login")} className="!bg-[#1A3A32] !text-white !rounded-xl !py-4 !font-black !tracking-widest shadow-xl shadow-green-900/20">
                SIGN IN
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------------- Helper Components ---------------- */

const NavIcon = ({ icon, title, to, badgeCount, hideMobile }) => (
  <div className={hideMobile ? "hidden lg:block" : ""}>
    <Tooltip title={title}>
      <Link to={to}>
        <IconButton className="!text-stone-800 hover:!bg-stone-50">
          <StyledBadge badgeContent={badgeCount}>
            {React.cloneElement(icon, { size: 22 })}
          </StyledBadge>
        </IconButton>
      </Link>
    </Tooltip>
  </div>
);

const DropdownItem = ({ icon, label, to }) => (
  <Link to={to} className="group flex justify-between items-center px-4 py-3 text-[11px] font-black uppercase tracking-widest text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-xl transition-all">
    <span className="flex gap-3 items-center">
      {React.cloneElement(icon, { className: "text-stone-400 group-hover:text-[#C5A059] transition-colors" })}
      {label}
    </span>
    <FiChevronRight className="text-stone-300" />
  </Link>
);

const MobileNavItem = ({ label, to }) => (
  <Link to={to} className="flex justify-between items-center p-4 bg-stone-50 rounded-xl font-bold text-sm text-stone-700 active:bg-stone-100">
    {label}
    <FiChevronRight className="text-[#C5A059]" />
  </Link>
);

export default memo(Navigation);