import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Music2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import previewAudio from '../assets/audio/preview.mp3';

const AudioPlayer: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // We'll use the same preview file for all tracks for this demo, 
    // but in a real app, you'd map these to different URLs.
    // Using an array of keys to lookup translations.
    const trackKeys = ['track1', 'track2', 'track3', 'track4'] as const;

    useEffect(() => {
        // Create audio object on mount
        const audio = new Audio(previewAudio);
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio playback error:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const changeTrack = (direction: 'next' | 'prev') => {
        let newIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
        if (newIndex >= trackKeys.length) newIndex = 0;
        if (newIndex < 0) newIndex = trackKeys.length - 1;

        setCurrentTrackIndex(newIndex);

        // Auto-play when changing tracks if not already playing, or keep playing
        if (!isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio playback error:", e));
            setIsPlaying(true);
        }
    };

    // Visualizer bars
    const bars = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="w-full max-w-lg rounded-2xl bg-andean-slate p-6 text-white shadow-2xl">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-sm font-bold tracking-widest text-andean-gold uppercase">{t.audio.title}</h3>
                    {/* Visualizer */}
                    <div className="flex items-end gap-1 h-6">
                        {bars.map((bar) => (
                            <motion.div
                                key={bar}
                                className="w-1 rounded-t-full bg-andean-terracotta"
                                animate={{
                                    height: isPlaying ? [5, 20, 8, 15, 5] : 4,
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: bar * 0.1,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => changeTrack('prev')}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                        aria-label="Previous Track"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <div className="flex-1 flex flex-col items-center text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTrackIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <div className="mb-2 p-3 bg-white/10 rounded-full">
                                    <Music2 size={24} className="text-andean-gold" />
                                </div>
                                <h4 className="text-xl font-bold text-andean-cream">
                                    {t.audio.tracks[trackKeys[currentTrackIndex]]}
                                </h4>
                                <p className="text-xs text-white/50 mt-1">
                                    {currentTrackIndex + 1} / {trackKeys.length}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => changeTrack('next')}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                        aria-label="Next Track"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                <div className="flex justify-center flex-col items-center gap-4">
                    <button
                        onClick={togglePlay}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-andean-gold text-andean-slate transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-andean-gold/20"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </button>

                    <button
                        onClick={() => navigate('/music')}
                        className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
                    >
                        <Music2 size={14} />
                        Explore Music
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
