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
        // Address nested object
        address: "",
        city: "",
        state: "",
        pincode: "",
        receiverName: profile?.name || "",
        receiverPhone: profile?.phone || ""
    });

    // If cart is empty, send them back
    useEffect(() => {
        if (bulkCart.length === 0) {
            navigate("/corporate-gifting");
        }
    }, [bulkCart]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Calculate total for the backend
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
                clearBulkCart(); // Clears frontend and backend cart
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
                <h1 className="text-3xl font-serif font-bold text-[#1A3C34] mb-8">Complete Your Inquiry</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* FORM SECTION */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                        
                        {/* Business Info */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1A3C34] mb-6 border-b pb-2">Business Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input name="companyName" placeholder="Company Name" required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="email" type="email" placeholder="Official Email" value={formData.email} required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="phone" placeholder="Phone Number" value={formData.phone} required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1A3C34] mb-6 border-b pb-2">Delivery & Logistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Preferred Delivery Date</label>
                                    <input name="deliveryDate" type="date" required onChange={handleChange} className="w-full p-3 bg-[#FCFBF7] border rounded-xl mt-1" />
                                </div>
                                <input name="receiverName" placeholder="Receiver Name" value={formData.receiverName} required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="receiverPhone" placeholder="Receiver Phone" value={formData.receiverPhone} required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="address" placeholder="Full Address" required onChange={handleChange} className="md:col-span-2 p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="city" placeholder="City" required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <input name="pincode" placeholder="Pincode" required onChange={handleChange} className="p-3 bg-[#FCFBF7] border rounded-xl" />
                                <textarea name="additionalNotes" placeholder="Additional Notes (e.g. Branding requirements)" onChange={handleChange} className="md:col-span-2 p-3 bg-[#FCFBF7] border rounded-xl h-24" />
                            </div>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit" 
                            className="w-full bg-[#1A3C34] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#B58D2F] transition-all shadow-lg"
                        >
                            {isSubmitting ? "Processing..." : "Submit Inquiry Request"}
                        </button>
                    </form>

                    {/* SUMMARY SECTION */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <BulkSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}