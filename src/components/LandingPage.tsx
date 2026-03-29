import React from 'react';
import HeroSection from './HeroSection';
import AudioPlayer from './AudioPlayer';
import ValueStack from './ValueStack';
import TeardownRelicAssembly from './TeardownRelicAssembly';
import ReviewsCarousel from './ReviewsCarousel';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-900 via-slate-950 to-black text-white font-sans selection:bg-andean-gold selection:text-black">
            <HeroSection />

            {/* Audio Hook Section */}
            <section className="relative z-20 -mt-20 px-4 pb-20 flex justify-center">
                <AudioPlayer />
            </section>

            <ValueStack />

            {/* TEARDOWN RELIC ASSEMBLY */}
            <TeardownRelicAssembly />

            {/* REVIEWS SECTION */}
            <ReviewsCarousel />

            <Footer />
        </main>
    );
};

export default LandingPage;

