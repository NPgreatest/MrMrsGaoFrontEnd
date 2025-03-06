import React, { useState, useEffect } from "react";

const StatisticsPage = () => {
    const [randomMessages, setRandomMessages] = useState([]);

    useEffect(() => {
        // Retrieve past messages from localStorage
        const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        
        // Select 5 random messages
        const shuffled = storedMessages.sort(() => 0.5 - Math.random());
        setRandomMessages(shuffled.slice(0, 5));
    }, []);

    return (
        <div className="flex flex-col  w-screen h-[calc(100vh-8rem)] items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Chat Statistics</h1>
                <p className="text-gray-600 mb-4">Coming Soon</p>

                <div className="space-y-4">
                    {randomMessages.length > 0 ? (
                        randomMessages.map((msg, index) => (
                            <div key={index} className={`p-4 rounded-xl shadow-md ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                                <p className="text-sm font-bold">{msg.role === "user" ? "You" : "AI 老高"}:</p>
                                <p className="text-gray-800">{msg.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No data available now...</p>
                            
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
