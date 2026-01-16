import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ReviewsCarousel: React.FC = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
        { id: 'sarah', name: "Sarah, USA", rating: 5 },
        { id: 'carlos', name: "Carlos, España", rating: 5 },
        { id: 'elena', name: "Elena, Brazil", rating: 5 },
        { id: 'mark', name: "Mark, UK", rating: 5 },
    ];

    // Number of items visible based on screen width (simplified logic for logic's sake, 
    // in real responsiveness we might use `window.matchMedia` or CSS grid, 
    // but here we'll do a simple carousel that shows 1 item at a time for simplicity 
    // or a sliding window if we want to get fancy. 
    // The requirements said: Mobile 1, Tablet 2, Desktop 3.
    // To do this cleanly with framer-motion in a short amount of time, 
    // I will implement a responsive grid that shows a slice of the array, 
    // but managing the index state for different breakpoints is complex without a resize listener.
    // I'll stick to a robust simpler version: A slider that shows 1 card on mobile/tablet 
    // and maybe more if space, but properly implemented as a single-card slider is safest for mobile-first.
    // actually, let's try to do the "window" approach for desktop.)

    // For simplicity and robustness in this turn-based env, I'll implement a single-card slider
    // that looks great on all devices, but on wide screens it's centered. 
    // IF I strictly follow "visible: 1 on mobile, 2 tablet, 3 desktop", I need window width state.
    // I'll add a simple width check.

    const [visibleItems, setVisibleItems] = useState(1);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setVisibleItems(3);
            else if (window.innerWidth >= 640) setVisibleItems(2);
            else setVisibleItems(1);
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    // Helper to get the chunk of reviews to display
    // We need to wrap around.
    const getVisibleReviews = () => {
        const items = [];
        for (let i = 0; i < visibleItems; i++) {
            const index = (currentIndex + i) % reviews.length;
            items.push(reviews[index]);
        }
        return items;
    };

    return (
        <section className="py-20 px-4 bg-andean-cream text-andean-slate overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-12 text-andean-terracotta tracking-tight">
                    Community Stories
                </h2>

                <div className="relative flex items-center justify-center gap-4">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white shadow-lg text-andean-slate hover:text-andean-terracotta transition-colors z-10"
                        aria-label="Previous Review"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex-1 overflow-hidden">
                        <div className="flex justify-center gap-6">
                            <AnimatePresence mode='popLayout'>
                                {getVisibleReviews().map((review) => (
                                    <motion.div
                                        key={`${review.id}-${currentIndex}`} // Unique key to trigger animation
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }} // Exit animation might conflict with popLayout in grid, careful
                                        transition={{ duration: 0.5 }}
                                        className="flex-1 min-w-[280px] max-w-sm p-6 rounded-2xl bg-white shadow-xl border border-andean-slate/5"
                                    >
                                        <div className="flex gap-1 mb-4 text-andean-gold">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} size={16} fill="currentColor" />
                                            ))}
                                        </div>
                                        <blockquote className="text-lg italic text-andean-slate/80 mb-6 min-h-[80px]">
                                            "{t.reviews[review.id as keyof typeof t.reviews]}"
                                        </blockquote>
                                        <div className="font-bold text-andean-terracotta pointer-events-none">
                                            — {review.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white shadow-lg text-andean-slate hover:text-andean-terracotta transition-colors z-10"
                        aria-label="Next Review"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
