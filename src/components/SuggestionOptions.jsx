import { useEffect, useState, useRef } from "react";

const SuggestionOptions = ({ onSelect }) => {
    const [suggestions, setSuggestions] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const text = await (await fetch("/questions.txt")).text();
                const questions = text.split("\n").map(q => q.trim()).filter(Boolean);
                setSuggestions([...questions].sort(() => 0.5 - Math.random()).slice(0, 4));
            } catch (error) {
                console.error("Error loading questions:", error);
            }
        })();
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="flex gap-2 my-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            {suggestions.map((q, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(q)}
                    className="px-3 py-1 rounded-lg transition-colors flex-shrink-0 bg-[var(--button-bg)] text-[var(--text-color)] hover:bg-[var(--button-hover)]"
                >
                    {q}
                </button>
            ))}
        </div>
    );
};

export default SuggestionOptions;
