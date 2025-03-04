import React from "react";

const VideoList = ({ videoLinks }) => {
    if (!videoLinks || videoLinks.length === 0) return null;

    return (
        <div className="flex flex-col max-w-[70%] self-start items-start">
            <p className="text-sm font-bold text-gray-300 mb-1">AI老高</p>
            <div className="p-5 rounded-xl shadow-md bg-neon-purple/20 border border-neon-purple text-white shadow-neon-purple/50">
                <p className="mb-3 font-semibold">相关视频推荐：</p>
                

                {/* Scrollable box for the remaining videos */}
                {videoLinks.length > 1 && (
                    <div className="max-h-[200px] overflow-y-auto space-y-4 border border-gray-600 p-3 rounded-lg bg-black">
                        {videoLinks.map((link, index) => {
                            const videoId = new URL(link).searchParams.get("v");
                            return (
                                <div key={index} className="border border-gray-500 p-2 rounded-lg bg-gray-900">
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title="YouTube video"
                                        allowFullScreen
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoList;
