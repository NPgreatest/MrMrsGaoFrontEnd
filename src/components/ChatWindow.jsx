import { useState, useEffect } from "react";
import { postChatMessage } from "../api/chatApi";
import ChatMessage from "./ChatMessage";
import SuggestionOptions from "./SuggestionOptions";
import LoadingIndicator from "./LoadingIndicator";

const ChatWindow = ({ setVideoLinks }) => {  // Receive setVideoLinks from ChatPage
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                    
                    // Update video links in ChatPage state
                    if (response.video_links && response.video_links.length > 0) {
                        setVideoLinks(response.video_links);
                    } else {
                        setVideoLinks([]); // Clear videos if no links
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
        <div className={`flex ${setVideoLinks ? "w-3/5" : "w-full"} max-w-7xl mx-auto p-6 rounded-3xl backdrop-blur-md bg-black/50 border border-neon-blue shadow-xl shadow-neon-blue/50 transition-all duration-300`}>
            <div className="w-full">
                <h2 className="text-3xl font-bold text-white mb-5 text-center neon-text">老高答疑室</h2>

                {/* Chat Messages */}
                <div className="flex flex-col space-y-4 h-[60vh] overflow-y-auto px-4">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && <LoadingIndicator />}
                </div>

                {/* Suggestion Options */}
                <SuggestionOptions onSelect={handleSuggestionClick} />

                {/* Input Area */}
                <div className="flex items-center mt-4 border-t border-neon-blue pt-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 p-2 rounded-lg bg-black text-white border border-neon-blue focus:outline-none focus:ring focus:ring-neon-blue"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
