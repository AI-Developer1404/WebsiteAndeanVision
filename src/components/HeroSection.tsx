import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import BundlePreviewModal from './BundlePreviewModal';

const HeroSection: React.FC = () => {
    const { t, language } = useLanguage();
    const [showBundlePreview, setShowBundlePreview] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section 
            className="relative h-screen w-full overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
        >
            {/* Navbar removed - using global Navbar */}

            {/* Cinematic Video Background - MOVED TO GLOBAL BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Fallback pattern or nothing, as GlobalBackground handles the video */}
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="flex flex-col items-center justify-center"
                >
                    <motion.div
                        style={{ transform: "translateZ(80px)" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-andean-gold to-transparent"
                    />

                    <motion.h1
                        style={{ transform: "translateZ(120px)" }}
                        key={`head-${language}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 text-5xl font-serif font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl"
                        dangerouslySetInnerHTML={{ __html: t.hero.headline }}
                    />

                    <motion.p
                        style={{ transform: "translateZ(80px)" }}
                        key={`sub-${language}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-10 max-w-2xl text-lg font-light tracking-wide text-gray-300 md:text-xl leading-relaxed drop-shadow-xl"
                        dangerouslySetInnerHTML={{ __html: t.hero.subhead }}
                    />

                    <motion.div 
                        style={{ transform: "translateZ(100px)" }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Link to="/checkout" className="group relative inline-flex items-center justify-center">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-andean-gold to-yellow-600 opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative rounded-full bg-black px-10 py-5 text-lg font-bold text-white ring-1 ring-white/10 transition-all group-hover:ring-andean-gold/50 shadow-2xl"
                            >
                                <span className="bg-gradient-to-r from-andean-gold to-white bg-clip-text text-transparent group-hover:text-white transition-colors">
                                    {t.hero.cta}
                                </span>
                            </motion.button>
                        </Link>

                        <button
                            onClick={() => setShowBundlePreview(true)}
                            className="text-sm text-gray-400 hover:text-andean-gold transition-colors underline underline-offset-4"
                        >
                            What's included?
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
            >
                <span className="text-sm">{t.hero.scroll}</span>
            </motion.div>

            {/* Bundle Preview Modal */}
            <BundlePreviewModal
                isOpen={showBundlePreview}
                onClose={() => setShowBundlePreview(false)}
            />
        </section>
    );
};

export default HeroSection;
