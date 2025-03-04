import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import VoiceBar from "./VoiceBar";

const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";
    const name = isUser ? "五岁抬头团" : "AI老高";
    const [isGenerating, setIsGenerating] = useState(message.isGenerating);
    const [isMobile, setIsMobile] = useState(false);

    // Detect if user is on a mobile device
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileCheck = /android|iphone|ipad|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent);
            const widthCheck = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(mobileCheck || widthCheck);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className={`flex flex-col max-w-[70%] ${isUser ? "self-end items-end" : "self-start items-start"}`}>
            <p className={`text-sm font-bold text-gray-300 ${isUser ? "text-right" : "text-left"} ${isMobile ? "mb-0" : "mb-1"}`}>{name}</p>

            <div
                className={`p-${isMobile ? "3" : "5"} rounded-xl shadow-md transition-all duration-300 
                    ${isUser
                        ? "bg-neon-blue/20 border border-neon-blue text-white shadow-neon-blue/50"
                        : "bg-neon-purple/20 border border-neon-purple text-white shadow-neon-purple/50"
                    }`}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>

                {/* Show voice generation indicator */}
                {isGenerating && !message.audioBlob && (
                    <p className="text-gray-400 text-sm mt-2 animate-pulse">
                        🎙️ 生成老高的语音中<span className="dot-animation">...</span>
                    </p>
                )}

                {/* Show VoiceBar when audio is ready */}
                {message.audioBlob && <VoiceBar audioBlob={message.audioBlob} />}
            </div>
        </div>
    );
};

export default ChatMessage;
