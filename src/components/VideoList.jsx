import VideoCard from './VideoCard';
import { useSelector } from "react-redux";

const VideoList = () => {
    const videos = useSelector((state) => state.videos.items);
    const toggle = useSelector((state) => state.toggle.sidebar);

    return (
        // will move to the left as per our fixed sidebar but only on bigger screen
        <div className={`relative top-38 ${!toggle ? "md:ml-18" : "md:ml-64"}  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {
                videos && videos.map((item) => (
                    <VideoCard
                        key={item.id}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        profile={item.profile}
                        channel={item.channel}
                        duration={item.duration}
                        views={item.views}
                        publishedAt={item.publishedAt}
                    />
                ))
            }
        </div>
    )
}

export default VideoList