import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Music, BookOpen, ShoppingBag, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/music', label: language === 'en' ? 'Music' : 'Música', icon: Music },
        { path: '/cusco-book', label: language === 'en' ? 'Book' : 'Libro', icon: BookOpen },
    ];

    return (
        <>
            {/* Desktop & Mobile Fixed Top Bar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none transition-all duration-500 ${isScrolled ? 'pt-4' : 'pt-8'}`}
            >
                <div className={`pointer-events-auto relative flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${isScrolled ? 'bg-black/60 w-[95%] md:w-auto gap-8' : 'bg-black/40 w-[90%] md:w-auto gap-12'}`}>

                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-xl text-white tracking-tighter">
                            ANDEAN<span className="text-andean-gold">.</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${isActive ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-300 hover:text-white hover:bg-white/10'}
                                `}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors group"
                            aria-label="Toggle Language"
                        >
                            <Globe size={18} className={`transition-transform duration-500 ${language === 'es' ? 'rotate-180' : ''}`} />
                        </button>

                        <NavLink
                            to="/checkout"
                            className={({ isActive }) => `
                                hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                                ${isActive ? 'bg-andean-gold text-black shadow-lg' : 'bg-andean-gold/90 text-black hover:bg-andean-gold hover:scale-105'}
                            `}
                        >
                            <ShoppingBag size={16} />
                            <span>$12</span>
                        </NavLink>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/90 md:hidden flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                >
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `
                                            text-4xl font-serif font-light tracking-wide transition-colors
                                            ${isActive ? 'text-andean-gold' : 'text-white/80'}
                                        `}
                                    >
                                        {item.label}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <NavLink
                                    to="/checkout"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-andean-gold text-black rounded-full font-bold text-xl mt-4"
                                >
                                    <ShoppingBag />
                                    Buy Bundle - $12
                                </NavLink>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
