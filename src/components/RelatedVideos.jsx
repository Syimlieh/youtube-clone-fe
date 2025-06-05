import { useDispatch, useSelector } from "react-redux";
import RelatedVideoCard from "./RelatedVideoCard";
import useWindowWidth from "../hooks/useWindowWidth";
import VideoCard from "./VideoCard";
import useApiRequest from "../hooks/useGetQuery";
import { VIDEO_LIST_URL } from "../services/api/url.service";
import { API_BASE_URL } from "../lib/axios";
import { addVideos } from "../store/slice/video.slice";
import { useEffect } from "react";

const RelatedVideos = () => {
    const dispatch = useDispatch();
    const relatedVideo = useSelector((state) => state.videos.items);
    const size = useWindowWidth();

    const isSmallScreen = size < 1024;

    const URL = API_BASE_URL + VIDEO_LIST_URL;
    const { error, data } = useApiRequest(URL); // custom hook

    useEffect(() => {
        if (data && data.data) {
            dispatch(addVideos(data.data));
        }
    }, [data, error, dispatch]);

    return (
        <div className={`${isSmallScreen ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6" : "flex flex-col gap-4"}`}>
            {
                relatedVideo?.length && relatedVideo.map((item) =>
                    isSmallScreen ? ( // for small screen we use the Video Card and for desktop we use the new Related Videos
                        <VideoCard
                            key={item._id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            profile={item.profile}
                            channel={item.channel}
                            duration={item.duration}
                            views={item.views}
                            publishedAt={item.publishedAt}
                            url={item.url}
                        />
                    ) : (
                        <RelatedVideoCard
                            key={item.id}
                            title={item.title}
                            views={item.views}
                            channel={item.channel}
                            publishedAt={item.publishedAt}
                            thumbnail={item.thumbnail}
                            duration={item.duration}
                            videoId={item.videoId}
                        />
                    )
                )
            }
        </div>
    )
}

export default RelatedVideos