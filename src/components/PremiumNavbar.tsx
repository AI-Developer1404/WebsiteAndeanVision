import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Music, BookOpen, ShoppingBag, Home, Palette, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PremiumNavbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll effect for shrinking navbar
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
        { path: '/art', label: language === 'en' ? 'Art' : 'Arte', icon: Palette },
        { path: '/about', label: language === 'en' ? 'Creator' : 'Creador', icon: User },
    ];

    return (
        <>
            {/* Floating Desktop & Mobile Fixed Bar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0, paddingTop: isScrolled ? '1rem' : '2rem' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    style={{
                        width: isScrolled ? 600 : 700,
                        maxWidth: '95%',
                        backgroundColor: isScrolled ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
                        gap: isScrolled ? '1rem' : '2rem'
                    }}
                    className="pointer-events-auto relative flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl"
                >

                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                        <span className="font-serif font-bold text-xl text-white tracking-tighter group-hover:text-andean-gold transition-colors">
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
                                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${isActive ? 'text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-active"
                                                className="absolute inset-0 bg-white rounded-full mix-blend-difference"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 mix-blend-exclusion">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors group"
                            aria-label="Toggle Language"
                        >
                            <Globe size={18} className={`transition-transform duration-500 ${language === 'es' ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                            onClick={() => navigate('/checkout')}
                            className={`
                                hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                                bg-andean-gold text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]
                            `}
                        >
                            <ShoppingBag size={14} />
                            <span>Bundle 12€</span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-black/90 md:hidden flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                                >
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `
                                            text-5xl font-serif font-light tracking-wide transition-all duration-300
                                            ${isActive ? 'text-andean-gold scale-110' : 'text-white/60 hover:text-white'}
                                        `}
                                    >
                                        {item.label}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <button
                                    onClick={() => {
                                        navigate('/checkout');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-andean-gold text-black rounded-full font-bold text-xl mt-8 shadow-xl hover:scale-105 transition-transform"
                                >
                                    <ShoppingBag />
                                    Buy Bundle - $12
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PremiumNavbar;
