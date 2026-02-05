import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { HiArrowRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import api from "../../../utils/api";

import "swiper/css";
import "swiper/css/navigation";

const COLLECTIONS = [
    {
        id: 'best-of-northeast',
        key: 'bestOfNorthEast',
        title: 'Best of North East',
        subtitle: 'Authentic mastercraft from the Eight Sisters',
        emoji: '✨',
        viewAllLink: '/featured-collection/bestOfNorthEast'
    },
    {
        id: 'under-999',
        key: 'under999',
        title: 'Gifts Under ₹999',
        subtitle: 'Thoughtful elegance for every budget',
        emoji: '🎁',
        viewAllLink: '/featured-collection/under999'
    }
];

function FeaturedCollections() {
    const [products, setProducts] = useState({ bestOfNorthEast: [], under999: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/api/product/home-collections');
            if (response.data.success) {
                setProducts({
                    bestOfNorthEast: response.data.data.bestOfNorthEast || [],
                    under999: response.data.data.under999 || []
                });
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!loading && products.bestOfNorthEast.length === 0 && products.under999.length === 0) return null;

    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#FDFBF7]">
            <div className="max-w-[1440px] mx-auto">
                {COLLECTIONS.map((collection, index) => {
                    const collectionProducts = products[collection.key] || [];
                    if (!loading && collectionProducts.length === 0) return null;

                    return (
                        <div key={collection.id} className={index > 0 ? 'mt-16 md:mt-28' : ''}>
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="h-[1px] w-6 md:w-8 bg-[#C5A059]" />
                                        <span className="text-[#C5A059] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Special Curation</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-serif text-[#0F3D2E] ">
                                        {collection.title} <span className="text-xl md:text-2xl ">{collection.emoji}</span>
                                    </h2>
                                    <p className="text-stone-400 font-light italic text-sm md:text-lg">{collection.subtitle}</p>
                                </div>
                                <Link 
                                    to={collection.viewAllLink}
                                    className="group flex items-center self-start md:self-auto gap-2 text-[#0F3D2E] font-black uppercase text-[10px] md:text-[11px] tracking-widest border-b-2 border-[#C5A059]/20 pb-1 hover:border-[#C5A059] transition-all duration-500"
                                >
                                    View All <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Slider Area */}
                            <div className="relative group/slider">
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={12}
                                    slidesPerView={1.2} // Mobile peeking: shows 1 full card and 20% of the next
                                    navigation={{
                                        nextEl: `.next-${collection.id}`,
                                        prevEl: `.prev-${collection.id}`,
                                    }}
                                    breakpoints={{
                                        480: { slidesPerView: 2.2, spaceBetween: 16 },
                                        768: { slidesPerView: 3, spaceBetween: 24 },
                                        1280: { slidesPerView: 4, spaceBetween: 30 },
                                    }}
                                    className="!overflow-visible md:!overflow-hidden" // Allow peek to overlap on mobile
                                >
                                    {loading ? [...Array(4)].map((_, i) => (
                                        <SwiperSlide key={i}><div className="aspect-[4/5] bg-stone-100 rounded-2xl animate-pulse" /></SwiperSlide>
                                    )) : collectionProducts.map((p) => (
                                        <SwiperSlide key={p._id}>
                                            <ProductCard product={p} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Custom Arrows - Hidden on touch devices, visible on hover desktop */}
                                <button className={`prev-${collection.id} absolute left-[-10px] lg:left-[-20px] top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#0F3D2E] opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-[#0F3D2E] hover:text-white hidden md:flex border border-stone-100`}>
                                    <HiOutlineChevronLeft size={22} />
                                </button>
                                <button className={`next-${collection.id} absolute right-[-10px] lg:right-[-20px] top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#0F3D2E] opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-[#0F3D2E] hover:text-white hidden md:flex border border-stone-100`}>
                                    <HiOutlineChevronRight size={22} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function ProductCard({ product }) {
    return (
        <Link to={`/products/${product._id}`} className="group block h-full">
            {/* Card Visuals */}
            <div className="relative aspect-[4/5] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-white border border-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#C5A059]/10">
                <img
                    src={product.images?.[0]?.url || '/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                {product.discount > 0 && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 py-1 md:px-3 md:py-1.5 bg-[#0F3D2E] text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {product.discount}% OFF
                    </div>
                )}
            </div>

            {/* Card Info */}
            <div className="mt-4 md:mt-6 text-left px-1">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-[#C5A059] mb-1">Heritage Item</p>
                <h3 className="text-sm md:text-lg font-serif text-[#0F3D2E] line-clamp-1 group-hover:text-[#C5A059] transition-colors duration-300">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                    <span className="text-base md:text-xl font-bold text-[#0F3D2E]">₹{product.price?.toLocaleString()}</span>
                    {product.oldprice > product.price && (
                        <span className="text-xs md:text-sm text-stone-300 line-through font-light italic">₹{product.oldprice?.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default FeaturedCollections;