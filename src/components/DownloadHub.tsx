import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Home } from 'lucide-react';
// import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

// We'll use a dynamic import or a try-catch for confetti to avoid build breaking if not installed yet.
// However, since we are writing standard code, we should assume the dependency will be present.
// For now, I'll use a require or just the import assuming the user fixes the install.
// But to be safe and let the app run even if install failed, I might wrap it.
// Actually, strict Typescript will fail on the import if types aren't found.
// Let's use a standard import but I'll add a comment that it requires the package.
import confetti from 'canvas-confetti';

const DownloadHub: React.FC = () => {
    const { t, language } = useLanguage();

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const cards = [
        {
            icon: <Download className="w-10 h-10 text-andean-gold" />,
            title: t.download.cards.album.title,
            description: "High Quality MP3",
            actions: [
                {
                    label: t.download.cards.album.button,
                    primary: true,
                    onClick: () => window.location.href = '/andean-sounds-full.zip'
                }
            ],
            primary: true,
            delay: 0.1
        },
        {
            icon: <BookOpen className="w-10 h-10 text-andean-terracotta" />,
            title: language === 'es' ? 'Guía y Recetario' : 'Guidebook & Cookbook',
            description: "Interactive Experience & Print Ready",
            actions: [
                {
                    label: "Read Guidebook (English)",
                    primary: true,
                    onClick: () => window.location.href = '/ebook?lang=en'
                },
                {
                    label: "Leer la Guía (Español)",
                    primary: false,
                    onClick: () => window.location.href = '/ebook?lang=es'
                },
                {
                    label: "Download PDF (EN)",
                    primary: false,
                    onClick: () => window.open('/ebook-en.pdf', '_blank')
                },
                {
                    label: "Descargar PDF (ES)",
                    primary: false,
                    onClick: () => window.open('/ebook-es.pdf', '_blank')
                }
            ],
            primary: false,
            delay: 0.2
        }

    ];

    return (
        <div className="min-h-screen bg-andean-cream text-andean-slate p-6 selection:bg-andean-gold">
            <div className="max-w-4xl mx-auto pt-10 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-andean-terracotta mb-4">{t.download.header}</h1>
                    <p className="text-xl text-andean-slate/80">{t.download.subhead}</p>
                    <p className="text-sm text-andean-slate/50 mt-2">{t.download.emailSent}</p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: card.delay }}
                            className={`
                                relative p-8 rounded-2xl flex flex-col items-center text-center gap-6 
                                ${card.primary
                                    ? 'bg-andean-slate text-white shadow-2xl lg:col-span-1 lg:scale-105 z-10'
                                    : 'bg-white shadow-lg border border-andean-slate/10'}
                            `}
                        >
                            <div className={`p-4 rounded-full ${card.primary ? 'bg-white/10' : 'bg-andean-cream'}`}>
                                {card.icon}
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${card.primary ? 'text-andean-gold' : 'text-andean-slate'}`}>
                                    {card.title}
                                </h3>
                                <p className={`text-sm mt-1 ${card.primary ? 'text-white/60' : 'text-andean-slate/60'}`}>{card.description}</p>
                            </div>

                            <div className="w-full flex flex-col gap-3 mt-auto">
                                {card.actions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={action.onClick}
                                        className={`
                                            w-full py-3 px-6 rounded-xl font-bold transition-all text-sm
                                            ${action.primary
                                                ? (card.primary ? 'bg-andean-gold text-andean-slate hover:bg-white' : 'bg-andean-slate text-white hover:bg-andean-terracotta')
                                                : (card.primary ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-andean-slate/10 text-andean-slate hover:bg-andean-slate/20')}
                                        `}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <a href="/" className="inline-flex items-center gap-2 text-andean-slate/60 hover:text-andean-terracotta transition-colors">
                        <Home size={18} />
                        <span>{t.download.returnHome}</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default DownloadHub;
