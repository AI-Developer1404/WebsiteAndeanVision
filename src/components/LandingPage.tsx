import React from 'react';
import HeroSection from './HeroSection';
import AudioPlayer from './AudioPlayer';
import ValueStack from './ValueStack';
import ReviewsCarousel from './ReviewsCarousel';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    // Add scroll to purchase function if needed, or pass it down
    // Ideally we might want a "buy" function or link.
    // The HeroSection has the CTA. We need to make sure the CTA navigates to /checkout

    // Actually, let's keep it simple. HeroSection probably handled scroll before, 
    // but now it should navigate to /checkout. 
    // We'll need to update HeroSection to use Link or useNavigate, 
    // BUT we can't change HeroSection until we have Router context.
    // For now, let's just move the big blocks here.

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-900 via-slate-950 to-black text-white font-sans selection:bg-andean-gold selection:text-black">
            <HeroSection />

            {/* Audio Hook Section */}
            <section className="relative z-20 -mt-20 px-4 pb-20 flex justify-center">
                <AudioPlayer />
            </section>

            <ValueStack />

            <ReviewsCarousel />

            <Footer />
        </main>
    );
};

export default LandingPage;
