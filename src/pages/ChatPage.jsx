import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";


const ChatPage = () => {
    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden">
            <div className="flex flex-1">
                <ChatWindow />
            </div>
        </div>
    );
};



export default ChatPage;
