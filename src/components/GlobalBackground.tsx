import React from 'react';
import { useLocation } from 'react-router-dom';
import LazyBackgroundVideo from './LazyBackgroundVideo';
import heroImage from '../assets/images/hero.png';

const GlobalBackground: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className={`fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${isHome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <LazyBackgroundVideo
                src="/background.mp4"
                poster={heroImage}
                priority={true}
                className="h-full w-full object-cover"
            />
            {/* Readability Overlay (Cinematic Vignette) - Persistent over video */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-black/20 to-black/90" />
        </div>
    );
};

export default GlobalBackground;
