import React from 'react';
import { motion } from 'framer-motion';
import { Music, BookOpen, ChefHat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ValueStack: React.FC = () => {
    const { t } = useLanguage();

    const items = [
        {
            icon: <Music className="w-8 h-8 text-andean-terracotta" />,
            title: t.bundle.masterAlbum.title,
            description: t.bundle.masterAlbum.desc,
            delay: 0.1
        },
        {
            icon: <BookOpen className="w-8 h-8 text-andean-terracotta" />,
            title: t.bundle.instrumentGuide.title,
            description: t.bundle.instrumentGuide.desc,
            delay: 0.2
        },
        {
            icon: <ChefHat className="w-8 h-8 text-andean-terracotta" />,
            title: t.bundle.cookbook.title,
            description: (
                <div className="space-y-2">
                    <p>{t.bundle.cookbook.desc}</p>
                    <ul className="text-xs md:text-sm font-medium text-andean-slate/70 list-disc ml-4 space-y-1">
                        {Object.values(t.recipes).map((recipe, i) => (
                            <li key={i}>{recipe}</li>
                        ))}
                    </ul>
                </div>
            ),
            delay: 0.3
        }
    ];

    return (
        <section className="relative py-24 px-4 overflow-hidden bg-andean-cream/30">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50" />

            <div className="relative max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-andean-slate mb-4 tracking-tight">{t.bundle.title}</h2>
                    <div className="h-1.5 w-24 bg-andean-gold/50 mx-auto rounded-full" />
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: item.delay }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-300"
                        >
                            {/* Hover Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-andean-gold/0 to-andean-terracotta/0 opacity-0 group-hover:from-andean-gold/10 group-hover:to-andean-terracotta/10 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="mb-6 p-4 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-andean-slate mb-3">{item.title}</h3>
                                <div className="text-andean-slate/70 leading-relaxed text-sm md:text-base">
                                    {item.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueStack;
