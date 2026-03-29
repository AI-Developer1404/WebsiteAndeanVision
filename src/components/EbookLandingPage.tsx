import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Search, Mountain, Crown, Calendar, Users, ShoppingBag, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ebookContent } from '../data/ebookContent';
import MagneticButton from './MagneticButton';
import FAQSection from './FAQSection';
import BundlePreviewModal from './BundlePreviewModal';
import EbookScrollMorph from './EbookScrollMorph';
import LazyBackgroundVideo from './LazyBackgroundVideo';

const EbookLandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { language, t } = useLanguage();
    const content = ebookContent[language];
    const containerRef = useRef(null);
    const [showBundlePreview, setShowBundlePreview] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const icons = [Mountain, Mountain, Crown, Users, Mountain, Calendar, Users];

    // Carousel State
    // Carousel State
    const carouselRef = useRef<HTMLDivElement>(null);
    const spreads = [
        { id: 1, title: "Detailed Typography", image: "/ebook mockups/first.png", desc: "Optimized for readability on all devices." },
        { id: 2, title: "Exclusive Imagery", image: "/ebook mockups/second.png", desc: "We use our own exclusive imagery." },
        { id: 3, title: "Local Insight", image: "/ebook mockups/third.png", desc: "Written by a Cusco native sharing extensive local knowledge and hidden stories." },
    ];

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -340 : 340;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div ref={containerRef} className="relative bg-gradient-to-b from-blue-900 via-slate-950 to-black text-andean-cream font-sans selection:bg-andean-gold selection:text-neutral-950" style={{ overflowX: 'clip' }}>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-andean-gold origin-left z-50"
                style={{ scaleX }}
            />

            {/* HERO — Cinematic Video Background */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <LazyBackgroundVideo
                    src="/background ebook page.mp4"
                    poster="/ebook mockups/first.png"
                    priority
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-blue-900/80" />

                <div className="relative z-20 text-center px-6 max-w-4xl">
                    <p className="text-andean-gold font-mono text-xs tracking-widest uppercase mb-6">The Andean Scroll</p>
                    <h1 className="text-6xl md:text-8xl font-serif text-white leading-tight mb-6 drop-shadow-2xl">
                        {content.introduction.title}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        {content.introduction.content}
                    </p>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <ArrowDown className="w-6 h-6 text-andean-gold/70" />
                </div>
            </section>

            {/* Introduction - Parallax Section */}
            <section className="relative py-32 px-6 flex justify-center bg-black/40 backdrop-blur-md">
                <div className="max-w-4xl text-center">
                    <BookOpen className="w-16 h-16 text-andean-gold mx-auto mb-8" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-12 text-transparent bg-clip-text bg-gradient-to-r from-andean-gold to-white">{content.introduction.title}</h2>
                    <p className="text-xl md:text-2xl text-gray-300 leading-loose">
                        {content.introduction.content}
                    </p>
                </div>
            </section>

            {/* INSIDE THE PAGES CAROUSEL */}
            <section className="pt-32 pb-24 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-andean-gold/50 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
                    <div>
                        <div className="text-andean-gold font-mono text-sm tracking-widest mb-4 flex items-center gap-2">
                            <BookOpen size={16} />
                            {t.ebook.insidePages.title}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white max-w-xl">
                            {t.ebook.insidePages.subtitle}
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex gap-4">
                            <button
                                onClick={() => scrollCarousel('left')}
                                className="bg-white/5 hover:bg-white/10 p-2 md:p-4 rounded-full border border-white/10 transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft size={24} className="text-white" />
                            </button>
                            <button
                                onClick={() => scrollCarousel('right')}
                                className="bg-white/5 hover:bg-white/10 p-2 md:p-4 rounded-full border border-white/10 transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight size={24} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-[1400px] mx-auto px-6">
                    <div
                        ref={carouselRef}
                        className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 custom-scrollbar scroll-smooth"
                    >
                        {spreads.map((spread) => (
                            <motion.div
                                key={spread.id}
                                className="w-[85vw] md:w-[600px] snap-center bg-neutral-900 rounded-xl overflow-hidden border border-white/10 relative group shrink-0"
                                whileHover={{ y: -5 }}
                            >
                                <div className="aspect-[4/3] relative bg-neutral-950">
                                    <img
                                        src={spread.image}
                                        alt={spread.title}
                                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>
                                <div className="p-6 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                                    <h3 className="text-xl font-serif text-white mb-2">{spread.title}</h3>
                                    <p className="text-gray-400 text-sm">{spread.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EBOOK SCROLL MORPH */}
            <EbookScrollMorph folderPath="/ebook-morph" filePrefix="ezgif-frame-" frameCount={120}>
                <div className="text-center lg:text-left">
                    <div className="text-andean-gold font-mono text-sm tracking-widest mb-4 flex items-center gap-2">
                        <BookOpen size={16} />
                        {t.ebook.insidePages.title}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
                        {content.introduction.title}
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                        {content.introduction.content}
                    </p>
                    <MagneticButton onClick={() => navigate('/checkout', { state: { product: 'The Andean Scroll (Ebook)', price: 8, productId: 'ebook' } })}>
                        <div className="px-8 py-4 bg-andean-gold text-black text-sm font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                            <ShoppingBag size={18} />
                            Get the Guide — 8€
                        </div>
                    </MagneticButton>
                </div>
            </EbookScrollMorph>

            {/* Scrollytelling Chapters */}
            <div className="relative z-10">
                {content.chapters.map((chapter, index) => {
                    const Icon = icons[index % icons.length];
                    return (
                        <ChapterSection key={index} chapter={chapter} index={index} Icon={Icon} />
                    );
                })}
            </div>

            {/* Appendices & CTA */}
            <section className="relative py-32 px-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-serif mb-16 text-center text-andean-gold">{content.appendices.title}</h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        {content.appendices.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="text-center p-10 bg-white/5 rounded-2xl border border-white/5 hover:border-andean-gold/30 hover:bg-white/10 transition-all"
                            >
                                <Search className="w-10 h-10 text-gray-400 mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center bg-andean-gold rounded-3xl p-12 md:p-24 text-black relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                        <h2 className="text-5xl md:text-7xl font-serif mb-8 relative z-10">{content.conclusion.title}</h2>
                        <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-80 relative z-10">
                            {content.conclusion.content}
                        </p>
                        <div className="relative z-10 flex justify-center">
                            <MagneticButton
                                onClick={() => navigate('/checkout', { state: { product: 'The Andean Scroll (Ebook)', price: 8, productId: 'ebook' } })}
                            >
                                <div className="px-12 py-6 bg-black text-white text-xl font-bold rounded-full hover:scale-105 transition-transform shadow-2xl flex items-center gap-4">
                                    <ShoppingBag className="w-6 h-6" />
                                    Get the Complete Guide - 8€
                                </div>
                            </MagneticButton>
                        </div>
                        <button
                            onClick={() => setShowBundlePreview(true)}
                            className="relative z-10 mt-6 text-sm text-black/60 hover:text-black transition-colors underline underline-offset-4 font-bold"
                        >
                            Preview the guide
                        </button>
                    </div>
                </div>
            </section>

            {/* NEW: FAQ SECTION */}
            <FAQSection
                title="E-Book Details"
                items={content.faq || []} // Fallback to content.faq if translation not found
                className="bg-black border-t border-white/10"
            />

            <BundlePreviewModal
                isOpen={showBundlePreview}
                onClose={() => setShowBundlePreview(false)}
                initialTab="book"
                customTitle={t.ebook.nav.title}
                allowedTabs={['book']}
            />

        </div >
    );
};

// Sub-component for individual chapters
const ChapterSection = React.memo(({ chapter, index, Icon }: { chapter: any, index: number, Icon: any }) => {
    return (
        <section className="min-h-screen sticky top-0 flex items-center justify-center p-6 border-b border-white/5 bg-slate-950/95 backdrop-blur-sm overflow-hidden will-change-transform shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
            <div className="absolute right-0 top-0 text-[12rem] md:text-[20rem] font-bold text-white/5 pointer-events-none select-none -translate-y-1/2 translate-x-1/4">
                {index + 1}
            </div>

            <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center relative z-10"
            >
                <div className={`${index % 2 === 1 ? 'md:order-last' : ''}`}>
                    <div className="flex items-center gap-4 mb-6 text-andean-gold">
                        <Icon size={32} />
                        <span className="text-sm uppercase tracking-widest">Chapter {index + 1}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{chapter.title.split(':')[1] || chapter.title}</h2>
                    <h3 className="text-xl text-gray-400 italic mb-8 border-l-2 border-andean-gold pl-4">{chapter.subtitle}</h3>
                    <p className="text-lg md:text-xl text-gray-300 leading-loose">
                        {chapter.description}
                    </p>
                </div>

                {/* 3D Card Effect for Chapter Visual */}
                <motion.div
                    whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 2 : -2 }}
                    className="aspect-[4/5] rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-2 shadow-2xl backdrop-blur-xl"
                >
                    <div className="w-full h-full bg-black/40 rounded overflow-hidden relative">
                        <img
                            src={`https://picsum.photos/seed/cusco${index}/800/1000`}
                            alt={chapter.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 will-change-transform"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                            <div className="text-white font-mono text-sm opacity-60">FIG. 0{index + 1}</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
});

export default EbookLandingPage;
