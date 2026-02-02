import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CollectionGrid from "./CollectionGrid.jsx";
import { HiOutlineChevronRight } from "react-icons/hi";

function CollectionPage() {
  const location = useLocation();
  // Using state to allow local overrides if needed
  const [currentCategory, setCurrentCategory] = useState(location.state?.category || null);

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Editorial Breadcrumb & Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 pt-10 md:pt-16">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-6">
          <Link to="/" className="hover:text-[#b39055] transition-colors">Home</Link>
          <HiOutlineChevronRight size={10} />
          <span className="text-[#0F3D2E]">Collections</span>
          {currentCategory && (
            <>
              <HiOutlineChevronRight size={10} />
              <span className="text-[#b39055]">{currentCategory}</span>
            </>
          )}
        </nav>

        {/* Dynamic Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-8 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-7xl font-serif text-[#0F3D2E] leading-tight capitalize">
              {currentCategory || "View All Products"}
            </h1>
            <p className="text-stone-500 mt-4 font-light italic text-lg leading-relaxed">
              "Curating the finest handcrafted legacies from the heart of North East India."
            </p>
          </div>
          
          {/* Status/Sort Placeholder - Adds visual weight to the right */}
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#0F3D2E]">
            <span className="w-8 h-[1px] bg-[#C5A059]"></span>
            Authentic & Certified
          </div>
        </div>
      </div>

      <CollectionGrid selectedCategory={currentCategory} />
    </div>
  );
}

export default CollectionPage;