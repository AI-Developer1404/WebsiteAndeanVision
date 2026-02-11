import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title?: string;
    items: FAQItem[];
    className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ title = "Frequently Asked Questions", items, className = "" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className={`py-20 px-6 ${className}`}>
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif mb-12 text-center text-white">{title}</h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg md:text-xl font-medium text-gray-200 pr-8">{item.question}</span>
                                <span className="text-andean-gold shrink-0">
                                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
