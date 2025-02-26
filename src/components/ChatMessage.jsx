import React from "react";
import ReactMarkdown from "react-markdown";


const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";
    const name = isUser ? "五岁抬头团" : "AI老高";

    return (
        <div className={`flex flex-col max-w-[70%] ${isUser ? "self-end items-end" : "self-start items-start"}`}>
            <p className={`text-sm font-bold text-gray-300 mb-1 ${isUser ? "text-right" : "text-left"}`}>{name}</p>
            <div
                className={`p-5 rounded-xl shadow-md transition-all duration-300 
                    ${isUser
                        ? "bg-neon-blue/20 border border-neon-blue text-white shadow-neon-blue/50"
                        : "bg-neon-purple/20 border border-neon-purple text-white shadow-neon-purple/50"
                    }`}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatMessage;
