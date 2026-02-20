import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext.jsx";
import { useNavigate } from "react-router-dom";
import BulkSummary from "../Cart Page/BulkSummary.jsx";
import api from "../../utils/api.js";
import { toast } from "react-toastify";

export default function BulkQuoteRequestPage() {
    const { bulkCart, profile, clearBulkCart } = useContext(AppContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        deliveryDate: "",
        additionalNotes: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        receiverName: profile?.name || "",
        receiverPhone: profile?.phone || ""
    });

    useEffect(() => {
        if (bulkCart.length === 0) {
            navigate("/corporate-gifting");
        }
    }, [bulkCart, navigate]);

    // ✅ HELPER: Validates and formats phone input to 10 digits only
    const handlePhoneInput = (e) => {
        const { name, value } = e.target;
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, "");
        // Limit to 10 digits
        if (cleaned.length <= 10) {
            setFormData(prev => ({ ...prev, [name]: cleaned }));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ VALIDATION: Check if phone numbers are exactly 10 digits
        if (formData.phone.length !== 10 || formData.receiverPhone.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }

        setIsSubmitting(true);

        const total = bulkCart.reduce((acc, item) => acc + item.totalPrice, 0);

        const payload = {
            companyName: formData.companyName,
            contactPerson: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            deliveryDate: formData.deliveryDate,
            additionalNotes: formData.additionalNotes,
            deliveryAddress: {
                name: formData.receiverName,
                phone: formData.receiverPhone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
            },
            items: bulkCart,
            totalAmount: total
        };

        try {
            const res = await api.post("/api/submit-bulk-quote", payload);
            if (res.data.success) {
                toast.success("Quote Request Submitted!");
                clearBulkCart();
                navigate("/bulkrequestsuccess");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFBF7] py-12">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-10">
                    <h1 className="text-4xl font-serif font-bold text-[#1A3C34]">Complete Your Inquiry</h1>
                    <div className="h-1 w-20 bg-[#B58D2F] mt-2 rounded-full"></div>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                        
                        {/* Business Info */}
                        <div className="bg-white p-8 rounded-3xl border border-[#EDE3D2] shadow-sm">
                            <h3 className="text-sm font-bold text-[#B58D2F] uppercase tracking-widest mb-6 border-b border-[#F9F7F2] pb-2">Business Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField label="Company Name" name="companyName" placeholder="e.g. Acme Corp" required onChange={handleChange} />
                                <InputField label="Contact Person" name="contactPerson" value={formData.contactPerson} required onChange={handleChange} />
                                <InputField label="Official Email" name="email" type="email" value={formData.email} required onChange={handleChange} />
                                
                                {/* Phone Input with Validation Styling */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#544231] uppercase ml-1">Official Phone (10 Digits)</label>
                                    <input 
                                        name="phone" 
                                        placeholder="Enter 10 digit number" 
                                        value={formData.phone}
                                        required 
                                        onChange={handlePhoneInput}
                                        className={`p-3 bg-[#FCFBF7] border rounded-xl outline-none transition-all ${formData.phone.length > 0 && formData.phone.length < 10 ? 'border-red-300 ring-1 ring-red-100' : 'border-[#EDE3D2] focus:border-[#B58D2F]'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-white p-8 rounded-3xl border border-[#EDE3D2] shadow-sm">
                            <h3 className="text-sm font-bold text-[#B58D2F] uppercase tracking-widest mb-6 border-b border-[#F9F7F2] pb-2">Delivery & Logistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#544231] uppercase ml-1">Preferred Delivery Date</label>
                                    <input name="deliveryDate" type="date" required onChange={handleChange} className="p-3 bg-[#FCFBF7] border border-[#EDE3D2] rounded-xl focus:border-[#B58D2F] outline-none" />
                                </div>
                                <InputField label="Receiver Name" name="receiverName" value={formData.receiverName} required onChange={handleChange} />
                                
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#544231] uppercase ml-1">Receiver Phone</label>
                                    <input 
                                        name="receiverPhone" 
                                        placeholder="10 digit number" 
                                        value={formData.receiverPhone} 
                                        required 
                                        onChange={handlePhoneInput}
                                        className={`p-3 bg-[#FCFBF7] border rounded-xl outline-none transition-all ${formData.receiverPhone.length > 0 && formData.receiverPhone.length < 10 ? 'border-red-300 ring-1 ring-red-100' : 'border-[#EDE3D2] focus:border-[#B58D2F]'}`}
                                    />
                                </div>

                                <InputField label="Full Address" name="address" placeholder="Street, Building, etc." required onChange={handleChange} className="md:col-span-2" />
                                <InputField label="City" name="city" required onChange={handleChange} />
                                <InputField label="Pincode" name="pincode" required onChange={handleChange} />
                                
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#544231] uppercase ml-1">Additional Notes</label>
                                    <textarea name="additionalNotes" placeholder="Branding requirements, custom packaging, etc." onChange={handleChange} className="p-3 bg-[#FCFBF7] border border-[#EDE3D2] rounded-xl h-28 focus:border-[#B58D2F] outline-none" />
                                </div>
                            </div>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit" 
                            className="w-full bg-[#322619] text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1A] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Processing Inquiry..." : "Submit Inquiry Request"}
                        </button>
                    </form>

                    {/* SUMMARY SECTION */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-8 rounded-[2rem] border border-[#EDE3D2] shadow-2xl shadow-[#322619]/5">
                            <BulkSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ REUSABLE SUB-COMPONENT FOR CLEANER CODE
function InputField({ label, name, type = "text", placeholder, value, onChange, className = "", required = false }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-bold text-[#544231] uppercase ml-1">{label}</label>
            <input 
                name={name} 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                required={required} 
                onChange={onChange} 
                className="p-3 bg-[#FCFBF7] border border-[#EDE3D2] rounded-xl focus:border-[#B58D2F] outline-none transition-all"
            />
        </div>
    );
}