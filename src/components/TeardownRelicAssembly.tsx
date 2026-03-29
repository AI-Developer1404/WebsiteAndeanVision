import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import MagneticButton from './MagneticButton';
import { ShoppingBag } from 'lucide-react';

interface TeardownRelicAssemblyProps {
  frameCount?: number;
  folderPath?: string;
  filePrefix?: string;
  fileExtension?: string;
  zeroPad?: number;
  visualScale?: number; // Added to control overall animation size
}

const TeardownRelicAssembly: React.FC<TeardownRelicAssemblyProps> = ({
  frameCount = 112,
  folderPath = '/digital-souvenir-scroll',
  filePrefix = 'ezgif-frame-',
  fileExtension = 'png',
  zeroPad = 3,
  visualScale = 0.7 // Default to 30% reduction as requested
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language } = useLanguage();
  const t = translations[language].teardown;
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 1. SCROLL TRACKING
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map 0 -> 1 scroll to 0 -> frameCount-1 index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  
  // UI Reveal thresholds
  const [isUIVisible, setIsUIVisible] = useState(false);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsUIVisible(latest > 0.85); // Delayed slightly for cleaner impact
  });

  // 2. PRELOAD PHASE
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const paddedIndex = (i + 1).toString().padStart(zeroPad, '0');
        img.src = `${folderPath}/${filePrefix}${paddedIndex}.${fileExtension}`;
        
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setLoaded(true);
            }
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) setLoaded(true);
        };
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, folderPath, filePrefix, fileExtension, zeroPad]);

  // 3. RENDER PHASE
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || !images[index]) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];

    // Handle Retina / High DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Clear
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Manual Object-Fit with additional visualScale
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    
    let baseWidth, baseHeight;
    
    if (imgRatio > canvasRatio) {
        baseWidth = rect.width;
        baseHeight = rect.width / imgRatio;
    } else {
        baseHeight = rect.height;
        baseWidth = rect.height * imgRatio;
    }

    // Apply the visualScale (reducing overall asset size)
    const drawWidth = baseWidth * visualScale;
    const drawHeight = baseHeight * visualScale;
    const offsetX = (rect.width - drawWidth) / 2;
    const offsetY = (rect.height - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Update on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
        requestAnimationFrame(() => drawFrame(Math.floor(latest)));
    }
  });

  // Initial draw and resize
  useEffect(() => {
    if (loaded) {
        requestAnimationFrame(() => drawFrame(Math.floor(frameIndex.get())));
    }
    
    const handleResize = () => {
        if (loaded) {
            requestAnimationFrame(() => drawFrame(Math.floor(frameIndex.get())));
        }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#050505] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Deep Void Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-amber-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
        </div>

        {/* The Action Canvas */}
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none z-0"
          style={{ width: '100vw', height: '100vh' }}
        />

        {/* Loading State Overlay */}
        <AnimatePresence>
          {!loaded && (
            <motion.div 
               initial={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 flex items-center justify-center bg-black z-50"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-[1px] bg-amber-500/30 animate-pulse" />
                <div className="text-amber-500 font-mono tracking-[0.3em] text-[10px] uppercase">
                  Engaging Relic Synthesis...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* UI OVERLAY LAYER - Manual Positioning for pinpoint accuracy */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <AnimatePresence>
            {isUIVisible && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                {/* 
                   Positioning logic: Using percentage-based top/left to "dock" near the assets. 
                   These values are calibrated for a centered canvas with visualScale = 0.7 
                */}

                {/* Layer 03: Art Collection - Top Center */}
                <LabelCard 
                  layer="03" 
                  title={t.artTitle} 
                  desc={t.printsDesc}
                  side="left"
                  className="absolute top-[18%] left-[5%] md:left-[15%]"
                />

                {/* Layer 02: Record Core - Middle Right */}
                <LabelCard 
                  layer="02" 
                  title={t.soundTitle} 
                  desc={t.recordDesc}
                  side="right"
                  className="absolute top-[38%] right-[5%] md:right-[15%]"
                />

                {/* Layer 01: Ebook Scroll - Middle Left */}
                <LabelCard 
                  layer="01" 
                  title={t.ebookTitle} 
                  desc={t.ebookDesc}
                  side="left"
                  className="absolute top-[52%] left-[4%] md:left-[14%]"
                />

                {/* Base: Master Core - Bottom Right */}
                <LabelCard 
                  layer="BASE" 
                  title={t.bundleTitle} 
                  desc="The Master Relic Core"
                  side="right"
                  className="absolute top-[68%] right-[8%] md:right-[20%]"
                />

                {/* Main CTA - Bottom Pinned */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-[6%] left-1/2 -translate-x-1/2 pointer-events-auto"
                >
                  <MagneticButton>
                    <button className="px-10 py-4 bg-amber-500 text-black font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                        <ShoppingBag size={15} />
                        {t.cta}
                    </button>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

// Sub-component for the Glassmorphism Label Cards
const LabelCard = ({ layer, title, desc, side, className }: { 
    layer: string, 
    title: string, 
    desc: string, 
    side: 'left' | 'right',
    className?: string 
}) => (
    <motion.div 
        initial={{ x: side === 'left' ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 md:gap-4 pointer-events-auto ${side === 'right' ? 'flex-row-reverse text-right' : 'text-left'} ${className}`}
    >
        <div className="w-6 md:w-12 h-[1px] bg-amber-500/40 shrink-0" />
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.1] rounded-xl p-4 md:p-5 shadow-2xl max-w-[200px] md:max-w-[280px]">
            <div className="text-amber-500 font-mono text-[8px] tracking-[0.2em] mb-1.5 opacity-80 uppercase">LAYER {layer}</div>
            <div className="text-white text-sm md:text-base font-serif uppercase tracking-wider mb-1 leading-tight">{title}</div>
            <div className="text-white/40 text-[9px] md:text-[10px] leading-relaxed font-sans">{desc}</div>
        </div>
    </motion.div>
);


export default TeardownRelicAssembly;
