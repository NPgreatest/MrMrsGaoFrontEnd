const NavigationBar = ({ currentPage, setCurrentPage }) => {
    return (
        <nav className="w-full bg-gray-900 bg-opacity-80 text-white p-2 shadow-md fixed top-0 flex justify-between items-center z-40 backdrop-blur-md">
            <h2 className="text-xl font-bold transition-transform transform hover:scale-105">老高AI</h2>
            <div className="flex space-x-4">
                {[
                    { name: "AI Query", key: "ai-query" },
                    { name: "About", key: "about" },
                    { name: "Statistics", key: "statistics" }
                ].map(({ name, key }) => (
                    <button
                        key={key}
                        onClick={() => setCurrentPage(key)}
                        className={`px-3 py-1 rounded-md transition-all duration-300 hover:bg-gray-700 ${currentPage === key ? "bg-blue-500" : ""}`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBar;
