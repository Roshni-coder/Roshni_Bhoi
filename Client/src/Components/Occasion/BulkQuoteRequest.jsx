import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiCheck, HiOfficeBuilding, HiMail, HiPhone, HiUser,
    HiDocumentText, HiUpload, HiArrowRight, HiShieldCheck,
    HiClock, HiGift, HiSparkles, HiChevronRight, HiChevronLeft
} from "react-icons/hi";
import { toast } from "react-toastify";
import api from "../../utils/api";

function BulkQuoteRequest() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const productId = searchParams.get('product');
    const occasionSlug = searchParams.get('occasion');

    const [product, setProduct] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quoteResult, setQuoteResult] = useState(null);

    const [formData, setFormData] = useState({
        companyName: '',
        gstNumber: '',
        industry: '',
        contactName: '',
        email: '',
        phone: '',
        designation: '',
        quantity: 100,
        deliveryDate: '',
        deliveryCity: '',
        logoRequired: false,
        logoFile: null,
        customMessage: false,
        messageText: '',
        premiumPackaging: false,
        giftTags: false,
        additionalNotes: ''
    });

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const res = await api.get(`/api/products/${productId}`);
            if (res.data.success) {
                setProduct(res.data.product);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const calculateEstimate = () => {
        if (!product) return { unitPrice: 0, subtotal: 0, extras: 0, total: 0, savings: 0 };
        let unitPrice = product.price;
        if (formData.quantity >= 500) unitPrice = Math.round(product.price * 0.80);
        else if (formData.quantity >= 100) unitPrice = Math.round(product.price * 0.85);
        else if (formData.quantity >= 50) unitPrice = Math.round(product.price * 0.90);

        const subtotal = unitPrice * formData.quantity;
        let extras = 0;
        if (formData.logoRequired) extras += 50 * formData.quantity;
        if (formData.premiumPackaging) extras += 30 * formData.quantity;
        if (formData.giftTags) extras += 10 * formData.quantity;

        return {
            unitPrice,
            subtotal,
            extras,
            total: subtotal + extras,
            savings: (product.price * formData.quantity) - subtotal
        };
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            setFormData(prev => ({ ...prev, logoFile: file }));
        }
    };

    const validateStep = (step) => {
        switch (step) {
            case 1: return formData.companyName && formData.contactName && formData.email && formData.phone;
            case 2: return formData.quantity >= 10 && formData.deliveryCity;
            default: return true;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) setCurrentStep(currentStep + 1);
        else toast.warning('Please fill all required fields');
    };

    const handleSubmit = async () => {
        if (!validateStep(1) || !validateStep(2)) {
            toast.error('Please complete all required fields');
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await api.post('/api/bulk-quote', { productId, ...formData, occasion: occasionSlug });
            if (res.data.success) {
                setQuoteResult(res.data.data);
                setCurrentStep(4);
            }
        } catch (error) {
            setQuoteResult({
                quoteId: `BQ-${Date.now()}`,
                product: { title: product?.title || 'Selected Product', image: product?.images?.[0]?.url },
                ...calculateEstimate(),
                quantity: formData.quantity
            });
            setCurrentStep(4);
        } finally {
            setIsSubmitting(false);
        }
    };

    const estimate = calculateEstimate();

    return (
        <div className="min-h-screen bg-[#FCFBF7] text-slate-800 pb-20 overflow-hidden">

            {/* Header Section */}
            <div className="bg-[#FAF9F6] border-b border-amber-100 pt-16 pb-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-700/60 mb-6 font-bold font-sans">
                        <Link to="/" className="hover:text-amber-600 transition">Home</Link>
                        <span>/</span>
                        <span className="text-amber-600">Request Bulk Quote</span>
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
                        Bulk <span className="italic text-amber-600">Inquiry</span>
                    </h1>
                    <div className="w-20 h-1 bg-amber-200 mx-auto rounded-full mb-6" />
                    <p className="text-slate-500 max-w-xl mx-auto text-lg font-sans font-light leading-relaxed">
                        Partner with us for authentic handcrafted gifts. Get bespoke pricing for corporate events and large orders.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-12">
                <div className={`${currentStep === 4 ? 'max-w-2xl mx-auto' : 'grid lg:grid-cols-3 gap-8'} items-start`}>
                    
                    {/* Main Form Area */}
                    <div className={currentStep === 4 ? "w-full" : "lg:col-span-2"}>
                        {/* Stepper (Visible only during form) */}
                        {currentStep < 4 && (
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-amber-50 p-6 flex justify-between items-center mb-8 font-sans">
                                {['Organization', 'Requirements', 'Tailoring'].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                                            currentStep > idx + 1 ? 'bg-green-500 text-white' : 
                                            currentStep === idx + 1 ? 'bg-[#C19D60] text-white ring-4 ring-amber-100' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {currentStep > idx + 1 ? <HiCheck /> : idx + 1}
                                        </div>
                                        <span className={`text-[10px] uppercase tracking-widest font-bold hidden md:inline ${currentStep >= idx + 1 ? 'text-slate-800' : 'text-slate-400'}`}>{step}</span>
                                        {idx < 2 && <div className="w-6 md:w-12 h-[1px] bg-amber-100 mx-2" />}
                                    </div>
                                ))}
                            </div>
                        )}

                        <motion.div layout className="bg-white rounded-[2rem] shadow-xl shadow-amber-900/5 border border-amber-50 p-8 md:p-12 overflow-hidden relative">
                            {/* Accent Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-50 -z-0" />
                            
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} key="step1" className="relative z-10">
                                        <h2 className="text-3xl font-serif text-slate-900 mb-8 flex items-center gap-4">
                                            <span className="text-amber-600 font-light italic">01.</span> Company Profile
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 font-sans">
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Company Name *</label>
                                                <input type="text" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)}
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 transition-all outline-none text-lg" placeholder="e.g. Heritage Pvt Ltd" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Contact Name *</label>
                                                <input type="text" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)}
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 transition-all outline-none" placeholder="Enter full name" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Work Email *</label>
                                                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 transition-all outline-none" placeholder="name@company.com" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Phone Number *</label>
                                                <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)}
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 transition-all outline-none" placeholder="+91" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Industry Type</label>
                                                <select value={formData.industry} onChange={(e) => handleChange('industry', e.target.value)}
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 transition-all outline-none appearance-none">
                                                    <option value="">Select Category</option>
                                                    <option value="it-tech">Technology</option>
                                                    <option value="finance">Banking/Finance</option>
                                                    <option value="other">Institutional</option>
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} key="step2">
                                        <h2 className="text-3xl font-serif text-slate-900 mb-8 flex items-center gap-4">
                                            <span className="text-amber-600 font-light italic">02.</span> Requirements
                                        </h2>
                                        <div className="space-y-10 font-sans">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-6 text-center">Volume Selection</label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {[50, 100, 250, 500].map((qty) => (
                                                        <button key={qty} type="button" onClick={() => handleChange('quantity', qty)}
                                                            className={`py-4 rounded-xl border font-bold transition-all ${formData.quantity === qty ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-inner' : 'border-slate-100 bg-white text-slate-400 hover:border-amber-200'}`}>
                                                            {qty}+
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="mt-6">
                                                    <input type="number" value={formData.quantity} onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 outline-none text-center text-xl font-bold text-slate-800" placeholder="Custom Quantity" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Delivery City *</label>
                                                    <input type="text" value={formData.deliveryCity} onChange={(e) => handleChange('deliveryCity', e.target.value)}
                                                        className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 outline-none" placeholder="City for fulfillment" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-2">Deadline</label>
                                                    <input type="date" value={formData.deliveryDate} onChange={(e) => handleChange('deliveryDate', e.target.value)}
                                                        className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-100 focus:border-amber-500 outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} key="step3">
                                        <h2 className="text-3xl font-serif text-slate-900 mb-8 flex items-center gap-4">
                                            <span className="text-amber-600 font-light italic">03.</span> Tailoring
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-4 font-sans">
                                            {[
                                                { id: 'logoRequired', label: 'Branding', price: '₹50/u', icon: <HiUpload /> },
                                                { id: 'premiumPackaging', label: 'Luxury Box', price: '₹30/u', icon: <HiGift /> },
                                                { id: 'customMessage', label: 'Personal Card', price: 'Free', icon: <HiMail /> },
                                                { id: 'giftTags', label: 'Name Tags', price: '₹10/u', icon: <HiUser /> }
                                            ].map((opt) => (
                                                <div key={opt.id} onClick={() => handleChange(opt.id, !formData[opt.id])}
                                                    className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${formData[opt.id] ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-100 hover:bg-slate-50'}`}>
                                                    <div className={`p-3 rounded-full ${formData[opt.id] ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-300'}`}>{opt.icon}</div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-800">{opt.label}</p>
                                                        <p className="text-[10px] text-amber-600 font-bold tracking-widest">{opt.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-10 font-sans">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-3">Special Instructions</label>
                                            <textarea value={formData.additionalNotes} onChange={(e) => handleChange('additionalNotes', e.target.value)}
                                                rows={4} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm" placeholder="Any specific artisan requirements?" />
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 4 && (
                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12 font-sans">
                                        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-sm"><HiCheck /></div>
                                        <h2 className="text-4xl font-serif text-slate-900 mb-4">Request Submitted</h2>
                                        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-light">Your inquiry ID is <span className="text-amber-700 font-bold">#{quoteResult?.quoteId.split('-').pop()}</span>. We will review the artisan availability and send a quote shortly.</p>
                                        
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link to="/" className="px-10 py-4 bg-[#C19D60] text-white rounded-full font-bold hover:bg-amber-700 transition shadow-lg shadow-amber-900/10">Back to Store</Link>
                                            {/* <Link to="/shop-by-state" className="px-10 py-4 border border-amber-200 text-amber-700 rounded-full font-bold hover:bg-amber-50 transition">Review Products</Link> */}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form Navigation */}
                            {currentStep < 4 && (
                                <div className="flex items-center justify-between mt-12 pt-10 border-t border-amber-50 font-sans">
                                    <button disabled={currentStep === 1} onClick={() => setCurrentStep(currentStep - 1)}
                                        className="flex items-center gap-2 font-bold text-slate-300 hover:text-slate-800 transition disabled:opacity-0">
                                        <HiChevronLeft className="text-xl" /> Previous
                                    </button>
                                    
                                    {currentStep < 3 ? (
                                        <button onClick={handleNext} className="bg-[#C19D60] hover:bg-amber-700 text-white px-12 py-4 rounded-full font-bold transition flex items-center gap-3 shadow-lg shadow-amber-900/10">
                                            Next Step <HiChevronRight className="text-xl" />
                                        </button>
                                    ) : (
                                        <button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full font-bold transition flex items-center gap-3 shadow-lg shadow-green-900/10">
                                            {isSubmitting ? 'Processing...' : 'Submit Inquiry'} <HiDocumentText className="text-xl" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Summary Sidebar */}
                    {currentStep < 4 && (
                        <aside className="space-y-6 lg:sticky lg:top-10 font-sans">
                            {product && (
                                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-amber-50">
                                    <div className="aspect-[4/5] relative">
                                        <img src={product.images?.[0]?.url} alt={product.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 mb-1">Inquiry for</p>
                                            <h3 className="font-serif text-2xl font-bold text-slate-900 leading-tight">{product.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-amber-900/5 border border-amber-50">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700/60 mb-8 pb-4 border-b border-amber-50">Est. Commercials</h3>
                                
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400">Unit Price</span>
                                        <span className="text-slate-800 font-bold">₹{estimate.unitPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400">Selected Vol.</span>
                                        <span className="text-slate-800 font-bold">{formData.quantity} Units</span>
                                    </div>
                                    {estimate.extras > 0 && (
                                        <div className="flex justify-between items-center text-sm text-amber-600">
                                            <span>Craft Add-ons</span>
                                            <span className="font-bold">+₹{estimate.extras.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {estimate.savings > 0 && (
                                        <div className="flex justify-between items-center text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                            <span>Bulk Tier Discount</span>
                                            <span>-₹{estimate.savings.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="pt-6 mt-6 border-t border-amber-50">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Est.</span>
                                            <span className="text-3xl font-serif text-[#C19D60] font-bold">₹{estimate.total.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-4 italic font-light">Subject to artisan review and location logistics.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 text-center">
                                <p className="text-[10px] uppercase tracking-widest text-amber-700/40 flex items-center justify-center gap-2">
                                    <HiShieldCheck className="text-lg" /> Artisan-Direct Fulfillment
                                </p>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BulkQuoteRequest;