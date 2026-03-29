import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface EbookScrollMorphProps {
    frameCount?: number;
    folderPath?: string;
    filePrefix?: string;
    fileExtension?: string;
    children?: React.ReactNode;
}

const EbookScrollMorph: React.FC<EbookScrollMorphProps> = ({
    frameCount = 75,
    folderPath = '/ebook-morph',
    filePrefix = 'frame_',
    fileExtension = 'jpg',
    children
}) => {
    // containerRef sets the scrolling boundaries for the timeline
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Track scroll progress purely within this specific container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Map scroll progress (0.0 to 1.0) directly to our frame index (1 to frameCount)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // 1. PRELOAD PHASE: Load all images silently into memory so scrubbing has zero lag
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Formats number to 3 digits (e.g. 001, 025, 075)
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `${folderPath}/${filePrefix}${paddedIndex}.${fileExtension}`;
            
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [frameCount, folderPath, filePrefix, fileExtension]);

    // 2. RENDER PHASE: Draw the precise frame onto the canvas (Retina Optimized)
    const drawFrame = (index: number) => {
        if (!canvasRef.current || images.length === 0 || !images[index - 1]) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index - 1];

        // Container dimensions (CSS Pixels)
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // RETINA FIX: Multiply canvas internal resolution by device pixel ratio for maximum sharpness
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Normalize coordinate system back to CSS pixels
        ctx.resetTransform();
        ctx.scale(dpr, dpr);

        // Perform "object-fit: cover" math manually to ensure the image perfectly fills the CSS box
        const hRatio = rect.width / img.width;
        const vRatio = rect.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Cover strategy
        
        const centerShiftX = (rect.width - img.width * ratio) / 2;
        const centerShiftY = (rect.height - img.height * ratio) / 2;

        // Clear previous frame
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Draw image sharp without CSS blurs
        ctx.drawImage(
            img, 
            0, 0, img.width, img.height,
            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
        );
    };

    // 3. EVENT PHASE: Tie scroll changes to requestAnimationFrame for 60fps performance
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (loaded) {
            requestAnimationFrame(() => drawFrame(Math.floor(latest)));
        }
    });

    // Draw the very first frame as soon as all images finish loading
    useEffect(() => {
        if (loaded) {
            requestAnimationFrame(() => drawFrame(1));
        }
    }, [loaded]);

    // Ensure the canvas recalculates the cover math if the user resizes their browser window
    useEffect(() => {
        const handleResize = () => {
            if (loaded) {
                requestAnimationFrame(() => drawFrame(Math.floor(frameIndex.get())));
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [loaded, frameIndex]);

    return (
        // The container dictates how "long" the scroll animation lasts (300vh).
        <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0a0a0a] border-t border-white/5">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center py-24">
                
                {/* 
                    NEW LAYOUT: Contained & Centered 
                    The animation is no longer a background, but a distinct showcase box 
                    positioned alongside the text inside a max-w-7xl modern grid.
                */}
                <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* TEXT CONTENT (Left Side) */}
                    {children && (
                        <div className="w-full lg:w-5/12 z-20 flex flex-col justify-center">
                            {children}
                        </div>
                    )}

                    {/* CANVAS SHOWCASE (Right Side) */}
                    <div className="w-full lg:w-7/12 aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black group">
                        
                        {/* 
                            Retina Canvas: 
                            Still uses scale-105 to push watermarks out of frame.
                            No more blur! True 1:1 pixel rendering. 
                        */}
                        <canvas 
                            ref={canvasRef}
                            className="w-full h-full scale-105 origin-center transform-gpu"
                            style={{ width: '100%', height: '100%' }}
                        />

                        {/* Loading State Overlay */}
                        {!loaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-20 transition-opacity duration-500">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-8 h-8 rounded-full border-t-2 border-l-2 border-andean-gold animate-spin" />
                                    <div className="text-andean-gold font-mono tracking-widest text-xs uppercase">
                                        Loading Relic Frames...
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Subtle inner premium glow */}
                        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EbookScrollMorph;
