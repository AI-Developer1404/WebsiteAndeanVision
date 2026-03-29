import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, ShoppingBag, Music, Mic, Headphones, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';
import FAQSection from './FAQSection';
import BundlePreviewModal from './BundlePreviewModal';
import ParticleBackground3D from './ParticleBackground3D';

const MusicPage: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    // Use songs from translations
    const songs = t.audio.playlist || [];

    const [currentSong, setCurrentSong] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showBundlePreview, setShowBundlePreview] = useState(false);

    // Holo Player Spatial UI State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });
    const playerRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const playerRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
    const playerGlareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const playerGlareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
    const playerBackground = useMotionTemplate`radial-gradient(circle at ${playerGlareX} ${playerGlareY}, rgba(255,255,255,0.06) 0%, transparent 60%)`;

    const [isHovered, setIsHovered] = useState(false);

    const handlePlayerMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePlayerMouseLeave = () => {
        mouseX.set(0); mouseY.set(0);
        setIsHovered(false);
    };

    // Audio Reference
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const activeSong = songs.find(s => s.id === currentSong) || songs[0];

    // Initialize Audio Object
    useEffect(() => {
        if (!activeSong) return;

        audioRef.current = new Audio(activeSong.file);
        audioRef.current.volume = 0.6;

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        const handleTimeUpdate = () => {
            if (audioRef.current) {
                const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                setProgress(percent || 0);
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration || 0);
            }
        };

        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    // Handle Song Change
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.pause();
            audioRef.current.src = activeSong.file;
            audioRef.current.load();
            setProgress(0);

            if (wasPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            }
        }
    }, [currentSong]);

    // Handle Play/Pause Toggle via State
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Playback failed:", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const nextSong = () => {
        const currentIndex = songs.findIndex(s => s.id === currentSong);
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentSong(songs[nextIndex].id);
        if (!isPlaying) setIsPlaying(true);
    };

    const prevSong = () => {
        const currentIndex = songs.findIndex(s => s.id === currentSong);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentSong(songs[prevIndex].id);
        if (!isPlaying) setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Format time in mm:ss
    const formatTime = (seconds: number): string => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-andean-gold selection:text-black relative overflow-x-hidden">

            {/* NEW: 3D WebGL Background Audio Visualizer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* 3D WebGL Particle Background (Now Global) */}
                <ParticleBackground3D isPlaying={isPlaying} />
            </div>

            {/* Ambient Background Darkening */}
            <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-20 md:pt-32 pb-20 px-4 md:px-10 min-h-screen flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center">

                {/* Left: The "Unboxing" Experience (Vinyl/Art) */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center perspective-1000 z-10 relative">
                    
                    {/* The Visualizer Bars behind the Vinyl */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 z-0">
                        <div className="flex items-end justify-center gap-1 sm:gap-2 h-64 sm:h-96 w-full max-w-[500px]">
                            {[...Array(24)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 sm:w-3 bg-gradient-to-t from-andean-gold to-yellow-400 rounded-t-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                                    animate={{
                                        height: isPlaying 
                                            ? ["20%", `${Math.random() * 60 + 40}%`, "20%"] 
                                            : "10%",
                                    }}
                                    transition={{
                                        duration: isPlaying ? Math.random() * 0.5 + 0.3 : 0.5,
                                        repeat: isPlaying ? Infinity : 0,
                                        ease: "easeInOut",
                                        delay: Math.random() * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="relative w-56 h-56 md:w-96 md:h-96 z-10"
                        animate={{
                            rotateY: isPlaying ? [0, 360] : 0,
                            scale: isPlaying ? 1.05 : 1
                        }}
                        transition={{
                            rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                            scale: { duration: 0.5 }
                        }}
                    >
                        {/* Realistic Vinyl Record */}
                        <div className="absolute inset-0 rounded-full bg-black border-4 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
                            <div className="absolute inset-2 rounded-full border border-gray-800/50" />
                            <div className="absolute inset-4 rounded-full border border-gray-800/50" />
                            <div className="w-32 h-32 rounded-full flex items-center justify-center relative overflow-hidden" style={{
                                background: 'radial-gradient(circle at center, #d4af37 0%, #8a6300 100%)'
                            }}>
                                <Music className="w-16 h-16 text-white/30 relative z-10" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-8 md:mt-16 flex flex-col items-center gap-4 relative z-20">
                        <MagneticButton
                            onClick={() => navigate('/checkout', { state: { product: 'Digital Album', price: 8, productId: 'album' } })}
                        >
                            <div className="flex items-center gap-3 px-10 py-5 bg-andean-gold text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(183,121,31,0.3)] hover:bg-white transition-all transform hover:shadow-[0_0_40px_rgba(183,121,31,0.6)]">
                                <ShoppingBag size={20} />
                                <span>{t.musicPage.buyButton}</span>
                            </div>
                        </MagneticButton>
                        <button
                            onClick={() => setShowBundlePreview(true)}
                            className="text-sm text-gray-400 hover:text-andean-gold transition-colors underline underline-offset-4"
                        >
                            {t.hero.previewIncluded}
                        </button>
                    </div>
                </div>

                {/* Right: The Holographic Spatial Audio Player */}
                <motion.div 
                    className="w-full md:w-1/2 max-w-xl perspective-1000 z-20"
                    onMouseMove={handlePlayerMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handlePlayerMouseLeave}
                >
                    <motion.div 
                        style={{
                            rotateX: playerRotateX,
                            rotateY: playerRotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="glass-panel border border-white/10 rounded-3xl p-5 md:p-10 relative overflow-hidden group shadow-2xl"
                    >
                        {/* Dynamic Glare Overlay */}
                        <motion.div
                            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: playerBackground }}
                        />

                        {/* Content inside player translated Z for dynamic 3D depth */}
                        <motion.div 
                            className="relative z-10 pointer-events-auto" 
                            animate={{ z: isHovered ? 60 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-2 font-sans">{t.musicPage.subtitle}</h2>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold drop-shadow-lg">
                                        {t.musicPage.albumTitle}
                                    </h1>
                                </div>
                            </div>

                            {/* Current Track Display */}
                            <div className="mb-10 p-8 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 shadow-inner relative z-20">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-mono text-andean-gold animate-pulse tracking-widest">{isPlaying ? t.musicPage.nowPlaying : t.musicPage.paused}</span>
                                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>/</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{activeSong.title}</h3>
                                <p className="text-sm text-gray-400">{t.musicPage.types[activeSong.type as keyof typeof t.musicPage.types]} {t.musicPage.mode}</p>

                                {/* Progress Bar */}
                                <div className="mt-8 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer group/progress relative">
                                    <motion.div
                                        className="h-full bg-andean-gold relative"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1, ease: "linear" }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between gap-6 mb-8 md:mb-12 relative z-20">
                                <div className="flex items-center gap-8 mx-auto">
                                    <MagneticButton onClick={prevSong}>
                                        <div className="text-gray-400 hover:text-white transition-colors p-4">
                                            <Rewind size={32} />
                                        </div>
                                    </MagneticButton>

                                    <MagneticButton onClick={togglePlay}>
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-andean-gold to-yellow-600 text-black flex items-center justify-center hover:brightness-110 transition-all shadow-[0_0_30px_rgba(255,215,0,0.5)] cursor-pointer active:scale-95">
                                            {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                                        </div>
                                    </MagneticButton>

                                    <MagneticButton onClick={nextSong}>
                                        <div className="text-gray-400 hover:text-white transition-colors p-4">
                                            <FastForward size={32} />
                                        </div>
                                    </MagneticButton>
                                </div>
                            </div>

                            {/* Tracklist Preview */}
                            <div className="h-auto md:h-56 overflow-y-visible md:overflow-y-auto pr-0 md:pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                {songs.map((song) => (
                                    <div
                                        key={song.id}
                                        onClick={() => { setCurrentSong(song.id); setIsPlaying(true); }}
                                        className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${currentSong === song.id ? 'bg-white/10 border border-andean-gold/30' : 'hover:bg-white/5 border border-transparent hover:border-white/5'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${currentSong === song.id ? 'bg-andean-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'bg-gray-700'}`} />
                                            <span className={`text-sm ${currentSong === song.id ? 'text-white font-bold' : 'text-gray-400'}`}>{song.title}</span>
                                        </div>
                                        <span className="text-xs text-gray-600 font-mono">{song.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* NEW: THE INSTRUMENTS SECTION */}
            <section className="py-24 px-6 relative border-t border-white/5 bg-neutral-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-gradient-gold">The Soul of the Andes</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-andean-gold/5 rounded-full blur-3xl group-hover:bg-andean-gold/10 transition-colors" />
                            <Mic className="text-andean-gold mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">{t.musicPage.instruments.panflute.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {t.musicPage.instruments.panflute.desc}
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-andean-terracotta/5 rounded-full blur-3xl group-hover:bg-andean-terracotta/10 transition-colors" />
                            <Music className="text-andean-gold mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">{t.musicPage.instruments.charango.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {t.musicPage.instruments.charango.desc}
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                            <Radio className="text-andean-gold mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">{t.musicPage.instruments.modern.title}</h3>
                            <p className="text-gray-200 leading-relaxed">
                                {t.musicPage.instruments.modern.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: LISTENER STORIES */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-5xl mx-auto text-center">
                    <Headphones className="mx-auto text-gray-500 mb-8" size={32} />
                    <h2 className="text-3xl md:text-4xl font-serif mb-16 text-white">Moments of Connection</h2>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                            <p className="text-xl text-gray-300 italic mb-6">{t.musicPage.reviews.elena.text}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-andean-gold rounded-full flex items-center justify-center text-black font-bold">E</div>
                                <div>
                                    <p className="font-bold text-white">{t.musicPage.reviews.elena.author}</p>
                                    <p className="text-xs text-gray-500">{t.musicPage.reviews.elena.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                            <p className="text-xl text-gray-300 italic mb-6">{t.musicPage.reviews.marcus.text}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">M</div>
                                <div>
                                    <p className="font-bold text-white">{t.musicPage.reviews.marcus.author}</p>
                                    <p className="text-xs text-gray-500">{t.musicPage.reviews.marcus.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: FAQ SECTION */}
            <FAQSection
                title={t.musicPage.faqTitle}
                items={t.musicPage.faq}
                className="bg-black border-t border-white/10"
            />

            <BundlePreviewModal
                isOpen={showBundlePreview}
                onClose={() => setShowBundlePreview(false)}
                initialTab="music"
                customTitle={t.musicPage.subtitle}
                allowedTabs={['music']}
            />
        </div>
    );
};

export default MusicPage;
