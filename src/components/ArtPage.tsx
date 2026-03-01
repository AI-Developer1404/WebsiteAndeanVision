import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { artContent } from '../data/artContent';
import { Palette, Printer, ShoppingBag, Maximize2, ArrowRight, ChevronLeft, ChevronRight, Frame, Image as ImageIcon, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import FAQSection from './FAQSection';
import BundlePreviewModal from './BundlePreviewModal';
import InteriorPreviewApp from './InteriorPreviewApp';

const ArtPage: React.FC = () => {
    const { language, t } = useLanguage();
    const content = artContent[language];
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const [showBundlePreview, setShowBundlePreview] = useState(false);

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
                    <div className="text-xs font-mono text-andean-gold/50 tracking-widest">{t.art.collection}</div>
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
                                        {t.art.artwork} 0{currentItem.id} / 0{content.gallery.length}
                                    </div>
                                    <h3 className="text-5xl md:text-6xl font-serif mb-6 leading-none">{currentItem.title}</h3>
                                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">{currentItem.description}</p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={prevSlide}
                                            className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Image Viewer Side */}
                        <div className="lg:col-span-8 lg:order-2 order-1 relative">
                            <div className="aspect-[16/9] md:aspect-[21/9] bg-neutral-900 overflow-hidden relative group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
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

            {/* INTERACTIVE INTERIOR PREVIEW */}
            <InteriorPreviewApp
                gallery={content.gallery}
                currentIndex={currentIndex}
                onArtChange={setCurrentIndex}
                previewTitle={t.art.previewTitle}
                previewDesc={t.art.previewDesc}
                labelFrame={t.art.labelFrame ?? 'Frame'}
                labelSize={t.art.labelSize ?? 'Size'}
                labelRoom={t.art.labelRoom ?? 'Room'}
            />

            {/* NEW: THE CREATIVE JOURNEY */}
            <section className="py-24 px-6 bg-black text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif mb-16 text-white">{t.art.processTitle}</h2>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-andean-gold/50 to-transparent" />

                        <div className="relative z-10 bg-black p-4">
                            <div className="w-24 h-24 mx-auto bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 mb-6 text-andean-gold shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                                <ImageIcon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.art.features.item1.title}</h3>
                            <p className="text-gray-400 text-sm">{t.art.features.item1.desc}</p>
                        </div>

                        <div className="relative z-10 bg-black p-4">
                            <div className="w-24 h-24 mx-auto bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 mb-6 text-andean-gold shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                                <Monitor size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.art.features.item2.title}</h3>
                            <p className="text-gray-400 text-sm">{t.art.features.item2.desc}</p>
                        </div>

                        <div className="relative z-10 bg-black p-4">
                            <div className="w-24 h-24 mx-auto bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 mb-6 text-andean-gold shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                                <Printer size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.art.features.item3.title}</h3>
                            <p className="text-gray-400 text-sm">{t.art.features.item3.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PURCHASE SECTION */}
            {/* PURCHASE SECTION */}
            <section className="py-32 bg-neutral-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 100%)' }}>
                    <img src="/photo-assets/stenen muur.jpg" className="w-full h-full object-cover brightness-110 contrast-125" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <div className="glass-panel p-12 md:p-20 text-center">
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
                                    <p className="text-gray-200 font-light text-sm">{point}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                                <div className="text-right hidden md:block">
                                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{t.art.totalValue}</p>
                                    <p className="text-white line-through decoration-andean-gold decoration-2 text-lg font-bold">$60.00+</p>
                                </div>

                                <MagneticButton
                                    onClick={() => navigate('/checkout', { state: { product: 'Andean Visions Art Collection', price: 15, productId: 'art' } })}
                                    className="group relative px-12 py-6 bg-white text-black font-bold text-xl rounded-full overflow-hidden hover:scale-105 transition-transform"
                                >
                                    <span className="relative z-10 flex items-center gap-4">
                                        <ShoppingBag size={24} />
                                        {content.pricing.button} <span className="opacity-30">|</span> {content.pricing.price}
                                    </span>
                                    <div className="absolute inset-0 bg-andean-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </MagneticButton>

                                <div className="text-left hidden md:block">
                                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{t.art.fileFormat}</p>
                                    <p className="text-white text-lg font-bold">{t.art.formats}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowBundlePreview(true)}
                                className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
                            >
                                {t.hero.previewIncluded}
                            </button>
                        </div>
                    </div>
                </div>
            </section >

            {/* NEW: FAQ SECTION */}
            < FAQSection
                title={t.art.faqTitle}
                items={t.art.faq}
                className="bg-neutral-950 border-t border-white/5"
            />

            <BundlePreviewModal
                isOpen={showBundlePreview}
                onClose={() => setShowBundlePreview(false)}
                initialTab="art"
                customTitle={t.art.previewTitle}
                allowedTabs={['art']}
            />
        </div >
    );
};

export default ArtPage;
