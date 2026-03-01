import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Armchair, Maximize2 } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type RoomId = 'minimalist' | 'modern' | 'warm';
type FrameStyle = 'none' | 'white' | 'wood' | 'gold';
type PrintSize = 'S' | 'M' | 'L' | 'XL';

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image: string;
    orientation: string;
}

interface InteriorPreviewAppProps {
    gallery: GalleryItem[];
    currentIndex: number;
    onArtChange: (index: number) => void;
    previewTitle: string;
    previewDesc: string;
    labelFrame: string;
    labelSize: string;
    labelRoom: string;
}

// ─── Room Configs ─────────────────────────────────────────────────────────────

const ROOMS: { id: RoomId; label: string; image: string; filter?: string }[] = [
    { id: 'minimalist', label: 'Minimalist', image: '/minimalist interior blank.png' },
    { id: 'modern', label: 'Modern Studio', image: '/modern interior blank.png' },
    { id: 'warm', label: 'Warm Living', image: '/warm interior blank.png' },
];

// ─── Frame Configs ────────────────────────────────────────────────────────────

const FRAMES: { id: FrameStyle; label: string; border: string; background?: string; shadow: string; innerBorder?: string }[] = [
    {
        id: 'none',
        label: 'No Frame',
        border: '0px solid transparent',
        shadow: '0 30px 60px -15px rgba(0,0,0,0.7), 0 20px 25px -5px rgba(0,0,0,0.4)',
    },
    {
        id: 'white',
        label: 'White Mat',
        border: '18px solid #f8f7f5',
        shadow: '0 35px 70px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.1)',
        innerBorder: 'inset 0 4px 10px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.1)',
    },
    {
        id: 'wood',
        label: 'Dark Walnut',
        border: '18px solid #23160f',
        // Slight gradient trick via box-shadow for wood grain depth
        shadow: '0 40px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)',
        innerBorder: 'inset 0 6px 15px rgba(0,0,0,0.6), inset 0 0 0 2px #180e09',
    },
    {
        id: 'gold',
        label: 'Gilded Brass',
        border: '18px solid #d4af37',
        shadow: '0 40px 80px -20px rgba(0,0,0,0.85), 0 0 30px rgba(212,175,55,0.2)',
        innerBorder: 'inset 0 4px 12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(133,96,15,0.6)',
    },
];

// ─── Size Configs ─────────────────────────────────────────────────────────────

const SIZES: { id: PrintSize; label: string; cm: string; scale: number }[] = [
    { id: 'S', label: 'S', cm: '30×40 cm', scale: 0.30 },
    { id: 'M', label: 'M', cm: '50×70 cm', scale: 0.50 },
    { id: 'L', label: 'L', cm: '70×100 cm', scale: 0.70 },
    { id: 'XL', label: 'XL', cm: '100×150 cm', scale: 1.00 },
];

// ─── Component ────────────────────────────────────────────────────────────────

