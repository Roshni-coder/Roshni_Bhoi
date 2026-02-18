import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineBadgeCheck, HiOutlineShoppingBag, HiOutlineArrowRight } from 'react-icons/hi';

export default function BulkSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the quote ID from the navigation state, or show a fallback
  const quoteId = location.state?.quoteId || "INQ-" + Math.floor(Math.random() * 900000);

  return (
    <div className=" flex items-center justify-center  p-6">
      <div className="max-w-xl w-full bg-white border border-gray-100 p-8 md:p-6 rounded-[2.5rem] shadow-sm text-center">
        
        {/* Subtle Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-50 p-4 rounded-full">
            <HiOutlineBadgeCheck className="text-emerald-600 w-8 h-8" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-serif text-[#1A3C34] mb-3">
          Request Received
        </h1>
        
        <p className="text-gray-500 font-light mb-8">
          Thank you for your interest in our heritage collection. We’ve received your bulk inquiry and our corporate team will reach out to you shortly.
        </p>

        {/* Reference Box */}
        <div className="bg-[#FCFBF7] border border-dashed border-[#B89B5E]/30 rounded-2xl p-5 mb-10">
          <p className="text-[10px] uppercase tracking-widest text-[#B89B5E] font-bold mb-1">
            Inquiry Reference
          </p>
          <p className="text-xl font-mono text-[#1A3C34] font-bold">
            #{quoteId}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/alloccasions')}
            className="w-full bg-[#1A3C34] text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#2a5248] transition-all"
          >
            <HiOutlineShoppingBag /> Continue Browsing
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full text-gray-500 py-2 text-sm flex items-center justify-center gap-1 hover:text-[#1A3C34] transition-colors"
          >
            Go to Homepage <HiOutlineArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Footer Support */}
        <div className="mt-2 pt-2 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            Questions regarding your quote? Contact us at <span className="text-[#B89B5E] font-medium">support@ishisofttech.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}