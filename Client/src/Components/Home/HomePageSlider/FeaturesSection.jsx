import React from 'react';

// Replace these with your actual local paths
import imageone from '../../../assets/banner/handmade.png';
import imagetwo from '../../../assets/banner/weavers.png';
import imagethree from '../../../assets/banner/calture.png';
import imagefour from '../../../assets/banner/new.png';

const FeaturesSection = () => {
  const features = [
    {
      title: "Authentic & Handmade",
      subtitle: "The Artisan's Touch",
      description: "Master artisans using ancestral techniques to preserve the soul of the craft.",
      img: imageone
    },
    {
      title: "Direct From Weavers",
      subtitle: "Fair Trade Legacy",
      description: "Empowering communities through fair trade for a sustainable future.",
      img: imagetwo
    },
    {
      title: "Cultural Heritage",
      subtitle: "The Eight Sisters",
      description: "A celebration of tribal identity, weaving stories into every unique gift.",
      img: imagethree
    },
    {
      title: "Thoughtful Gifting",
      subtitle: "Grace Delivered",
      description: "More than an object—a meaningful connection in a box of North Eastern grace.",
      img: imagefour
    }
  ];

  return (
    <section className="pt-6 bg-[#fdfcfb] px-6 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Compact Editorial Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#d4af37]/50" />
            <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.5em] font-bold">
              The Promise
            </span>
            <div className="w-8 h-[1px] bg-[#d4af37]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2a241e] mb-4">
            Why North East Gifts?
          </h2>
          <p className="text-[#6b5a4c] text-base max-w-lg mx-auto font-serif italic opacity-75">
            "Authenticity in every thread, legacy in every gift."
          </p>
        </div>

        {/* Refined Small Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group flex flex-col items-center text-center">
              
              {/* Circular Artisan Image */}
              <div className="relative mb-8">
                {/* Background Decorative Ring */}
                <div className="absolute inset-0 -m-2 border border-[#d4af37]/10 rounded-full transition-transform duration-700 group-hover:scale-110" />
                
                {/* Image Container */}
                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-white shadow-sm">
                  <img 
                    src={feature.img} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-115"
                  />
                  {/* Soft Color Filter */}
                  <div className="absolute inset-0 bg-[#b39055]/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Floating Badge (Centered Bottom) */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                   <div className="bg-white px-3 py-1 shadow-md border border-[#f4f1ee]">
                      <span className="text-[9px] uppercase tracking-tighter text-[#d4af37] font-bold">
                        {feature.subtitle}
                      </span>
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="max-w-[240px]">
                <h3 className="text-lg font-serif text-[#2a241e] mb-3 group-hover:text-[#b39055] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#6b5a4c] text-xs leading-relaxed font-light opacity-90 mb-4">
                  {feature.description}
                </p>
                
                {/* Minimalist Centered Divider */}
                <div className="flex justify-center">
                  <div className="w-6 h-[1.5px] bg-[#d4af37]/30 group-hover:w-12 transition-all duration-500" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Detail */}
        <div className="mt-16 flex justify-center opacity-20">
            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;