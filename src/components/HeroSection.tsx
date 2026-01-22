import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero.png';
import LazyBackgroundVideo from './LazyBackgroundVideo';
import { useLanguage } from '../context/LanguageContext';

const HeroSection: React.FC = () => {
    const { t, language } = useLanguage();

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Navbar removed - using global Navbar */}

            {/* Cinematic Video Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <LazyBackgroundVideo
                    src="/background.mp4"
                    poster={heroImage}
                    priority={true}
                    className="h-full w-full object-cover"
                />
                {/* Readability Overlay (Cinematic Vignette) */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-black/20 to-black/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-andean-gold to-transparent"
                />

                <motion.h1
                    key={`head-${language}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 text-5xl font-serif font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl"
                    dangerouslySetInnerHTML={{ __html: t.hero.headline }}
                />

                <motion.p
                    key={`sub-${language}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-10 max-w-2xl text-lg font-light tracking-wide text-gray-300 md:text-xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t.hero.subhead }}
                />

                <Link to="/checkout" className="group relative inline-flex items-center justify-center">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-andean-gold to-yellow-600 opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative rounded-full bg-black px-10 py-5 text-lg font-bold text-white ring-1 ring-white/10 transition-all group-hover:ring-andean-gold/50"
                    >
                        <span className="bg-gradient-to-r from-andean-gold to-white bg-clip-text text-transparent group-hover:text-white transition-colors">
                            {t.hero.cta}
                        </span>
                    </motion.button>
                </Link>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
            >
                <span className="text-sm">{t.hero.scroll}</span>
            </motion.div>
        </section>
    );
};

export default HeroSection;
