import { useEffect } from 'react';
import useApiRequest from '../hooks/useGetQuery';
import { API_BASE_URL } from '../lib/axios';
import { VIDEO_LIST_URL } from '../services/api/url.service';
import { addVideos } from '../store/slice/video.slice';
import VideoCard from './VideoCard';
import { useDispatch, useSelector } from "react-redux";

const VideoList = () => {
    const dispatch = useDispatch();

    const videos = useSelector((state) => state.videos.items);
    const toggle = useSelector((state) => state.toggle.sidebar);

    const URL = API_BASE_URL + VIDEO_LIST_URL;
    const { error, data } = useApiRequest(URL); // custom hook

    useEffect(() => {

        if (data && data.data) {
            dispatch(addVideos(data.data));
        }
    }, [data, error, dispatch]);

    return (
        // will move to the left as per our fixed sidebar but only on bigger screen
        <div className={`relative top-38 ${!toggle ? "md:ml-18" : "md:ml-64"}  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {
                videos && videos.map((item) => (
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
                ))
            }
        </div>
    )
}

export default VideoList