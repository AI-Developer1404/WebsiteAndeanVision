import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero.png';
import { useLanguage } from '../context/LanguageContext';

const HeroSection: React.FC = () => {
    const { t, language } = useLanguage();

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Navbar removed - using global Navbar */}

            {/* Cinematic Video Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={heroImage}
                    className="h-full w-full object-cover"
                >
                    <source src="/background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Readability Overlay (Cinematic Vignette) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-andean-cream">
                <motion.h1
                    key={`head-${language}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 text-4xl font-serif font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
                    dangerouslySetInnerHTML={{ __html: t.hero.headline }}
                />

                <motion.p
                    key={`sub-${language}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 max-w-lg text-lg font-sans font-light md:text-xl"
                    dangerouslySetInnerHTML={{ __html: t.hero.subhead }}
                />



                <Link to="/checkout" className="block">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full bg-andean-gold px-8 py-4 text-lg font-bold text-andean-slate shadow-lg transition-colors hover:bg-white"
                    >
                        {t.hero.cta}
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
