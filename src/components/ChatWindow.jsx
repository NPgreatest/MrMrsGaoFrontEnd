import { useState, useEffect } from "react";
import { postChatMessage } from "../api/chatApi";
import ChatMessage from "./ChatMessage";
import SuggestionOptions from "./SuggestionOptions";
import LoadingIndicator from "./LoadingIndicator";
import VideoList from "./VideoList"; // Import VideoList component


const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [videoLinks, setVideoLinks] = useState([]);
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;


    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        setMessages(storedMessages);
    }, []);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = { role: "user", content: message };
            setMessages([...messages, newMessage]);
            setMessage("");
            setIsLoading(true);

            try {
                const response = await postChatMessage({ query: message });

                if (response?.llm_response) {
                    const botReply = { role: "bot", content: response.llm_response };
                    setMessages((prev) => [...prev, botReply]);

                    if (response.video_links?.length > 0) {
                        setVideoLinks(response.video_links);
                    } else {
                        setVideoLinks([]);
                    }
                } else {
                    console.error("Invalid response format:", response);
                    setMessages((prev) => [
                        ...prev,
                        { role: "bot", content: "抱歉，AI 老高无法回答你的问题，请稍后再试。" },
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch response:", error);
                setMessages((prev) => [
                    ...prev,
                    { role: "bot", content: "❌ 出错了！请检查网络或稍后重试。" },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setMessage(suggestion);
    };

    return (
        <div className="flex flex-col w-screen h-screen p-6 bg-[var(--background-color)] text-[var(--text-color)] overflow-hidden">
            <h2 className="text-3xl font-bold mb-5 text-center">老高答疑室</h2>

            {/* Chat Messages */}
            <div className="flex flex-col flex-grow space-y-4 overflow-y-auto px-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && <LoadingIndicator />}
                {/* Display suggested videos within the chat window */}
                {videoLinks.length > 0 && <VideoList videoLinks={videoLinks} />}
            </div>

            {/* Suggestion Options */}
            <SuggestionOptions onSelect={handleSuggestionClick} />

            {/* Input Area */}
            <div className="flex items-center mt-4 border-t border-[var(--input-border)] pt-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 p-2 bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--input-border)] rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-3 py-1 rounded-lg transition-colors flex-shrink-0 bg-[var(--button-bg)] text-[var(--text-color)] hover:bg-[var(--button-hover)]"
                >
                    Send
                </button>
            </div>
        </div>
    );

};

export default ChatWindow;
