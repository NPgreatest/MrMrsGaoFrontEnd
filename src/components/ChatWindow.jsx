import { useState, useEffect } from "react";
import { postChatMessage, postTTSMessage } from "../api/chatApi";
import ChatMessage from "./ChatMessage";
import SuggestionOptions from "./SuggestionOptions";
import LoadingIndicator from "./LoadingIndicator";
import VideoList from "./VideoList";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [videoLinks, setVideoLinks] = useState([]);
    const [suggestVideos, setSuggestVideos] = useState(true);
    const [generateAudio, setGenerateAudio] = useState(true);
    const [isPC, setIsPC] = useState(false);


    useEffect(() => {
        // Detect if the device is a PC
        const userAgent = window.navigator.userAgent;
        const isDesktop = !/Mobi|Android|iPhone|iPad/i.test(userAgent);
        setIsPC(isDesktop);

        // Load messages from local storage
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
                    const botReply = { role: "bot", content: response.llm_response, isGenerating: true };
                    setMessages((prev) => [...prev, botReply]);

                    if (suggestVideos) {
                        setVideoLinks(response.video_links?.length > 0 ? response.video_links : []);
                    }

                    if (generateAudio) {
                        postTTSMessage(response.llm_response)
                            .then((ttsResponse) => {
                                if (ttsResponse) {
                                    try {
                                        const byteArray = new Uint8Array(ttsResponse);
                                        const audioBlob = new Blob([byteArray], { type: "audio/wav" });

                                        setMessages((prev) =>
                                            prev.map((msg) =>
                                                msg.content === response.llm_response
                                                    ? { ...msg, audioBlob, isGenerating: false }
                                                    : msg
                                            )
                                        );
                                    } catch (error) {
                                        console.error("Error processing TTS audio:", error);
                                    }
                                } else {
                                    console.error("TTS response did not contain valid audio data");
                                }
                            })
                            .catch((error) => {
                                console.error("TTS request failed:", error);
                            });
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

    return (
        <div className={`flex flex-col w-screen h-[calc(100vh-8rem)] overflow-hidden ${isPC ? "flex items-center justify-center bg-gray-200" : ""}`}>
            {/* Container Box for PC */}
            {/* <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}

            <div className={`${isPC ? "w-3/4 max-w-8xl bg-white shadow-lg rounded-3xl p-6" : "w-9/10"} flex flex-col h-full`}>

                {/* Chat Messages */}
                <div className="flex flex-col flex-grow space-y-4 overflow-y-auto px-4 mt-4">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && <LoadingIndicator />}
                    {videoLinks.length > 0 && <VideoList videoLinks={videoLinks} />}
                </div>

                {/* Suggestion Options */}
                <SuggestionOptions onSelect={setMessage} />

                {/* Input Area */}
                <div className="flex items-center mt-4 border-t border-gray-300 pt-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 p-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
