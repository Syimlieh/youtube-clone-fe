import React from 'react'
import VideoCard from './VideoCard';
import { useSelector } from "react-redux";

const VideoList = () => {
    const videos = useSelector((state) => state.videos.items);

    return (
        <div className='grid grid-cols-3 gap-8'>
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