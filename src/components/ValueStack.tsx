import React from 'react';
import { motion } from 'framer-motion';
import { Music, BookOpen, Palette, CheckCircle2 } from 'lucide-react';
const ValueStack: React.FC = () => {

    const items = [
        {
            icon: <Music className="w-8 h-8 text-andean-gold" />,
            title: "Original Syllabus Album",
            subtitle: "12 High-Fidelity Tracks",
            description: "A sonic journey through the Andes. Includes MP3 & FLAC formats.",
            delay: 0.1
        },
        {
            icon: <BookOpen className="w-8 h-8 text-andean-gold" />,
            title: "The Andean Scroll",
            subtitle: "Interactive Ebook",
            description: "Deep dive into the history, culture, and stories of the Incas.",
            delay: 0.2
        },
        {
            icon: <Palette className="w-8 h-8 text-andean-gold" />,
            title: "Cinematic Art Collection",
            subtitle: "6 High-Res Prints",
            description: "Curated photography from Cusco, ready for large-format printing.",
            delay: 0.3
        }
    ];

    return (
        <section className="relative py-32 px-4 overflow-hidden bg-transparent">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-50" />

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-andean-gold text-sm uppercase tracking-[0.3em] font-mono">The Complete Package</span>
                    <h2 className="mt-4 text-4xl md:text-6xl font-serif font-bold text-white mb-6">The Digital Souvenir</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Everything you need to bring the magic of the Andes into your home. One simple download.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: item.delay }}
                            whileHover={{ y: -8 }}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-andean-gold/30 transition-all duration-500"
                        >
                            <div className="mb-6 w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center group-hover:scale-110 group-hover:text-white transition-all duration-300 border border-white/5 group-hover:border-andean-gold/50 shadow-2xl">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-andean-gold transition-colors">{item.title}</h3>
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-mono">{item.subtitle}</p>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {item.description}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-andean-gold/70">
                                <CheckCircle2 size={14} />
                                <span>Included</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueStack;
