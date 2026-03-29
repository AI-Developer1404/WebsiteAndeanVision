import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Music, BookOpen, Palette, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HoloCard = ({ item, includedText }: { item: any, includedText: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Calculate glare position based on cursor
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
    const background = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 60%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: item.delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="group relative h-full w-full"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full p-8 rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 transition-colors duration-500 overflow-hidden"
            >
                {/* Holographic Glare */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background }}
                />

                {/* Card Content floated forward */}
                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)" }}>
                    <div className="mb-6 w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center group-hover:scale-110 group-hover:text-white transition-all duration-300 border border-white/5 shadow-2xl">
                        {item.icon}
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-mono">{item.subtitle}</p>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                        {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-andean-gold/70 mt-auto">
                        <CheckCircle2 size={14} />
                        <span>{includedText}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ValueStack: React.FC = () => {
    const { t } = useLanguage();

    const items = [
        {
            icon: <Music className="w-8 h-8 text-andean-gold" />,
            title: t.valueStack.items.music.title,
            subtitle: t.valueStack.items.music.subtitle,
            description: t.valueStack.items.music.description,
            delay: 0.1
        },
        {
            icon: <BookOpen className="w-8 h-8 text-andean-gold" />,
            title: t.valueStack.items.book.title,
            subtitle: t.valueStack.items.book.subtitle,
            description: t.valueStack.items.book.description,
            delay: 0.2
        },
        {
            icon: <Palette className="w-8 h-8 text-andean-gold" />,
            title: t.valueStack.items.art.title,
            subtitle: t.valueStack.items.art.subtitle,
            description: t.valueStack.items.art.description,
            delay: 0.3
        }
    ];

    return (
        <section className="relative py-32 px-4 overflow-hidden bg-transparent">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-andean-gold text-sm uppercase tracking-[0.3em] font-mono">{t.valueStack.label}</span>
                    <h2 className="mt-4 text-4xl md:text-6xl font-serif font-bold text-white mb-6">{t.valueStack.title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        {t.valueStack.description}
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {items.map((item, index) => (
                        <HoloCard key={index} item={item} includedText={t.valueStack.included} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueStack;

