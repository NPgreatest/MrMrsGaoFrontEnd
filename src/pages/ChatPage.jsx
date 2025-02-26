import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import VideoList from "../components/VideoList";

const ChatPage = () => {
    const [videoLinks, setVideoLinks] = useState([]); // Manage video links at the top level

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className={`flex ${videoLinks.length > 0 ? "w-[90vw]" : "w-[60vw]"} h-[90vh] transition-all duration-300`}>
                {/* Chat Window with setVideoLinks prop */}
                <ChatWindow className="flex-grow h-full" setVideoLinks={setVideoLinks} />

                {/* Video List - Only shown if videoLinks exist */}
                {videoLinks.length > 0 && (
                    <div className="w-2/5 p-4">
                        <VideoList videoLinks={videoLinks} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
