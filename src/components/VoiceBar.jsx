import { useState, useEffect } from "react";

const VoiceBar = ({ audioBlob }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Detect system dark mode
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(mediaQuery.matches);

        const handleThemeChange = (e) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener("change", handleThemeChange);

        return () => mediaQuery.removeEventListener("change", handleThemeChange);
    }, []);

    // Initialize audio and autoplay
    useEffect(() => {
        if (audioBlob) {
            console.log("Initializing audio...");
            setIsLoading(true);
            const audioElement = new Audio(URL.createObjectURL(audioBlob));
            audioElement.preload = "auto";
            audioElement.onended = () => {
                setIsPlaying(false);
                setProgress(0);
            };

            audioElement.addEventListener("timeupdate", () => {
                setProgress((audioElement.currentTime / audioElement.duration) * 100);
            });

            setAudio(audioElement);

            audioElement.play()
                .then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Auto-play failed:", err);
                    setIsLoading(false);
                });

            return () => {
                audioElement.pause();
                audioElement.src = "";
            };
        }
    }, [audioBlob]);

    const handlePlay = async () => {
        if (audio) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Playback failed:", error);
            }
        }
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(audioBlob);
        link.download = "response.wav";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center p-2 mt-3 bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--input-border)] rounded-lg shadow-md w-full">
            {/* Loading Effect */}
            {isLoading && (
                <p className="text-gray-400 text-sm mb-2 animate-pulse">
                    🎙️ 生成老高的语音中<span className="dot-animation">...</span>
                </p>
            )}

            {/* Play/Pause & Download Buttons */}
            <div className="flex items-center w-full">
                <button
                    onClick={isPlaying ? handlePause : handlePlay}
                    className={`px-3 py-1 rounded-lg transition-colors shadow-md flex-1 
                        ${isDarkMode 
                            ? "bg-white text-black hover:bg-gray-600 hover:text-white"  
                            : "bg-blue-500 hover:bg-blue-600 hover:text-white text-black"
                        }`}
                >
                    {isPlaying ? "⏸️ Pause" : "▶ Play"}
                </button>
                <button
                    onClick={handleDownload}
                    className={`ml-3 px-3 py-1 rounded-lg transition-colors shadow-md 
                        ${isDarkMode 
                            ? "bg-white text-black hover:bg-gray-600 hover:text-white"  
                            : "bg-blue-500 hover:bg-blue-600 hover:text-white text-black"
                        }`}
                >
                    ⬇ Download
                </button>
            </div>

            {/* Playback Progress Bar */}
            {isPlaying && (
                <div className="w-full mt-2">
                    <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded">
                        <div
                            className="h-1 rounded bg-blue-500 dark:bg-white transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceBar;
