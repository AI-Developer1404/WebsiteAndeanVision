import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Map, Search, Mountain, Crown, Calendar, Users, ShoppingBag, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ebookContent } from '../data/ebookContent';
import LazyBackgroundVideo from './LazyBackgroundVideo';
import MagneticButton from './MagneticButton';
import FAQSection from './FAQSection';

const EbookLandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { language, t } = useLanguage();
    const content = ebookContent[language];
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const icons = [Mountain, Map, Crown, Users, Mountain, Calendar, Users];

    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const spreads = [
        { id: 1, title: "Detailed Typography", image: "/first.png", desc: "Optimized for readability on all devices." },
        { id: 2, title: "Exclusive Imagery", image: "/second.png", desc: "We use our own exclusive imagery." },
        { id: 3, title: "Local Insight", image: "/third.png", desc: "Written by a Cusco native sharing extensive local knowledge and hidden stories." },
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % spreads.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + spreads.length) % spreads.length);

    return (
        <div ref={containerRef} className="relative bg-gradient-to-b from-blue-900 via-slate-950 to-black text-andean-cream font-sans selection:bg-andean-gold selection:text-neutral-950 overflow-x-hidden">

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-andean-gold origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <LazyBackgroundVideo
                        src="/background ebook page.mp4"
                        poster=""
                        priority={true}
                        className="w-full h-full object-cover opacity-80 absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 text-center max-w-5xl px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "0.1em" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-andean-gold text-sm md:text-xl uppercase tracking-[0.3em] font-light mb-8"
                    >
                        The Interactive Guide
                    </motion.div>
                    <h1 className="text-6xl md:text-9xl font-serif text-white mb-6 drop-shadow-2xl">
                        {content.title}
                    </h1>
                    <p className="text-xl md:text-3xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                        {content.subtitle}
                    </p>

                    <div className="mt-8 flex justify-center">
                        <MagneticButton
                            onClick={() => navigate('/checkout', { state: { product: 'The Andean Scroll (Ebook)', price: 8, productId: 'ebook' } })}
                        >
                            <div className="px-10 py-5 bg-gradient-to-r from-andean-gold to-yellow-600 text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all flex items-center gap-3">
                                <ShoppingBag size={20} />
                                <span>Get the Guide - 8€</span>
                            </div>
                        </MagneticButton>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <ArrowDown size={32} />
                </motion.div>
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
            <section className="py-24 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
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
                        <button
                            onClick={prevSlide}
                            className="bg-white/5 hover:bg-white/10 p-4 rounded-full border border-white/10 transition-colors"
                        >
                            <ChevronLeft size={24} className="text-white" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-white/5 hover:bg-white/10 p-4 rounded-full border border-white/10 transition-colors"
                        >
                            <ChevronRight size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                <div className="relative w-full max-w-[1400px] mx-auto px-6">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-8"
                            animate={{ x: `-${currentSlide * 350}px` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            {spreads.map((spread) => (
                                <motion.div
                                    key={spread.id}
                                    className="min-w-[300px] md:min-w-[400px] bg-neutral-800 rounded-lg overflow-hidden border border-white/10 relative group"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="aspect-[3/4] overflow-hidden">
                                        <img src={spread.image} alt={spread.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="p-6 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                                        <h3 className="text-xl font-serif text-white mb-2">{spread.title}</h3>
                                        <p className="text-gray-400 text-sm">{spread.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="py-24 bg-black relative">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-andean-gold font-mono text-sm tracking-widest mb-4 flex items-center gap-2">
                            <Map size={16} />
                            {t.ebook.blueprint.title}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            {t.ebook.blueprint.text}
                        </h2>
                        <div className="space-y-6 text-gray-400 leading-relaxed">
                            <p>
                                Beyond the tourist trails lay the ceques—sacred invisible lines radiating from Cusco.
                                We have mapped the most energetically powerful sites mentioned in the guide.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-andean-gold" />
                                    <span>Sacsayhuamán’s Solar Alignment</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-andean-gold" />
                                    <span>The Moray Agricultural Terraces</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-andean-gold" />
                                    <span>Ollantaytambo’s Wind Gate</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="relative w-full aspect-[16/9] border border-white/10 rounded-2xl bg-neutral-900 overflow-hidden group">
                        {/* Background Image */}
                        <img
                            src="/interactive.png"
                            alt="The Inca Blueprint Map"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-110"
                        />
                        {/* Overlay Gradient for Text Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </section>

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
                    </div>
                </div>
            </section>

            {/* NEW: FAQ SECTION */}
            <FAQSection
                title="E-Book Details"
                items={[
                    { question: "Can I read this on my Kindle?", answer: "Yes! We provide a PDF version that works perfectly on Kindle, iPad, and all tablets. It is optimized for both color and black & white screens." },
                    { question: "Is it a physical book?", answer: "This is a digital-only guide. This allows us to include interactive links, high-resolution zoomable maps, and instant delivery to your email." },
                    { question: "Do I need internet to read it?", answer: "No. Once downloaded, the PDF is yours to keep and access offline, perfect for remote areas in the Sacred Valley." }
                ]}
                className="bg-neutral-950 border-t border-white/5"
            />
        </div>
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
                            src={`https://source.unsplash.com/random/800x1000?cusco,inca,ruins,sig=${index}&q=60&auto=format`}
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
