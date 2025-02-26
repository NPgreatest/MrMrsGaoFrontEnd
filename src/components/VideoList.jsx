const VideoList = ({ videoLinks }) => {
    if (!videoLinks || videoLinks.length === 0) return null;

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold text-white mb-3">相关视频</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoLinks.map((link, index) => (
                    <div key={index} className="border border-neon-blue p-2 rounded-lg bg-black">
                        <iframe
                            width="100%"
                            height="200"
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
