import { Play, Pause, RefreshCw, Loader2, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
    videoFrames?: string[]; // Array of image URLs
    instructions?: string[]; // Array of subtitle texts
    videoId?: string | null; // YouTube Video ID
    searchQuery?: string; // Search term for embed
}

export function VideoPlayer({ videoFrames = [], instructions = [], videoId, searchQuery }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isMuted, setIsMuted] = useState(true);

    // Slideshow Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && videoFrames.length > 0) {
            interval = setInterval(() => {
                setCurrentFrame((prev) => {
                    const next = prev + 1;
                    if (next >= videoFrames.length) {
                        // Loop back to start without stopping
                        return 0;
                    }
                    return next;
                });
            }, 5000); // 5 seconds per slide for better reading time
        }
        return () => clearInterval(interval);
    }, [isPlaying, videoFrames]);

    // If we have a real YouTube video, show that!
    if (videoId) {
        return (
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    // Fallback: Client-Side Embed Search (Safe for Vercel)
    if (searchQuery) {
        const encodedQuery = encodeURIComponent(searchQuery);
        // Using window.location.origin for the origin parameter can help with embed restrictions
        const origin = typeof window !== 'undefined' ? window.location.origin : '';

        return (
            <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed?listType=search&list=${encodedQuery}&autoplay=1&loop=1&rel=0&origin=${origin}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="flex justify-center">
                    <a
                        href={`https://www.youtube.com/results?search_query=${encodedQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary underline flex items-center gap-1"
                    >
                        Video not playing? Watch on YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        );
    }

    if (!videoFrames || videoFrames.length === 0) {
        return (
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center text-white/50">
                <p>No Video Available</p>
            </div>
        )
    }

    return (
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentFrame}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            opacity: { duration: 1 },
                            scale: { duration: 6, ease: "linear" } // Ken Burns effect (zoom out)
                        }
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={videoFrames[currentFrame]}
                        alt={`Step ${currentFrame + 1}`}
                        className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Subtitles / Instructions */}
            <div className="absolute bottom-12 left-0 right-0 px-8 text-center pb-4">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentFrame}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white text-lg md:text-xl font-medium leading-relaxed drop-shadow-md"
                    >
                        {instructions[currentFrame] || "Enjoy your meal!"}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Overlay & Controls */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!isPlaying && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(true)}
                        className="pointer-events-auto relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-primary hover:border-primary transition-all shadow-xl group/btn"
                    >
                        <Play className="w-8 h-8 text-white ml-1 fill-white group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                )}
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:bg-black/60 hover:text-white transition-colors"
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </div>

            {/* Progress Bar & Timeline */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                    style={{ width: `${((currentFrame + 1) / videoFrames.length) * 100}%` }}
                />
            </div>

            {/* Step Indicator */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                Step {currentFrame + 1} of {videoFrames.length}
            </div>
        </div>
    );
}
