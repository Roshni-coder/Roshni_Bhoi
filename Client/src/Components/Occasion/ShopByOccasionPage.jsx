/**
 * Shop By Occasion - Refined Boutique Design
 * Maintains existing API integration and logic.
 */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {
    HiSparkles, HiGift, HiOfficeBuilding, HiHeart, HiSun,
    HiSearch, HiArrowRight, HiLightningBolt, HiStar
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const occasionIcons = {
    'diwali': '🪔', 'new-year': '🎄', 'christmas': '🎄', 'client-appreciation': '🏢',
    'employee-gifts': '👔', 'corporate-gifting': '🤝', 'company-milestone': '🎊',
    'onboarding-kits': '🎓', 'farewell-gifts': '👋', 'birthday': '🎂', 'wedding': '💍',
    'anniversary': '💝', 'housewarming': '🏠', 'baby-shower': '👶', 'bihu': '🌾',
    'durga-puja': '🪔', 'holi': '🌸', 'festive-season': '🎋', 'traditional-ceremony': '🎎'
};

const featuredOccasions = ['diwali', 'corporate-gifting', 'wedding', 'birthday'];

function ShopByOccasionPage() {
    const [occasions, setOccasions] = useState({ corporate: [], personal: [], seasonal: [] });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredOccasion, setHoveredOccasion] = useState(null);
    const [previewProducts, setPreviewProducts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchOccasions();
    }, []);

    const fetchOccasions = async () => {
        try {
            const res = await api.get('/api/occasions');
            if (res.data.success) {
                setOccasions(res.data.data);
            }
        } catch (error) {
            setOccasions(getFallbackOccasions());
        } finally {
            setLoading(false);
        }
    };

    const handleOccasionHover = async (slug) => {
        setHoveredOccasion(slug);
        if (slug && !previewProducts[slug]) {
            try {
                const res = await api.get(`/api/occasions/${slug}/products?limit=3`);
                if (res.data.success) {
                    setPreviewProducts(prev => ({
                        ...prev,
                        [slug]: res.data.data.products.slice(0, 3)
                    }));
                }
            } catch (error) {}
        }
    };

    const filteredOccasions = (category) => {
        if (!searchQuery) return occasions[category];
        return occasions[category]?.filter(occ =>
            occ.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const allFilteredOccasions = [
        ...(filteredOccasions('corporate') || []),
        ...(filteredOccasions('personal') || []),
        ...(filteredOccasions('seasonal') || [])
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero Section */}
            <section className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-28">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-8">
                        <Link to="/" className="hover:text-amber-600 transition">Home</Link>
                        <span>/</span>
                        <span className="text-stone-800">Shop by Occasion</span>
                    </nav>

                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 mb-6"
                        >
                            <HiSparkles className="w-3 h-3 text-amber-500" />
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-tighter">Handcrafted Heritage</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 leading-tight">
                            Shop by <span className="italic text-amber-600 font-normal">Occasion</span>
                        </h1>

                        <p className="text-stone-600 text-lg md:text-xl font-light mb-12">
                            Find the perfect Northeast treasure for your special moments. 
                            Gifts that carry a story in every thread and grain.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto z-50">
                            <div className="relative shadow-sm">
                                <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                                <input
                                    type="text"
                                    placeholder="Search e.g. Diwali, Wedding..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all text-stone-800 outline-none"
                                />
                            </div>
                            
                            <AnimatePresence>
                                {searchQuery && allFilteredOccasions.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden text-left"
                                    >
                                        {allFilteredOccasions.slice(0, 5).map((occ) => (
                                            <Link key={occ.slug} to={`/occasion/${occ.slug}`} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors">
                                                <span className="text-2xl">{occasionIcons[occ.slug] || '🎁'}</span>
                                                <span className="font-medium text-stone-700">{occ.name}</span>
                                                <HiArrowRight className="ml-auto w-4 h-4 text-stone-300" />
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Sections */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
                <OccasionCategory 
                    title="Corporate" 
                    subtitle="Premium B2B solutions for partners and teams"
                    icon={<HiOfficeBuilding />}
                    occasions={filteredOccasions('corporate') || []}
                    loading={loading}
                    onHover={handleOccasionHover}
                    hoveredOccasion={hoveredOccasion}
                    previewProducts={previewProducts}
                />

                <OccasionCategory 
                    title="Personal" 
                    subtitle="Heartfelt gifts for life's intimate milestones"
                    icon={<HiHeart />}
                    occasions={filteredOccasions('personal') || []}
                    loading={loading}
                    onHover={handleOccasionHover}
                    hoveredOccasion={hoveredOccasion}
                    previewProducts={previewProducts}
                />

                <OccasionCategory 
                    title="Seasonal" 
                    subtitle="Cultural celebrations from the Eight Sisters"
                    icon={<HiSun />}
                    occasions={filteredOccasions('seasonal') || []}
                    loading={loading}
                    onHover={handleOccasionHover}
                    hoveredOccasion={hoveredOccasion}
                    previewProducts={previewProducts}
                />

                {/* Gift Quiz CTA */}
                <div className="relative rounded-[2rem] bg-stone-900 p-8 md:p-16 overflow-hidden">
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Can't Decide?</h3>
                            <p className="text-stone-400 text-lg mb-8">Our gift finder quiz suggests items based on your budget and recipient.</p>
                            <Link to="/gift-finder" className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors">
                                <HiGift className="w-5 h-5" /> Start Gift Quiz
                            </Link>
                        </div>
                        <div className="hidden md:flex justify-end opacity-20">
                            <HiSparkles className="w-48 h-48 text-amber-500" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function OccasionCategory({ title, subtitle, icon, occasions, loading, onHover, hoveredOccasion, previewProducts }) {
    if (loading) return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-stone-200/50 rounded-2xl animate-pulse" />)}
        </div>
    );

    if (occasions.length === 0) return null;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-amber-600 shadow-sm">
                    {React.cloneElement(icon, { size: 24 })}
                </div>
                <div>
                    <h2 className="text-2xl font-serif text-stone-900">{title} Occasions</h2>
                    <p className="text-sm text-stone-500">{subtitle}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {occasions.map((occ, idx) => (
                    <OccasionCard 
                        key={occ.slug} 
                        occasion={occ} 
                        onHover={onHover} 
                        isHovered={hoveredOccasion === occ.slug}
                        previewProducts={previewProducts[occ.slug]}
                    />
                ))}
            </div>
        </div>
    );
}

function OccasionCard({ occasion, onHover, isHovered, previewProducts }) {
    const isFeatured = featuredOccasions.includes(occasion.slug);
    const icon = occasionIcons[occasion.slug] || '🎁';

    return (
        <Link
            to={`/occasion/${occasion.slug}`}
            onMouseEnter={() => onHover(occasion.slug)}
            onMouseLeave={() => onHover(null)}
            className="group relative block aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm"
        >
            {/* Background Image */}
            {occasion.image?.url ? (
                <img src={occasion.image.url} alt={occasion.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
                <div className="absolute inset-0 bg-stone-50" />
            )}

            {/* Simple Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

            {/* Badge */}
            {isFeatured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-amber-400 text-black text-[9px] font-black uppercase rounded-lg shadow-lg">
                    <HiStar className="w-3 h-3" /> Trending
                </div>
            )}

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-4xl mb-3 block transform transition-transform group-hover:scale-110 origin-left">
                    {icon}
                </span>
                <h3 className="text-white font-serif text-xl md:text-2xl leading-tight">{occasion.name}</h3>
                <div className="h-0 group-hover:h-6 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Explore Collection</span>
                    <HiArrowRight className="w-3 h-3 text-amber-400" />
                </div>
            </div>

            {/* Preview Products Logic (Hidden on small mobile for clarity) */}
            <AnimatePresence>
                {isHovered && previewProducts?.length > 0 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        className="absolute top-4 left-4 hidden md:flex flex-col gap-2"
                    >
                        {previewProducts.map((p, i) => (
                            <div key={i} className="w-10 h-10 rounded-lg border-2 border-white shadow-xl overflow-hidden bg-white">
                                <img src={p.images?.[0]?.url} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </Link>
    );
}

function getFallbackOccasions() {
    return {
        corporate: [
            { name: 'Diwali', slug: 'diwali' },
            { name: 'New Year', slug: 'new-year' },
            { name: 'Client Appreciation', slug: 'client-appreciation' },
            { name: 'Employee Gifts', slug: 'employee-gifts' },
            { name: 'Corporate Gifting', slug: 'corporate-gifting' },
            { name: 'Company Milestone', slug: 'company-milestone' },
            { name: 'Onboarding Kits', slug: 'onboarding-kits' },
            { name: 'Farewell Gifts', slug: 'farewell-gifts' }
        ],
        personal: [
            { name: 'Birthday', slug: 'birthday' },
            { name: 'Wedding', slug: 'wedding' },
            { name: 'Anniversary', slug: 'anniversary' },
            { name: 'Housewarming', slug: 'housewarming' },
            { name: 'Baby Shower', slug: 'baby-shower' }
        ],
        seasonal: [
            { name: 'Bihu', slug: 'bihu' },
            { name: 'Durga Puja', slug: 'durga-puja' },
            { name: 'Holi', slug: 'holi' },
            { name: 'Festive Season', slug: 'festive-season' },
            { name: 'Traditional Ceremony', slug: 'traditional-ceremony' }
        ]
    };
}

export default ShopByOccasionPage;