import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Download, CreditCard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CheckoutPage: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');

    // Dynamic Product State
    const { product, price, productId } = location.state || {
        product: t.checkout.digitalBundle || "Digital Souvenir Bundle",
        price: 12,
        productId: 'bundle'
    };

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);

    // Mock payment handler - would normally integrate Stripe/Gumroad
    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, redirection to payment gateway occurs here.
        console.log(`Processing payment for ${productId}: ${formattedPrice}`);
        // For this demo, we simulate success and go to /thank-you
        navigate('/thank-you');
    };

    return (
        <div className="min-h-screen bg-andean-slate text-andean-cream font-sans p-6 flex flex-col items-center justify-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-andean-gold mb-2">{t.checkout.header}</h1>
                    <div className="h-1 w-20 bg-andean-terracotta mx-auto rounded-full" />
                </div>

                {/* Item List */}
                <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-lg mb-2">{product}</h3>
                    <p className="text-sm text-white/60 mb-4">{productId === 'bundle' ? t.checkout.includes : 'Digital Download'}</p>
                    <div className="flex justify-between items-center text-xl font-bold text-white">
                        <span>{t.checkout.total}</span>
                        <span>{formattedPrice}</span>
                    </div>
                    {/* Price Breakdown Details (Simplified) */}
                    <div className="mt-2 text-xs text-white/40 flex justify-between">
                        <span>Subtotal</span>
                        <span>{formattedPrice}</span>
                    </div>
                    <div className="text-xs text-white/40 flex justify-between">
                        <span>Tax</span>
                        <span>0.00€</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                            {t.checkout.emailLabel}
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-andean-gold focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full group relative flex items-center justify-center gap-3 bg-andean-gold hover:bg-white text-andean-slate font-bold text-lg py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Lock size={20} className="text-andean-slate/70 group-hover:text-andean-slate" />
                        {t.checkout.button}
                    </button>
                </form>

                {/* Trust Signals */}
                <div className="mt-8 flex justify-center gap-6 text-xs text-white/40">
                    <div className="flex flex-col items-center gap-1">
                        <ShieldCheck size={16} />
                        <span>{t.checkout.secure}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Download size={16} />
                        <span>{t.checkout.instant}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <CreditCard size={16} />
                        <span>{t.checkout.guarantee}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutPage;
