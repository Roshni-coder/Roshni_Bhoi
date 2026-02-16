import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiArrowRight, HiArrowLeft, HiRefresh, 
    HiCheck, HiGift, HiArrowNarrowRight
} from "react-icons/hi";
import api from "../../utils/api";

const questions = [
    {
        id: 'recipient',
        title: 'Who are you gifting to?',
        subtitle: 'We will curate styles and price ranges that fit your relationship.',
        options: [
            { id: 'high-value-clients', label: 'High-value Clients', desc: 'VIP Treatment', icon: '👑', color: 'bg-orange-50' },
            { id: 'regular-clients', label: 'Regular Clients', desc: 'Professional Touch', icon: '🏢', color: 'bg-emerald-50' },
            { id: 'employees', label: 'Employees', desc: 'Team Appreciation', icon: '👔', color: 'bg-blue-50' },
            { id: 'partners', label: 'Business Partners', desc: 'Mutual Respect', icon: '🤝', color: 'bg-purple-50' },
            { id: 'mixed', label: 'Mixed Group', desc: 'Various Recipients', icon: '👥', color: 'bg-slate-50' }
        ]
    },
    {
        id: 'budget',
        title: "Define your budget per gift",
        subtitle: 'Handcrafted treasures for every price point.',
        options: [
            { id: 'under-500', label: 'Under ₹500', desc: 'Budget-friendly', icon: '💰', color: 'bg-emerald-50' },
            { id: '500-1000', label: '₹500 - ₹1,000', desc: 'Great value', icon: '💵', color: 'bg-teal-50' },
            { id: '1000-2500', label: '₹1,000 - ₹2,500', desc: 'Mid-range luxury', icon: '💎', color: 'bg-amber-50' },
            { id: '2500-5000', label: '₹2,500 - ₹5,000', desc: 'Premium luxury', icon: '✨', color: 'bg-orange-50' },
            { id: '5000-plus', label: '₹5,000+', desc: 'Exclusive heritage', icon: '🏺', color: 'bg-rose-50' }
        ]
    },
    {
        id: 'quantity',
        title: 'Total units required?',
        subtitle: 'Bulk orders qualify for artisan-direct discounts.',
        options: [
            { id: '1-25', label: '1-25 units', desc: 'Boutique order', icon: '📦', color: 'bg-slate-50' },
            { id: '25-50', label: '25-50 units', desc: '5% artisan discount', icon: '🎁', color: 'bg-green-50' },
            { id: '50-100', label: '50-100 units', desc: '10% artisan discount', icon: '🏷️', color: 'bg-amber-50' },
            { id: '100-plus', label: '100+ units', desc: 'Exclusive bulk rates', icon: '🚛', color: 'bg-emerald-50' }
        ]
    },
    {
        id: 'collection',
        title: 'Select a craft category',
        subtitle: 'Handpicked artisan traditions from the North East.',
        options: [
            { id: 'jewellery', label: 'Jewellery', desc: 'Traditional & Modern', icon: '💍', color: 'bg-rose-50' },
            { id: 'teaware', label: 'Teaware', desc: 'Organic & Ceramic', icon: '🍵', color: 'bg-orange-50' },
            { id: 'bamboo-cane', label: 'Bamboo & Cane', desc: 'Eco-conscious decor', icon: '🎋', color: 'bg-green-50' },
            { id: 'handicrafts', label: 'Handicrafts', desc: 'Heritage utilities', icon: '🧺', color: 'bg-amber-50' }
        ]
    }
];

function GiftFinderQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);

    const progress = ((currentStep + 1) / questions.length) * 100;
    const currentQuestion = questions[currentStep];

    const handleSelect = async (optionId) => {
        const newAnswers = { ...answers, [currentQuestion.id]: optionId };
        setAnswers(newAnswers);
        if (currentStep === questions.length - 1) {
            await getRecommendations(newAnswers);
        } else {
            setTimeout(() => setCurrentStep(currentStep + 1), 400);
        }
    };

    const getRecommendations = async (quizAnswers) => {
        setIsLoading(true);
        try {
            const res = await api.post('/api/gift-finder', { ...quizAnswers });
            if (res.data.success) setRecommendations(res.data.data);
            else setRecommendations(getSampleRecommendations());
        } catch (error) {
            setRecommendations(getSampleRecommendations());
        } finally {
            setTimeout(() => setIsLoading(false), 1500); // Smoother transition
        }
    };

   return (
    <div className="min-h-screen bg-[#F9F7F2] font-serif text-[#2D4636] selection:bg-[#D4A373]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

            {/* Branding */}
            <header className="text-center mb-6 sm:mb-8 lg:mb-10">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                        inline-flex items-center gap-2 sm:gap-3
                        px-4 sm:px-6 py-2
                        rounded-full
                        border border-[#2D4636]/10
                        bg-white/50
                        backdrop-blur-sm
                        shadow-sm
                        mb-2 sm:mb-2
                    "
                >
                    <HiGift className="text-[#D4A373] text-sm sm:text-base" />

                    <span className="
                        text-[9px]
                        sm:text-[10px]
                        uppercase
                        tracking-[0.2em]
                        font-bold
                    ">
                        The Heritage Concierge
                    </span>
                </motion.div>


                {!recommendations && (

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-3 sm:space-y-4"
                        >

                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                lg:text-5xl
                                xl:text-6xl
                                font-medium
                                tracking-tight
                                leading-tight
                            ">
                                {currentQuestion?.title}
                            </h1>


                            <p className="
                                text-sm
                                sm:text-base
                                md:text-lg
                                lg:text-xl
                                italic
                                max-w-2xl
                                mx-auto
                                text-slate-500
                                px-2
                            ">
                                "{currentQuestion?.subtitle}"
                            </p>

                        </motion.div>

                    </AnimatePresence>

                )}

            </header>


            {/* Main Interaction Area */}
            <div className="relative max-w-5xl mx-auto">

                <AnimatePresence mode="wait">

                    {isLoading ? (
                        <LoadingState />
                    ) : recommendations ? (
                        <RecommendationsView
                            recommendations={recommendations}
                            onRestart={() => {
                                setRecommendations(null);
                                setCurrentStep(0);
                                setAnswers({});
                            }}
                        />
                    ) : (

                        <div className="space-y-8 sm:space-y-10 lg:space-y-12">


                            {/* Progress Indicator */}
                            <div className="flex items-center gap-3 sm:gap-4 max-w-xs mx-auto">

                                <div className="flex-1 h-[2px] bg-[#2D4636]/10 overflow-hidden">

                                    <motion.div
                                        className="h-full bg-[#2D4636]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />

                                </div>


                                <span className="
                                    text-[9px]
                                    sm:text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    opacity-60
                                ">
                                    0{currentStep + 1} / 0{questions.length}
                                </span>

                            </div>


                            {/* Options Grid */}
                            <motion.div
                                className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    gap-4
                                    sm:gap-6
                                "
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >

                                {currentQuestion?.options.map((option) => (

                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option.id)}

                                        className={`
                                            group relative flex flex-col

                                            p-5 sm:p-6 lg:p-8

                                            text-left

                                            transition-all duration-500

                                            rounded-2xl sm:rounded-3xl

                                            border

                                            min-h-[140px]

                                            ${answers[currentQuestion.id] === option.id
                                                ? 'border-[#2D4636] bg-[#2D4636] text-white shadow-2xl'
                                                : 'border-white bg-white/70 backdrop-blur-md hover:border-[#2D4636]/20 hover:shadow-xl'}
                                        `}
                                    >

                                        <div className={`
                                            w-12 h-12 sm:w-14 sm:h-14

                                            flex items-center justify-center

                                            rounded-xl sm:rounded-2xl

                                            text-xl sm:text-2xl

                                            mb-4 sm:mb-6

                                            transition-transform

                                            group-hover:scale-110

                                            shadow-inner

                                            ${option.color}
                                        `}>
                                            {option.icon}
                                        </div>


                                        <div>

                                            <h3 className="
                                                text-base sm:text-lg lg:text-xl
                                                font-medium
                                                mb-1 sm:mb-2
                                            ">
                                                {option.label}
                                            </h3>


                                            <p className={`
                                                text-xs sm:text-sm

                                                ${answers[currentQuestion.id] === option.id
                                                    ? 'text-white/70'
                                                    : 'text-slate-400'}
                                            `}>
                                                {option.desc}
                                            </p>

                                        </div>


                                        {answers[currentQuestion.id] === option.id && (
                                            <motion.div
                                                layoutId="check"
                                                className="absolute top-4 sm:top-6 right-4 sm:right-6"
                                            >
                                                <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A373]" />
                                            </motion.div>
                                        )}

                                    </button>

                                ))}

                            </motion.div>

                        </div>

                    )}

                </AnimatePresence>

            </div>


            {/* Footer */}
            {!recommendations && !isLoading && (

                <footer className="
                    mt-12 sm:mt-16 lg:mt-20

                    max-w-4xl mx-auto

                    flex justify-between items-center

                    border-t border-[#2D4636]/5

                    pt-6 sm:pt-8 lg:pt-10
                ">

                    <button
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep(v => v - 1)}

                        className={`
                            flex items-center gap-2 sm:gap-3

                            font-bold

                            text-[10px] sm:text-xs

                            uppercase tracking-[0.2em]

                            transition-all

                            ${currentStep === 0
                                ? 'opacity-0'
                                : 'hover:gap-5'}
                        `}
                    >
                        <HiArrowLeft /> Previous
                    </button>


                    <button
                        onClick={() => {
                            setCurrentStep(0);
                            setAnswers({});
                        }}

                        className="
                            text-[10px]

                            text-slate-400

                            hover:text-red-400

                            flex items-center gap-2

                            uppercase tracking-[0.2em]

                            font-bold

                            transition-colors
                        "
                    >
                        <HiRefresh /> Reset
                    </button>

                </footer>

            )}

        </div>
    </div>
);

}

