import { useState, useEffect } from "react";
import { postChatMessage, postTTSMessage } from "../api/chatApi";
import ChatMessage from "./ChatMessage";
import SuggestionOptions from "./SuggestionOptions";
import LoadingIndicator from "./LoadingIndicator";
import VideoList from "./VideoList";
import VoiceBar from "./VoiceBar";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [videoLinks, setVideoLinks] = useState([]);
    const [suggestVideos, setSuggestVideos] = useState(true);
    const [generateAudio, setGenerateAudio] = useState(true);

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
        <div className="flex flex-col w-screen h-screen  overflow-hidden">


            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-center flex-1 text-white">老高AI数字人</h2>
            <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300">建议视频</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={suggestVideos}
                                onChange={() => setSuggestVideos(!suggestVideos)}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-green-500 transition"></div>
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300">语音</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={generateAudio}
                                onChange={() => setGenerateAudio(!generateAudio)}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-green-500 transition"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-grow space-y-4 overflow-y-auto px-4 mt-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && <LoadingIndicator />}
                {videoLinks.length > 0 && <VideoList videoLinks={videoLinks} />}
            </div>

            <SuggestionOptions onSelect={setMessage} />

            <div className="flex items-center mt-4 border-t border-[var(--input-border,#ccc)] pt-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 p-2 
                        bg-[var(--input-bg,#fff)] 
                        text-[var(--text-color,#000)] 
                        border border-[var(--input-border,#ccc)] 
                        rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-3 py-1 rounded-lg transition-colors flex-shrink-0 
                        bg-[var(--button-bg,#007bff)] 
                        text-[var(--text-color)] hover:bg-[var(--button-hover)]"
                >
                    Send
                </button>
            </div>

        </div>
    );
};

export default ChatWindow;
