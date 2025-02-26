import { useEffect, useState } from "react";

const SuggestionOptions = ({ onSelect }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Load questions from the local questions.txt file
    const fetchQuestions = async () => {
        try {
            const response = await fetch("/questions.txt"); // Fetch from public folder
            const text = await response.text();
            const questions = text.split("\n").map(q => q.trim()).filter(q => q);
            setAllQuestions(questions);
            generateSuggestions(questions);
        } catch (error) {
            console.error("Error loading questions:", error);
        }
    };

    const generateSuggestions = (questions) => {
        if (questions.length > 0) {
            const shuffled = [...questions].sort(() => 0.5 - Math.random());
            setSuggestions(shuffled.slice(0, 4)); // Pick 4 random questions
        }
    };

    return (
        <div className="flex flex-col items-start space-y-2 my-4">
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(suggestion)}
                        className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        {suggestion}
                    </button>
                ))}
                {/* Change Batch Button with Emoji */}
                <button
                    onClick={() => generateSuggestions(allQuestions)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    🔄
                </button>
            </div>
        </div>
    );
};

export default SuggestionOptions;