const LoadingState = () => (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center py-24"
    >
        <div className="relative w-32 h-32 mx-auto mb-10">
            <div className="absolute inset-0 border-[1px] border-[#2D4636]/10 rounded-full" />
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-[1px] border-[#2D4636] rounded-full" 
            />
            <HiGift className="absolute inset-0 m-auto w-8 h-8 text-[#D4A373] animate-pulse" />
        </div>
        <h2 className="text-3xl font-medium mb-3">Curating the finest...</h2>
        <p className="text-slate-400 italic">Finding pieces that tell a story</p>
    </motion.div>
);

function RecommendationsView({ recommendations, onRestart }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-medium mb-4">The Selection</h2>
                <p className="text-slate-500 italic text-lg">Specially curated heritage pieces based on your profile.</p>
            </div>

            <div className="grid gap-10">
                {recommendations.recommendations?.map((product, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        key={idx} 
                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row group"
                    >
                        <div className="md:w-80 h-72 md:h-90 overflow-hidden relative">
                            <img 
                                src={product.images[0].url} 
                                alt={product.title} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                            />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#2D4636] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                {product.matchScore}% Match
                            </div>
                        </div>
                        <div className="flex-1 p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between flex-col items-start gap-2">
                                    <div className="space-y-2">
                                        {/* <span className="text-[#D4A373] text-[10px] font-bold uppercase tracking-[0.3em] block">Origin: {product.state}</span> */}
                                        <h3 className="text-3xl font-medium leading-tight">{product.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="!text-3xl py-2 font-bold text-[#2D4636]">₹{product.price.toLocaleString('en-IN')}</p>
                                        {/* <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Incl. Artisan Tax</p> */}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {product.perfectFor.map((tag, i) => (
                                        <span key={i} className="bg-[#F9F7F2] text-[#2D4636] text-[9px] font-bold px-4 py-1.5 rounded-full border border-[#2D4636]/5 uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link 
                                to={`/products/${product._id}`} 
                                className="w-full bg-[#2D4636] text-white text-center py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#1a2b21] transition-all flex items-center justify-center gap-3 group"
                            >
                                View Details <HiArrowNarrowRight className="text-xl transition-transform group-hover:translate-x-2" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pt-16 text-center">
    <button 
        onClick={() => {
            onRestart();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }}
        className="px-12 py-5 border border-[#2D4636]/10 rounded-2xl text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] hover:text-[#2D4636] hover:border-[#2D4636] transition-all"
    >
        Start New Discovery
    </button>
</div>

        </motion.div>
    );
}

function getSampleRecommendations() {
    return {
        recommendations: [
            {
                _id: '1',
                title: 'Heritage Muga Silk Hamper',
                price: 4500,
                matchScore: 98,
                state: 'Assam',
                images: [{ url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800' }],
                perfectFor: ['VIP Clients', 'Cultural Gifting']
            },
            {
                _id: '2',
                title: 'Hand-woven Bamboo Desk Suite',
                price: 1200,
                matchScore: 85,
                state: 'Tripura',
                images: [{ url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800' }],
                perfectFor: ['Employees', 'Eco-friendly']
            }
        ]
    };
}

export default GiftFinderQuiz;