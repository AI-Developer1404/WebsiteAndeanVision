import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { artContent } from '../data/artContent';
import { Palette, Printer, ShoppingBag, Maximize2, Download, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArtPage: React.FC = () => {
    const { language } = useLanguage();
    const content = artContent[language];
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % content.gallery.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + content.gallery.length) % content.gallery.length);
    };

    const currentItem = content.gallery[currentIndex];

    return (
        <div className="bg-andean-slate text-white font-sans selection:bg-andean-gold selection:text-black min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1544165620-8356942c7595?q=80&w=2669&auto=format&fit=crop"
                        alt="Art Studio"
                        className="w-full h-full object-cover opacity-30"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-andean-slate via-andean-slate/50 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-andean-gold uppercase tracking-[0.5em] text-sm md:text-base mb-6 font-sans">
                            {content.hero.subtitle}
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-serif mb-8 text-white">
                            {content.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                            {content.hero.description}
                        </p>

                        <div className="flex justify-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <Palette size={18} />
                                <span>{content.hero.cta}</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Carousel Gallery */}
            <section id="gallery" className="relative min-h-screen bg-neutral-900 py-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <div className="relative">
                        {/* Main Carousel */}
                        <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl bg-black">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={currentItem.image}
                                        alt={currentItem.title}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                    {/* Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 md:p-12">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">{currentItem.title}</h3>
                                                <p className="text-gray-300 font-light text-lg">{currentItem.description}</p>
                                            </div>
                                            <div className="text-gray-500 uppercase text-xs tracking-widest text-right">
                                                <span className="block mb-1">{currentItem.orientation}</span>
                                                <span>0{currentIndex + 1} / 0{content.gallery.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors z-10 group"
                                aria-label="Previous artwork"
                            >
                                <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors z-10 group"
                                aria-label="Next artwork"
                            >
                                <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Thumbnail Navigation */}
                        <div className="flex gap-3 mt-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent justify-center">
                            {content.gallery.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index
                                        ? 'border-andean-gold scale-110'
                                        : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Purchase CTA */}
                        <div className="mt-12 text-center bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
                            <h3 className="text-3xl md:text-5xl font-serif mb-6">{content.pricing.title}</h3>
                            <p className="text-2xl font-light text-gray-400 mb-2">Full Access</p>
                            <p className="text-sm text-gray-400 font-sans mt-1 mb-4">High-res files for premium printing on thick art paper</p>
                            <p className="text-6xl md:text-8xl font-light text-andean-gold mb-8">{content.pricing.price}</p>
                            <button
                                onClick={() => navigate('/checkout', { state: { product: 'Andean Visions Art Collection', price: 15, productId: 'art' } })}
                                className="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-4 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                <ShoppingBag />
                                {content.pricing.button}
                                <ArrowRight />
                            </button>
                            <p className="mt-6 text-sm text-gray-500 uppercase tracking-widest">{content.pricing.includes}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Technical Details */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8">{content.feature.title}</h2>
                        <h3 className="text-xl text-andean-gold mb-8 uppercase tracking-widest font-sans">{content.feature.subtitle}</h3>
                        <div className="space-y-6">
                            {content.feature.points.map((point, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex items-center gap-4 p-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    {idx === 0 ? <Maximize2 className="text-gray-400" /> : idx === 1 ? <Download className="text-gray-400" /> : <Printer className="text-gray-400" />}
                                    <span className="text-lg font-light">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-andean-gold to-orange-600 rounded-full opacity-20 blur-3xl" />
                        <div className="relative aspect-square bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-8 flex items-center justify-center">
                            {/* Mockup Simulation */}
                            <div className="w-3/4 h-3/4 bg-white shadow-2xl relative p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                                <div className="w-full h-full bg-gray-200 overflow-hidden relative">
                                    <img src={content.gallery[0].image} className="w-full h-full object-cover" alt="Mockup" loading="lazy" />
                                </div>
                                <div className="absolute bottom-4 right-4 text-black text-[10px] opacity-50 font-mono">300 DPI / CMYK</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ArtPage;
