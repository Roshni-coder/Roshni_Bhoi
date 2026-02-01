import React from "react";
import { HiShieldCheck, HiRefresh, HiCube, HiChat } from "react-icons/hi";

const TrustBar = () => {
    const trustItems = [
        {
            icon: <HiShieldCheck className="w-5 h-5" />,
            text: "Secure Payments",
            subtext: "100% secure checkout"
        },
        {
            icon: <HiRefresh className="w-5 h-5" />,
            text: "Easy Returns",
            subtext: "7-day return policy"
        },
        {
            icon: <HiCube className="w-5 h-5" />,
            text: "Safe Packaging",
            subtext: "Premium gift wrapping"
        },
        {
            icon: <HiChat className="w-5 h-5" />,
            text: "WhatsApp Support",
            subtext: "10 AM - 7 PM IST",
            isClickable: true
        }
    ];

    const handleWhatsAppClick = () => {
        const phoneNumber = "919876543210"; 
        const message = encodeURIComponent("Hi! I need help with my order on GiftsNGifts.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <div className="relative overflow-hidden border-t border-[#d4af37]/10 bg-gradient-to-r from-[#2C1A0F] via-[#3A2518] to-[#2C1A0F] py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0">
                    {trustItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={item.isClickable ? handleWhatsAppClick : undefined}
                            className={`group flex items-center justify-center lg:justify-start gap-4 px-6 
                                ${index !== trustItems.length - 1 ? 'lg:border-r border-[#d4af37]/10' : ''} 
                                ${item.isClickable ? 'cursor-pointer' : ''} transition-all duration-300`}
                        >
                            {/* Icon Container */}
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#d4af37]/20">
                                    {item.icon}
                                </div>
                                {/* Subtle Glow Effect on Hover */}
                                <div className="absolute inset-0 rounded-xl bg-[#d4af37]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col">
                                <span className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#d4af37] transition-colors duration-300">
                                    {item.text}
                                </span>
                                <span className="text-[#d4af37]/60 text-xs font-light tracking-tight">
                                    {item.subtext}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Artistic Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>
    );
};

export default TrustBar;