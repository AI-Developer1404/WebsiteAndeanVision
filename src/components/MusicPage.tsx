import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, ShoppingBag, Music, Mic, Headphones, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';
import FAQSection from './FAQSection';

const MusicPage: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    // Use songs from translations
    const songs = t.audio.playlist || [];

    const [currentSong, setCurrentSong] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(40).fill(10));

    // Audio Reference
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const visualizerInterval = useRef<ReturnType<typeof setInterval> | null>(null);

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

    // Simulate audio visualizer
    useEffect(() => {
        if (isPlaying) {
            visualizerInterval.current = setInterval(() => {
                setVisualizerBars(prev => prev.map(() => Math.random() * 60 + 20));
            }, 100);
        } else {
            if (visualizerInterval.current) clearInterval(visualizerInterval.current);
            setVisualizerBars(new Array(40).fill(10));
        }
        return () => {
            if (visualizerInterval.current) clearInterval(visualizerInterval.current);
        };
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

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-andean-gold selection:text-black relative overflow-x-hidden">

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-andean-terracotta/20 transition-colors duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-50'}`} />
                <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-andean-gold/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-20 md:pt-32 pb-20 px-4 md:px-10 min-h-screen flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center">

                {/* Left: The "Unboxing" Experience (Vinyl/Art) */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center perspective-1000">
                    <motion.div
                        className="relative w-56 h-56 md:w-96 md:h-96"
                        animate={{
                            rotateY: isPlaying ? [0, 360] : 0,
                            scale: isPlaying ? 1.05 : 1
                        }}
                        transition={{
                            rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                            scale: { duration: 0.5 }
                        }}
                    >
                        {/* Vinyl Record Effect */}
                        <div className="absolute inset-0 rounded-full bg-black border-4 border-gray-800 shadow-2xl flex items-center justify-center">
                            <div className="absolute inset-2 rounded-full border border-gray-800/50" />
                            <div className="absolute inset-4 rounded-full border border-gray-800/50" />
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-andean-gold via-andean-terracotta to-amber-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                                <Music className="w-16 h-16 text-white/30" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Improved Visualizer Underneath */}
                    <div className="mt-16 flex items-end gap-1.5 h-24 w-full max-w-md justify-center px-4">
                        {visualizerBars.map((height, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-gradient-to-t from-transparent via-andean-gold to-white rounded-t-full shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                                animate={{ height: `${height}%`, opacity: isPlaying ? 1 : 0.3 }}
                                transition={{ ease: "easeInOut", duration: 0.1 }}
                            />
                        ))}
                    </div>

                    <div className="mt-8">
                        <MagneticButton
                            onClick={() => navigate('/checkout', { state: { product: 'Digital Album', price: 8, productId: 'album' } })}
                        >
                            <div className="flex items-center gap-3 px-10 py-5 bg-andean-gold text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(183,121,31,0.3)] hover:bg-white transition-all transform hover:shadow-[0_0_40px_rgba(183,121,31,0.6)]">
                                <ShoppingBag size={20} />
                                <span>{t.musicPage.buyButton}</span>
                            </div>
                        </MagneticButton>
                    </div>
                </div>

                {/* Right: The Player Interface */}
                <div className="w-full md:w-1/2 max-w-xl glass-panel rounded-3xl p-5 md:p-10 relative">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-2 font-sans">{t.musicPage.subtitle}</h2>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold">
                                {t.musicPage.albumTitle}
                            </h1>
                        </div>
                    </div>

                    {/* Current Track Display */}
                    <div className="mb-10 p-8 bg-black/60 rounded-2xl border border-white/10 shadow-inner">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-mono text-andean-gold animate-pulse tracking-widest">{isPlaying ? t.musicPage.nowPlaying : t.musicPage.paused}</span>
                            <span className="text-xs font-mono text-gray-500">{activeSong.duration}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{activeSong.title}</h3>
                        <p className="text-sm text-gray-400">{t.musicPage.types[activeSong.type as keyof typeof t.musicPage.types]} {t.musicPage.mode}</p>

                        {/* Progress Bar */}
                        <div className="mt-8 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer group">
                            <motion.div
                                className="h-full bg-andean-gold relative"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6 mb-8 md:mb-12">
                        <div className="flex items-center gap-8 mx-auto">
                            <MagneticButton onClick={prevSong}>
                                <div className="text-gray-400 hover:text-white transition-colors p-4">
                                    <Rewind size={32} />
                                </div>
                            </MagneticButton>

                            <MagneticButton onClick={togglePlay}>
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-andean-gold to-yellow-600 text-black flex items-center justify-center hover:brightness-110 transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)]">
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
                </div>
            </section>

            {/* NEW: THE INSTRUMENTS SECTION */}
            <section className="py-24 px-6 relative border-t border-white/5 bg-neutral-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-gradient-gold">The Soul of the Andes</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-andean-gold/5 rounded-full blur-3xl group-hover:bg-andean-gold/10 transition-colors" />
                            <Mic className="text-andean-gold mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">Pan Flute (Zampoña)</h3>
                            <p className="text-gray-400 leading-relaxed">
                                The breath of the mountains. Our recordings feature authentic bamboo pan flutes handcrafted in the Sacred Valley, capturing the wind's whisper through the peaks.
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-andean-terracotta/5 rounded-full blur-3xl group-hover:bg-andean-terracotta/10 transition-colors" />
                            <Music className="text-andean-gold mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">Charango</h3>
                            <p className="text-gray-400 leading-relaxed">
                                A small Andean stringed instrument with a voice like splashing water. Its shimmering high notes evoke the sparkling rivers of the Urubamba.
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                            <Radio className="text-andean-gold mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">Modern Soundscapes</h3>
                            <p className="text-gray-200 leading-relaxed">
                                Synthesized textures meeting organic rhythms. A modern interpretation of the Andean atmosphere.
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
                            <p className="text-xl text-gray-300 italic mb-6">"I played 'Starry Cusco Night' during my focused work session this morning. I immediately felt transported back to my trip in 2019. It’s hauntingly beautiful."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-andean-gold rounded-full flex items-center justify-center text-black font-bold">E</div>
                                <div>
                                    <p className="font-bold text-white">Elena R.</p>
                                    <p className="text-xs text-gray-500">Verified Buyer</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                            <p className="text-xl text-gray-300 italic mb-6">"The audio quality is pristine. I used 'Flight of the Condor' as background for my travel vlog (with credit, of course) and my audience loved it."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">M</div>
                                <div>
                                    <p className="font-bold text-white">Marcus T.</p>
                                    <p className="text-xs text-gray-500">Content Creator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: FAQ SECTION */}
            <FAQSection
                title="Questions about the Album"
                items={[
                    { question: "What file format are the songs?", answer: "You will receive high-quality MP3 (320kbps) and WAV (Lossless) files, universally compatible with all phones, computers, and tablets." },
                    { question: "How do I download the music?", answer: "Immediately after purchase, you'll be directed to the Download Hub where you can download the full album as a ZIP file or individual tracks." },
                    { question: "Is this traditional or modern music?", answer: "It is a cinematic fusion. We use traditional Andean instruments (Pan Flute, Charango) recorded in high fidelity and blended with modern ambient synthesis for a relaxing, immersive experience." }
                ]}
                className="bg-neutral-900"
            />
        </div>
    );
};

export default MusicPage;
