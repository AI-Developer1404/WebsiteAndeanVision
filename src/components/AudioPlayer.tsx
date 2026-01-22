import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Music2 } from 'lucide-react';

const songs = [
    { id: 1, title: "Sunrise over Machu Picchu", duration: "0:22", type: "Ambient", file: "/music previews/project 1 prev.mp3" },
    { id: 2, title: "The Sacred Valley", duration: "0:25", type: "Folk", file: "/music previews/project 2 prev.mp3" },
    { id: 3, title: "Flight of the Condor", duration: "0:24", type: "Orchestral", file: "/music previews/project 3 prev.mp3" },
    { id: 4, title: "Echoes of the Incas", duration: "0:20", type: "Traditional", file: "/music previews/project 4 prev.mp3" },
];

const AudioPlayer: React.FC = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(20).fill(10));

    const activeSong = songs[currentTrackIndex];

    useEffect(() => {
        audioRef.current = new Audio(activeSong.file);
        audioRef.current.volume = 0.5;

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            changeTrack('next');
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

    // Handle Track Change
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
    }, [currentTrackIndex]);

    // Handle Play/Pause
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

    // Visualizer Loop
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setVisualizerBars(prev => prev.map(() => Math.random() * 60 + 10));
            }, 100);
        } else {
            setVisualizerBars(new Array(20).fill(5));
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const changeTrack = (direction: 'next' | 'prev') => {
        let newIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
        if (newIndex >= songs.length) newIndex = 0;
        if (newIndex < 0) newIndex = songs.length - 1;
        setCurrentTrackIndex(newIndex);
        if (!isPlaying) setIsPlaying(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-xl p-8 overflow-hidden shadow-2xl">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-andean-gold/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">

                    {/* Left: Mini Vinyl */}
                    <motion.div
                        className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
                        animate={{
                            rotate: isPlaying ? 360 : 0
                        }}
                        transition={{
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                        }}
                    >
                        <div className="absolute inset-0 rounded-full bg-black border-4 border-gray-800 shadow-xl flex items-center justify-center">
                            <div className="absolute inset-2 rounded-full border border-gray-800/50" />
                            <div className="absolute inset-8 rounded-full border border-gray-800/50" />
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-andean-gold via-yellow-600 to-amber-900 flex items-center justify-center">
                                <div className="w-2 h-2 bg-black rounded-full opacity-50" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Controls & Info */}
                    <div className="flex-1 w-full text-center md:text-left">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-bold tracking-[0.2em] text-andean-gold uppercase">Featured Previews</h3>
                            <div className="flex gap-1 h-4 items-end">
                                {visualizerBars.slice(0, 10).map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-andean-gold/50 rounded-full"
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>

                        <h2 className="text-3xl font-serif font-bold text-white mb-2">{activeSong.title}</h2>
                        <p className="text-gray-400 mb-8">{activeSong.type} • {activeSong.duration}</p>

                        <div className="flex items-center justify-center md:justify-start gap-8 mb-8">
                            <button onClick={() => changeTrack('prev')} className="text-gray-400 hover:text-white transition-colors">
                                <ChevronLeft size={32} />
                            </button>

                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 rounded-full bg-andean-gold text-black flex items-center justify-center hover:bg-white transition-colors shadow-lg hover:shadow-andean-gold/50"
                            >
                                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                            </button>

                            <button onClick={() => changeTrack('next')} className="text-gray-400 hover:text-white transition-colors">
                                <ChevronRight size={32} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
                            <motion.div
                                className="h-full bg-andean-gold"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: 'linear' }}
                            />
                        </div>

                        <div className="flex gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => navigate('/music')}
                                className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Music2 size={16} />
                                Full Album
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
