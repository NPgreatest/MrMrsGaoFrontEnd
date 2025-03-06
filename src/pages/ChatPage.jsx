import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import NavigationBar from "../components/NavigationBar";
import AboutPage from "../components/AboutPage";
import StatisticsPage from "../components/StatisticsPage";

const ChatPage = () => {
    const [currentPage, setCurrentPage] = useState("ai-query");

    return (
        <div className="flex flex-col h-screen bg-gray-200">
            {/* Navigation Bar */}
            <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {/* Render Different Pages Based on Navigation Selection */}
            <div className="flex flex-grow mt-16">
                {currentPage === "ai-query" && <ChatWindow />}
                {currentPage === "about" && <AboutPage />}
                {currentPage === "statistics" && <StatisticsPage />}
            </div>
        </div>
    );
};

export default ChatPage;
