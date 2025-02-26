import { useState, useEffect } from "react";
import { postChatMessage } from "../api/chatApi";
import ChatMessage from "./ChatMessage";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    // Load messages from localStorage on component mount
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        setMessages(storedMessages);
    }, []);

    // Save messages to localStorage whenever messages update
    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = { role: "user", content: message };
            setMessages([...messages, newMessage]);
            setMessage("");

            try {
                const response = await postChatMessage({
                    query: message
                });
                console.log("Response from API:", response);
                if (response && response.llm_response) {
                    const botReply = { role: "bot", content: response.llm_response };
                    setMessages((prev) => [...prev, botReply]);
                } else {
                    console.error("Invalid response format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch response:", error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-neon-blue shadow-xl shadow-neon-blue/50">
            <h2 className="text-3xl font-bold text-white mb-5 text-center neon-text">Chat Messages</h2>

            {/* Chat Messages */}
            <div className="flex flex-col space-y-4 h-[60vh] overflow-y-auto px-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
            </div>

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
                    className="ml-4 px-4 py-2 bg-neon-blue text-black rounded-lg hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