const InteriorPreviewApp: React.FC<InteriorPreviewAppProps> = ({
    gallery,
    currentIndex,
    onArtChange,
    previewTitle,
    previewDesc,
    labelFrame,
    labelSize,
    labelRoom,
}) => {
    const [activeRoom, setActiveRoom] = useState<RoomId>('minimalist');
    const [frameStyle, setFrameStyle] = useState<FrameStyle>('white');
    const [printSize, setPrintSize] = useState<PrintSize>('L');
    const constraintsRef = useRef<HTMLDivElement>(null);

    const currentArt = gallery[currentIndex];
    const activeRoomConfig = ROOMS.find(r => r.id === activeRoom)!;
    const activeFrameConfig = FRAMES.find(f => f.id === frameStyle)!;
    const activeSizeConfig = SIZES.find(s => s.id === printSize)!;

    const handleRoomChange = useCallback((id: RoomId) => setActiveRoom(id), []);
    const handleArtChange = useCallback((i: number) => onArtChange(i), [onArtChange]);
    const handleFrameChange = useCallback((id: FrameStyle) => setFrameStyle(id), []);
    const handleSizeChange = useCallback((id: PrintSize) => setPrintSize(id), []);

    // Determine if landscape for aspect ratio
    const isLandscape = currentArt.orientation === 'landscape';

    return (
        <section className="relative py-12 md:py-24 bg-neutral-900 border-t border-white/5 overflow-hidden">

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Section header */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div>
                        <div className="text-andean-gold font-mono text-xs tracking-[0.25em] mb-3 flex items-center gap-2 uppercase">
                            <Armchair size={14} />
                            {previewTitle}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight max-w-xl">
                            {previewDesc}
                        </h2>
                    </div>

                    {/* Room selector — top right */}
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="font-mono text-xs text-gray-500 tracking-widest mr-3 uppercase">
                            {labelRoom}
                        </span>
                        {ROOMS.map(room => (
                            <button
                                key={room.id}
                                onClick={() => handleRoomChange(room.id)}
                                className={`px-4 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 ${activeRoom === room.id
                                    ? 'border-andean-gold text-andean-gold bg-andean-gold/10'
                                    : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                                    }`}
                            >
                                {room.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Main Preview Canvas ─────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="relative rounded-xl md:rounded-none overflow-hidden border border-white/5"
                    style={{ height: 'clamp(340px, 55vw, 680px)' }}
                >
                    {/* Room background */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeRoom}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={activeRoomConfig.image}
                                alt={activeRoomConfig.label}
                                className="w-full h-full object-cover"
                                style={{ filter: activeRoomConfig.filter }}
                            />
                            {/* Consistent dark overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
                        </motion.div>
                    </AnimatePresence>

                    {/* room boundaries for drag */}
                    <div ref={constraintsRef} className="absolute inset-0 pointer-events-none p-12" />

                    {/* ─── Framed Artwork ──────────────────────────────── */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`art-${currentIndex}`}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: activeSizeConfig.scale }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                                drag
                                dragConstraints={constraintsRef}
                                dragElastic={0}
                                dragMomentum={false}
                                style={{
                                    pointerEvents: 'auto', // Enable pointer events just for the draggable element
                                    cursor: 'grab'
                                }}
                                whileDrag={{
                                    cursor: 'grabbing',
                                    scale: activeSizeConfig.scale * 1.02,
                                    zIndex: 50
                                }}
                            >
                                {/* Frame wrapper */}
                                <motion.div
                                    animate={{
                                        border: activeFrameConfig.border,
                                        boxShadow: activeFrameConfig.shadow,
                                        outline: 'none',
                                    }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        border: activeFrameConfig.border,
                                        boxShadow: activeFrameConfig.shadow,
                                        perspective: '900px',
                                        transformStyle: 'preserve-3d',
                                    }}
                                    className="overflow-hidden relative"
                                    title="Drag me around the room"
                                >
                                    {/* Inner shadow for artwork depth inside the frame */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-10"
                                        style={{ boxShadow: activeFrameConfig.innerBorder ?? 'none' }}
                                    />

                                    {/* Museum Glass Reflection Overlay */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
                                        style={{
                                            background: 'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.01) 30%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0) 36%, rgba(255,255,255,0) 100%)'
                                        }}
                                    />

                                    <img
                                        src={currentArt.image}
                                        alt={currentArt.title}
                                        className="block object-cover w-full h-full"
                                        style={{
                                            width: isLandscape ? 'clamp(160px, 25vw, 360px)' : 'clamp(110px, 17vw, 240px)',
                                            aspectRatio: isLandscape ? '4/3' : currentArt.orientation === 'square' ? '1/1' : '3/4',
                                            objectPosition: 'center bottom',
                                            transform: 'scale(1.06)', // Crops out the top 6% (mac bar)
                                            transformOrigin: 'bottom center'
                                        }}
                                        draggable={false}
                                    />
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Art info overlay — bottom left */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`info-${currentIndex}`}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12 }}
                            transition={{ duration: 0.4 }}
                            className="absolute bottom-5 left-6 z-10"
                        >
                            <p className="font-mono text-andean-gold text-[10px] tracking-[0.25em] uppercase mb-0.5">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                            </p>
                            <p className="font-serif text-white text-lg leading-tight">{currentArt.title}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Size badge — bottom right */}
                    <div className="absolute bottom-5 right-6 z-10">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur border border-white/10 rounded-full">
                            <Maximize2 size={10} className="text-andean-gold" />
                            <span className="font-mono text-white text-[10px] tracking-widest">
                                {activeSizeConfig.cm}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── HUD Control Bar ─────────────────────────────────────────── */}
                <div className="mt-0 border border-t-0 border-white/5 bg-neutral-950/80 backdrop-blur-xl px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 rounded-b-xl md:rounded-none">

                    {/* Frame selector */}
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                        <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase w-12 shrink-0">
                            {labelFrame}
                        </span>
                        {FRAMES.map(frame => (
                            <button
                                key={frame.id}
                                onClick={() => handleFrameChange(frame.id)}
                                className={`relative px-4 py-1.5 font-mono text-xs tracking-wider border transition-all duration-300 ${frameStyle === frame.id
                                    ? 'border-andean-gold text-andean-gold bg-andean-gold/10'
                                    : 'border-white/10 text-gray-500 hover:border-white/25 hover:text-gray-300'
                                    }`}
                            >
                                {/* Color preview swatch */}
                                {frame.id !== 'none' && (
                                    <span
                                        className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle"
                                        style={{
                                            background:
                                                frame.id === 'white' ? '#f0ece4'
                                                    : frame.id === 'wood' ? '#3a2a1a'
                                                        : '#B7791F',
                                        }}
                                    />
                                )}
                                {frame.label}
                            </button>
                        ))}
                    </div>

                    {/* Size selector */}
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap mt-2 md:mt-0">
                        <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase shrink-0">
                            {labelSize}
                        </span>
                        {SIZES.map(size => (
                            <button
                                key={size.id}
                                onClick={() => handleSizeChange(size.id)}
                                title={size.cm}
                                className={`w-10 h-10 flex items-center justify-center font-mono text-xs border transition-all duration-300 ${printSize === size.id
                                    ? 'border-andean-gold text-andean-gold bg-andean-gold/10'
                                    : 'border-white/10 text-gray-500 hover:border-white/25 hover:text-gray-300'
                                    }`}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── Artwork Thumbnail Strip ────────────────────────────────── */}
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                    {gallery.map((item, i) => (
                        <button
                            key={item.id}
                            onClick={() => handleArtChange(i)}
                            className={`relative shrink-0 overflow-hidden transition-all duration-300 ${currentIndex === i
                                ? 'ring-2 ring-andean-gold scale-105 shadow-[0_0_16px_rgba(183,121,31,0.4)]'
                                : 'ring-1 ring-white/10 opacity-60 hover:opacity-90 hover:ring-white/30'
                                }`}
                            style={{ width: 88, height: 66 }}
                            title={item.title}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                            {/* Selected indicator */}
                            {currentIndex === i && (
                                <motion.div
                                    layoutId="thumb-active"
                                    className="absolute inset-0 border-2 border-andean-gold"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteriorPreviewApp;
