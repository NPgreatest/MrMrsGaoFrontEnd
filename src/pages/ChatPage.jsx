import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-[120vw] hp[70vh] flex">
                <ChatWindow className="flex-grow h-full w-full" />
            </div>
        </div>
    );
};

export default ChatPage;
