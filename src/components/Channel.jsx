import { useDispatch, useSelector } from 'react-redux';
import { formatViews } from '../utils/formatter.utils';
import VideoCard from './VideoCard';
import VideoUploadModal from './VideoUploadModal';
import { useState } from 'react';
import { addVideos, setSelectedVideo } from '../store/slice/video.slice';
import { VIDEO_LIST_URL } from '../services/api/url.service';
import axiosInstance from '../lib/axios';
import { deleteVideo } from '../services/api/video.service';
import toast from 'react-hot-toast';

const Channel = () => {
    const [showModal, setShowModal] = useState(false)
    const videos = useSelector((state) => state.videos.items);
    const channelData = useSelector((state) => state.profile.staticChannelData);
    const toggle = useSelector((state) => state.toggle.sidebar);
    const user = useSelector((state) => state.profile.value);
    const selectedVideo = useSelector((state) => state.videos.selected);

    const dispatch = useDispatch();

    // will get the user details and display if exist else will display some default value
    const { profileFile = {}, channelId } = user || {};

    // this is static data currently
    const { banner, channelName, subscriberCount, description } = channelData || {};

    const handleEdit = (video) => {
        dispatch(setSelectedVideo(video));
        setShowModal(true);
    };
    const handleAddVideo = () => {
        dispatch(setSelectedVideo(null));
        setShowModal(true);
    };

    const handleDelete = async (videoId) => {
        try {
            await deleteVideo(videoId);
            const refreshed = await axiosInstance.get(VIDEO_LIST_URL);
            dispatch(addVideos(refreshed.data.data));
            toast.success('Video deleted!');
        } catch (err) {
            toast.error('Failed to delete video.');
        }
    };

    return (
        <div className={`mx-auto px-4 py-16 ${!toggle ? "md:ml-34 w-[85%]" : "md:ml-72 w-4/5"}`}>
            {/* modal to update or upload a new video  */}
            <VideoUploadModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedVideo(null);
                }}
                video={selectedVideo}
            />
            {/* banner section view channel */}
            {banner && (
                <div className="w-full h-40 md:h-60 rounded-xl mb-6">
                    <img
                        src={banner}
                        alt="Channel Banner"
                        className="w-full h-full object-center"
                    />
                </div>
            )}
            {/* Channel Header */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={profileFile?.url || "/images/default-avatar.jpg"}
                    alt="Channel Logo"
                    className="w-50 h-50 rounded-full"
                />
                <div className='flex flex-col gap-2'>
                    <h2 className="text-4xl font-bold text-black">{channelName}</h2>
                    <p className="text-sm text-gray-600">{channelId || `@${channelName}`} · {formatViews(subscriberCount)} subscribers · {formatViews(videos.length)} videos</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
                    <div className="mt-2 flex gap-2">
                        <button className="text-white lg:text-sm 3xl:text-lg h-10 2xl:h-12 font-medium flex items-center bg-gray-900 rounded-full px-4 md:px-4 cursor-pointer hover:bg-gray-900">
                            Subscribe
                        </button>
                        <button className="border border-gray-400 3xl:text-lg h-10 2xl:h-12 font-medium flex items-center rounded-full px-4 md:px-4 cursor-pointer">Join</button>
                        <button className="text-white lg:text-sm 3xl:text-lg h-10 2xl:h-12 font-medium flex items-center bg-gray-900 rounded-full px-4 md:px-4 cursor-pointer hover:bg-gray-900" onClick={() => handleAddVideo()}>
                            Upload Video
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs for different section in view channel */}
            <div className="flex gap-6 border-b border-gray-300 mb-4">
                <button className="border-b-2 border-black font-semibold pb-2">Videos</button>
            </div>

            {/* Video Grid for view channel */}
            {/* as per requirement it asking to show only video with match channelId.
            But channelId is linked with actual user and videos are static and not related to any channels
            if we configure dynamic videos then we can linked the user with the video and display according to channelId
            For now i just display all the videos as an example
            */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}>
                {videos.map((item) => (
                    <div key={item.videoId} className="relative">
                        <VideoCard
                            key={item.id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            profile={item.profile}
                            channel={item.channel}
                            duration={item.duration}
                            views={item.views}
                            publishedAt={item.publishedAt}
                            url={item.url}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                className="text-sm px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-sm px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50"
                                onClick={() => handleDelete(item?._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Channel