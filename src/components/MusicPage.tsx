import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, ShoppingBag, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const songs = [
    { id: 1, title: "Sunrise over Machu Picchu", duration: "3:45", type: "Ambient" },
    { id: 2, title: "The Sacred Valley", duration: "4:20", type: "Folk" },
    { id: 3, title: "Flight of the Condor", duration: "3:12", type: "Orchestral" },
    { id: 4, title: "Echoes of the Incas", duration: "3:55", type: "Traditional" },
    { id: 5, title: "Mystic River (Urubamba)", duration: "4:05", type: "Ambient" },
    { id: 6, title: "Temple of the Sun", duration: "3:30", type: "Ceremonial" },
    { id: 7, title: "Shadows of the Stone", duration: "2:58", type: "Dark Folk" },
    { id: 8, title: "Wind in the Andes", duration: "3:40", type: "Flute Solo" },
    { id: 9, title: "Pachamama's Breath", duration: "4:15", type: "Ambient" },
    { id: 10, title: "Starry Cusco Night", duration: "3:25", type: "Lullaby" },
];

const MusicPage: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [currentSong, setCurrentSong] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(40).fill(10));

    // Simulate audio visualizer
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setVisualizerBars(prev => prev.map(() => Math.random() * 80 + 10));
            }, 100);
        } else {
            setVisualizerBars(new Array(40).fill(5));
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const activeSong = songs.find(s => s.id === currentSong) || songs[0];

    const nextSong = () => {
        const currentIndex = songs.findIndex(s => s.id === currentSong);
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentSong(songs[nextIndex].id);
    };

    const prevSong = () => {
        const currentIndex = songs.findIndex(s => s.id === currentSong);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentSong(songs[prevIndex].id);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-andean-gold selection:text-black overflow-hidden relative">

            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-andean-terracotta/20 transition-colors duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-50'}`} />
                <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-andean-gold/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-32 pb-20 px-4 md:px-10 h-screen flex flex-col md:flex-row gap-12 items-center justify-center">

                {/* Left: The "Unboxing" Experience (Vinyl/Art) */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center perspective-1000">
                    <motion.div
                        className="relative w-72 h-72 md:w-96 md:h-96"
                        animate={{
                            rotateY: isPlaying ? [0, 360] : 0,
                            scale: isPlaying ? 1.05 : 1
                        }}
                        transition={{
                            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 0.5 }
                        }}
                    >
                        {/* Vinyl Record Effect */}
                        <div className="absolute inset-0 rounded-full bg-black border-4 border-gray-800 shadow-2xl flex items-center justify-center">
                            <div className="absolute inset-2 rounded-full border border-gray-800/50" />
                            <div className="absolute inset-4 rounded-full border border-gray-800/50" />
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-andean-gold via-andean-terracotta to-amber-900 flex items-center justify-center">
                                <Music className="w-16 h-16 text-white/30" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Visualizer Underneath */}
                    <div className="mt-12 flex items-end gap-1 h-16 w-full max-w-md justify-center">
                        {visualizerBars.map((height, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-gradient-to-t from-andean-gold/20 to-andean-gold rounded-t-full"
                                animate={{ height: `${height}%` }}
                                transition={{ ease: "linear", duration: 0.1 }}
                            />
                        ))}
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => navigate('/checkout', { state: { product: 'Digital Album', price: 8, productId: 'album' } })}
                            className="flex items-center gap-3 px-8 py-4 bg-andean-gold text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(183,121,31,0.3)] hover:scale-105 hover:bg-white transition-all transform hover:shadow-[0_0_30px_rgba(183,121,31,0.5)]"
                        >
                            <ShoppingBag size={20} />
                            <span>Buy Album 8€</span>
                        </button>
                    </div>
                </div>

                {/* Right: The Player Interface */}
                <div className="w-full md:w-1/2 max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-1 font-sans">{t.musicPage.subtitle}</h2>
                            <h1 className="text-4xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {t.musicPage.albumTitle}
                            </h1>
                        </div>
                    </div>

                    {/* Current Track Display */}
                    <div className="mb-8 p-6 bg-black/40 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono text-andean-gold animate-pulse">{isPlaying ? 'NOW PLAYING' : 'PAUSED'}</span>
                            <span className="text-xs font-mono text-gray-500">{activeSong.duration}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{activeSong.title}</h3>
                        <p className="text-sm text-gray-400">{activeSong.type} Mode</p>

                        {/* Progress Bar */}
                        <div className="mt-6 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-andean-gold"
                                initial={{ width: "0%" }}
                                animate={{ width: isPlaying ? "100%" : "30%" }}
                                transition={{ duration: 100, ease: "linear" }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-6 mx-auto">
                            <button onClick={prevSong} className="text-gray-400 hover:text-white transition-colors">
                                <Rewind size={28} />
                            </button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-20 h-20 rounded-full bg-andean-gold text-black flex items-center justify-center hover:bg-white transition-colors shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                            >
                                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                            </motion.button>

                            <button onClick={nextSong} className="text-gray-400 hover:text-white transition-colors">
                                <FastForward size={28} />
                            </button>
                        </div>
                    </div>

                    {/* Tracklist Preview (Scrollable) */}
                    <div className="h-48 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        {songs.map((song) => (
                            <div
                                key={song.id}
                                onClick={() => { setCurrentSong(song.id); setIsPlaying(true); }}
                                className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${currentSong === song.id ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${currentSong === song.id ? 'bg-andean-gold' : 'bg-gray-700'}`} />
                                    <span className={`text-sm ${currentSong === song.id ? 'text-white font-bold' : 'text-gray-400'}`}>{song.title}</span>
                                </div>
                                <span className="text-xs text-gray-600">{song.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPage;
