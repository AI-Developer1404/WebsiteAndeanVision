import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const DigitalRelicExplosion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ========== ANIMATION LOGIC ==========
  
  // Title (fades in slightly or just stays visible at start, maybe fades out eventually?)
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.5, 0.6], [0, 1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.1], [20, 0]);

  // 1. Bundle Box (Center)
  const boxScale = useTransform(smoothProgress, [0, 0.6], [1, 0.8]);
  const boxOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.4]);

  // 2. E-book Cover (Top Left)
  const ebookX = useTransform(smoothProgress, [0, 0.6], ['0%', '-130%']);
  const ebookY = useTransform(smoothProgress, [0, 0.6], ['0%', '-80%']);
  const ebookScale = useTransform(smoothProgress, [0, 0.6], [0.5, 1]);
  const ebookOpacity = useTransform(smoothProgress, [0, 0.2, 0.6], [0, 1, 1]);
  const ebookRotate = useTransform(smoothProgress, [0, 0.6], [0, -12]);

  // 3. Audio Record (Top Right)
  const audioX = useTransform(smoothProgress, [0, 0.6], ['0%', '130%']);
  const audioY = useTransform(smoothProgress, [0, 0.6], ['0%', '-50%']);
  const audioScale = useTransform(smoothProgress, [0, 0.6], [0.5, 1]);
  const audioOpacity = useTransform(smoothProgress, [0, 0.2, 0.6], [0, 1, 1]);
  const audioRotate = useTransform(smoothProgress, [0, 0.6], [0, 15]);

  // 4. Art Prints (Bottom Center/Right)
  const artX = useTransform(smoothProgress, [0, 0.6], ['0%', '60%']);
  const artY = useTransform(smoothProgress, [0, 0.6], ['0%', '90%']);
  const artScale = useTransform(smoothProgress, [0, 0.6], [0.5, 1]);
  const artOpacity = useTransform(smoothProgress, [0, 0.2, 0.6], [0, 1, 1]);
  const artRotate = useTransform(smoothProgress, [0, 0.6], [0, 6]);

  // Text Reveal Phase (0.6 -> 0.8)
  const labelsOpacity = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);
  const ctaOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.7, 0.9], [20, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[300vh] bg-[#050505] w-full"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Glowing Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-amber-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] bg-amber-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
        </div>

        {/* Title */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-[15%] z-20 text-center px-4"
        >
          <div className="text-amber-500/80 font-mono text-xs md:text-sm tracking-[0.2em] mb-3 uppercase">Exquisite Artifacts</div>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">The Digital Collection</h2>
        </motion.div>

        {/* Central Relative Container for absolute stacking */}
        <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center pointer-events-none">
          
          {/* 2. E-book */}
          <motion.div
            style={{ 
              x: ebookX, 
              y: ebookY, 
              scale: ebookScale, 
              opacity: ebookOpacity, 
              rotate: ebookRotate 
            }}
            className="absolute z-0 flex flex-col items-center"
          >
            <img 
              src="/relic-assets/ebook-cover.png" 
              alt="E-book" 
              className="w-32 md:w-56 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
            <motion.div 
              style={{ opacity: labelsOpacity }}
               className="mt-6 text-center"
            >
              <h3 className="text-white font-medium text-lg md:text-xl">The Andean Scroll</h3>
              <p className="text-gray-400 text-sm md:text-base mt-1">Immersive E-book</p>
            </motion.div>
          </motion.div>

          {/* 3. Audio Record */}
          <motion.div
            style={{ 
              x: audioX, 
              y: audioY, 
              scale: audioScale, 
              opacity: audioOpacity, 
              rotate: audioRotate 
            }}
            className="absolute z-0 flex flex-col items-center"
          >
            <img 
              src="/relic-assets/audio-record.png" 
              alt="Audio Soundtrack" 
              className="w-36 md:w-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
            <motion.div 
              style={{ opacity: labelsOpacity }}
               className="mt-6 text-center"
            >
              <h3 className="text-white font-medium text-lg md:text-xl">Obsidian Vinyl</h3>
              <p className="text-gray-400 text-sm md:text-base mt-1">Spatial Audio</p>
            </motion.div>
          </motion.div>

          {/* 4. Art Prints */}
          <motion.div
            style={{ 
              x: artX, 
              y: artY, 
              scale: artScale, 
              opacity: artOpacity, 
              rotate: artRotate 
            }}
            className="absolute z-0 flex flex-col items-center"
          >
            <img 
              src="/relic-assets/art-prints.png" 
              alt="Art Prints" 
              className="w-40 md:w-72 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
            <motion.div 
              style={{ opacity: labelsOpacity }}
               className="mt-6 text-center"
            >
              <h3 className="text-white font-medium text-lg md:text-xl">Glass Prints</h3>
              <p className="text-gray-400 text-sm md:text-base mt-1">6x Digital Artworks</p>
            </motion.div>
          </motion.div>

          {/* 1. Main Bundle Box (Front) */}
          <motion.div
            style={{ scale: boxScale, opacity: boxOpacity }}
            className="absolute z-10 flex flex-col items-center"
          >
            <img 
              src="/relic-assets/bundle-box.png" 
              alt="Digital Relics Bundle" 
              className="w-64 md:w-96 lg:w-[450px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
            />
          </motion.div>

        </div>

        {/* CTA Reveal at the bottom */}
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-[10%] z-20 pointer-events-auto"
        >
          <button className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-amber-600 hover:text-white hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(217,119,6,0.2)] transition-all duration-300 transform hover:scale-105 flex items-center gap-3 group">
            <span className="tracking-wide">Get the Bundle - 12€</span>
            <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:bg-white transition-colors" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default DigitalRelicExplosion;
