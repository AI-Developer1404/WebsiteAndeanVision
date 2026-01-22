import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { artContent } from '../data/artContent';
import { Palette, Printer, ShoppingBag, Maximize2, ArrowRight, ChevronLeft, ChevronRight, Frame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArtPage: React.FC = () => {
    const { language } = useLanguage();
    const content = artContent[language];
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    // Parallax & Opacity effects for Hero
    const yHero = useTransform(scrollY, [0, 800], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % content.gallery.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + content.gallery.length) % content.gallery.length);
    };

    const currentItem = content.gallery[currentIndex];

    // Auto-advance if not interacting
    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <div className="bg-neutral-950 text-white font-sans selection:bg-andean-gold selection:text-black min-h-screen overflow-x-hidden">

            {/* Futuristic Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* HERO SECTION - Cinematic Digital Gallery */}
            <section className="relative h-screen flex items-center overflow-hidden px-6 md:px-12">

                {/* Asymmetrical Background Elements */}
                <motion.div
                    style={{ y: yHero }}
                    className="absolute right-0 top-0 w-2/3 h-full overflow-hidden mask-image-gradient"
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-neutral-950 z-10" />
                    <img
                        src="/photo-assets/chinchero 2.jpg"
                        alt="Background Art"
                        className="w-full h-full object-cover opacity-80"
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    style={{ opacity: opacityHero }}
                    className="relative z-10 max-w-4xl pt-24"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="h-[1px] bg-andean-gold mb-8"
                    />

                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-andean-gold font-mono text-sm tracking-[0.3em] mb-4 flex items-center gap-3"
                    >
                        <Frame size={14} />
                        {content.hero.subtitle}
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-serif leading-[0.9] text-white mix-blend-difference mb-12"
                    >
                        {content.hero.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-col md:flex-row gap-8 md:items-end"
                    >
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg border-l border-white/20 pl-6">
                            {content.hero.description}
                        </p>

                        <button
                            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-4 overflow-hidden rounded-none border border-white/20 bg-transparent text-white hover:text-black transition-colors"
                        >
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <span className="relative z-10 font-mono tracking-widest text-xs flex items-center gap-4">
                                {content.hero.cta}
                                <ArrowRight size={14} />
                            </span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Floating "Digital" Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 right-12 text-right hidden md:block"
                >
                    <div className="text-6xl font-serif text-white/5">001</div>
                    <div className="text-xs font-mono text-andean-gold/50 tracking-widest">COLLECTION / 2025</div>
                </motion.div>
            </section>

            {/* CAROUSEL GALLERY */}
            <section id="gallery" className="relative bg-neutral-950 py-32 overflow-hidden border-t border-white/5">
                <div className="max-w-[1800px] mx-auto px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                        {/* Text / Info Side */}
                        <div className="lg:col-span-4 lg:order-1 order-2 space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="font-mono text-andean-gold text-xs mb-4">
                                        ARTWORK 0{currentItem.id} / 0{content.gallery.length}
                                    </div>
                                    <h3 className="text-5xl md:text-6xl font-serif mb-6 leading-none">{currentItem.title}</h3>
                                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">{currentItem.description}</p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={prevSlide}
                                            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Image Viewer Side */}
                        <div className="lg:col-span-8 lg:order-2 order-1 relative">
                            <div className="aspect-[16/9] md:aspect-[21/9] bg-neutral-900 overflow-hidden relative group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentItem.image}
                                        src={currentItem.image}
                                        alt={currentItem.title}
                                        initial={{ scale: 1.15, opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ scale: 1.05, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PURCHASE SECTION */}
            <section className="py-32 bg-neutral-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-80" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 100%)' }}>
                    <img src="/photo-assets/stenen muur.jpg" className="w-full h-full object-cover brightness-110 contrast-125" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-20 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-7xl font-serif mb-4 text-white hover:text-andean-gold transition-colors duration-500 cursor-default">
                            {content.pricing.title}
                        </h2>
                        <div className="w-24 h-1 bg-andean-gold mx-auto mb-12" />

                        <div className="grid md:grid-cols-3 gap-12 mb-16 text-left">
                            {content.feature.points.slice(0, 3).map((point, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-andean-gold group-hover:text-black transition-colors">
                                        {i === 0 ? <Maximize2 size={20} /> : i === 1 ? <Palette size={20} /> : <Printer size={20} />}
                                    </div>
                                    <p className="text-gray-300 font-light text-sm">{point}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <div className="text-right hidden md:block">
                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Total Value</p>
                                <p className="text-gray-400 line-through decoration-andean-gold decoration-2">$60.00+</p>
                            </div>

                            <button
                                onClick={() => navigate('/checkout', { state: { product: 'Andean Visions Art Collection', price: 15, productId: 'art' } })}
                                className="group relative px-12 py-6 bg-white text-black font-bold text-xl rounded-full overflow-hidden hover:scale-105 transition-transform"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    <ShoppingBag size={24} />
                                    {content.pricing.button} <span className="opacity-30">|</span> {content.pricing.price}
                                </span>
                                <div className="absolute inset-0 bg-andean-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>

                            <div className="text-left hidden md:block">
                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">File Format</p>
                                <p className="text-white">TIFF / JPEG / PDF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArtPage;
