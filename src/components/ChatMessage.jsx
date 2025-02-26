const ChatMessage = ({ message }) => {
    return (
        <div
            className={`p-5 rounded-xl shadow-md transition-all duration-300 max-w-[70%] 
                ${message.role === "user"
                    ? "bg-neon-blue/20 border border-neon-blue text-white self-end shadow-neon-blue/50 ml-auto"
                    : "bg-neon-purple/20 border border-neon-purple text-white self-start shadow-neon-purple/50 mr-auto"
                }`}
        >
            <p className="text-lg">{message.content}</p>
        </div>
    );
};

export default ChatMessage;
