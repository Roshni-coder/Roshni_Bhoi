import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiArrowLeft, HiSparkles, HiChevronDown } from "react-icons/hi";
import api from "../../../utils/api";
import { motion, AnimatePresence } from "framer-motion";

function CollectionDetailsPage() {
    const { type } = useParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- CHANGE COLORS HERE ---
    const config = {
        bestOfNorthEast: {
            title: "Best of North East",
            desc: "The complete collection of mastercraft from across the region.",
            color: "bg-[#3D2B1F]", // Deep Coffee Bean
            accent: "text-[#C5A059]" // Heritage Gold
        },
        under999: {
            title: "Treasures Under ₹999",
            desc: "Handpicked boutique gifts that combine soul with affordability.",
            color: "bg-[#6F4E37]", // Coffee Brown (Matches your badges)
            accent: "text-[#FDFBF7]" // Antique Cream
        }
    };

    const info = config[type] || config.bestOfNorthEast;

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const res = await api.get('/api/product/home-collections');
                if (res.data.success) {
                    setProducts(res.data.data[type] || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
        window.scrollTo(0, 0); 
    }, [type]);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Editorial Header Section - Background updated via info.color */}
            <header className={`${info.color} pt-16 pb-24 md:pt-24 md:pb-20 px-4 text-white relative overflow-hidden transition-colors duration-500`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-20 -mt-20" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all mb-8">
                        <HiArrowLeft /> Return to Home
                    </Link>
                    
                    <div className="max-w-3xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            {/* Accent color updated via info.accent */}
                            <HiSparkles className={info.accent} />
                            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] ${info.accent}`}>
                                Boutique Curation
                            </span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6"
                        >
                            {info.title}
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/70 text-lg md:text-xl font-light italic leading-relaxed"
                        >
                            "{info.desc}"
                        </motion.p>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="max-w-8xl mx-auto px-4  my-4 pb-24">
                <div className="bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-2xl shadow-stone-200/50 p-6 md:p-12 border border-stone-100">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 border-b border-stone-100 pb-8">
                        <p className="text-[11px] font-black uppercase tracking-widest text-stone-400">
                            Showing <span className="text-[#3D2B1F] font-bold">{products.length}</span> Handcrafted Items
                        </p>
                        
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-tighter text-[#3D2B1F] bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
                            Sort: Featured <HiChevronDown />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="aspect-[4/5] bg-stone-100 rounded-2xl mb-4" />
                                        <div className="h-4 bg-stone-100 rounded w-2/3 mb-2" />
                                        <div className="h-4 bg-stone-100 rounded w-1/3" />
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center">
                                <div className="w-20 h-px bg-stone-200 mx-auto mb-6" />
                                <p className="font-serif italic text-2xl text-stone-300">This collection is currently being woven...</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16"
                            >
                                {products.map((p, idx) => (
                                    <ProductCard key={p._id} product={p} index={idx} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

function ProductCard({ product, index }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Link to={`/products/${product._id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-stone-50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#C5A059]/10">
                    <img src={product.images?.[0]?.url} alt={product.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {product.discount > 0 && (
                        <div className="absolute top-0 left-0 bg-[#3D2B1F] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-br-xl">
                            {product.discount}% OFF
                        </div>
                    )}
                </div>

                <div className="mt-5 space-y-2 px-1 text-center sm:text-left">
                    <p className="text-[9px] font-black uppercase text-[#C5A059] tracking-[0.25em]">Heritage Piece</p>
                    <h3 className="font-serif text-lg text-[#3D2B1F] line-clamp-1 leading-snug group-hover:text-[#C5A059] transition-colors">{product.title}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        <span className="text-xl font-bold text-[#3D2B1F]">₹{product.price?.toLocaleString()}</span>
                        {product.oldPrice > product.price && (
                            <span className="text-sm text-stone-300 line-through font-light italic">₹{product.oldPrice?.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default CollectionDetailsPage;