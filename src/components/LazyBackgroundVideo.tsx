import React, { useRef, useEffect, useState } from 'react';

interface LazyBackgroundVideoProps {
    src: string;
    poster: string;
    className?: string;
    children?: React.ReactNode;
    priority?: boolean;
}

const LazyBackgroundVideo: React.FC<LazyBackgroundVideoProps> = ({ src, poster, className, children, priority = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(priority); // If priority is true, load immediately

    useEffect(() => {
        if (priority) return; // Skip observer if priority is set

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    // Start playing if loaded and in view
                    if (videoRef.current && videoRef.current.readyState >= 3) {
                        videoRef.current.play().catch(() => { });
                    }
                } else {
                    // Optional: Pause when out of view to save resources
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            },
            { rootMargin: '200px' } // Load when within 200px of viewport
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay={shouldLoad}
            loop
            muted
            playsInline
            poster={poster} // Always show poster immediately
            className={className}
        >
            {shouldLoad && <source src={src} type="video/mp4" />}
            {children}
            Your browser does not support the video tag.
        </video>
    );
};

export default LazyBackgroundVideo;
