
import React from "react";

const LoadingIndicator = () => {
    return (
        <div className="flex items-center space-x-2 text-gray-900">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></span>
            <p>AI 老高思考中...</p>
        </div>
    );
};

export default LoadingIndicator;
