const VideoList = ({ videoLinks }) => {
    if (!videoLinks || videoLinks.length === 0) return null;

    return (
        <div className="bg-black/50 border border-neon-blue p-4 rounded-lg shadow-md shadow-neon-blue/50">
            <h3 className="text-xl font-bold text-white mb-3">相关视频推荐</h3>
            <div className="grid grid-cols-1 gap-4">
                {videoLinks.map((link, index) => (
                    <div key={index} className="border border-neon-blue p-2 rounded-lg bg-black">
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
                            title="YouTube video"
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
