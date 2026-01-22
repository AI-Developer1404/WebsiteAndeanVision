import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Map, Search, Mountain, Crown, Calendar, Users, ShoppingBag, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ebookContent } from '../data/ebookContent';
import LazyBackgroundVideo from './LazyBackgroundVideo';

const EbookLandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
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

    return (
        <div ref={containerRef} className="relative bg-gradient-to-b from-blue-900 via-slate-950 to-black text-andean-cream font-sans selection:bg-andean-gold selection:text-neutral-950">

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

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/checkout', { state: { product: 'The Andean Scroll (Ebook)', price: 8, productId: 'ebook' } })}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-andean-gold to-yellow-600 text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center gap-3 mx-auto"
                    >
                        <ShoppingBag size={20} />
                        <span>Get the Guide - 8€</span>
                    </motion.button>
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
                        <button
                            onClick={() => navigate('/checkout', { state: { product: 'The Andean Scroll (Ebook)', price: 8, productId: 'ebook' } })}
                            className="relative z-10 px-12 py-6 bg-black text-white text-xl font-bold rounded-full hover:scale-105 transition-transform shadow-2xl flex items-center gap-4 mx-auto"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            Get the Complete Guide - 8€
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Sub-component for individual chapters to handle useScroll separately if needed, 
// though here we use simple layout with motion
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
