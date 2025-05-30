import { selectChannel, selectVideoCountByChannel } from '../store/slice/video.slice';
import { useSelector } from 'react-redux';
import { formatViews } from '../utils/formatter.utils';
import VideoCard from './VideoCard';

const Channel = ({ channelId }) => {
    const videos = useSelector((state) => state.videos.items);
    const channelData = useSelector((state) => selectChannel(state, channelId));
    const toggle = useSelector((state) => state.toggle.sidebar);

    const { channel, profile, banner, subscriberCount, description } = channelData || {};

    const videoCount = useSelector((state) => selectVideoCountByChannel(state, channelId));

    return (
        <div className={`mx-auto px-4 py-16 ${!toggle ? "md:ml-34 w-[85%]" : "md:ml-72 w-4/5"}`}>
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
                    src={profile}
                    alt="Channel Logo"
                    className="w-50 h-50 rounded-full"
                />
                <div className='flex flex-col gap-2'>
                    <h2 className="text-4xl font-bold text-black">{channel}</h2>
                    <p className="text-sm text-gray-600">{channelId} · {formatViews(subscriberCount)} subscribers · {formatViews(videoCount)} videos</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
                    <div className="mt-2 flex gap-2">
                        <button className="text-white lg:text-sm 3xl:text-lg h-10 2xl:h-12 font-medium flex items-center bg-gray-900 rounded-full px-4 md:px-4 cursor-pointer hover:bg-gray-900">
                            Subscribe
                        </button>
                        <button className="border border-gray-400 3xl:text-lg h-10 2xl:h-12 font-medium flex items-center rounded-full px-4 md:px-4 cursor-pointer">Join</button>
                    </div>
                </div>
            </div>

            {/* Tabs for different section in view channel */}
            <div className="flex gap-6 border-b border-gray-300 mb-4">
                <button className="border-b-2 border-black font-semibold pb-2">Videos</button>
            </div>

            {/* Video Grid for view channel */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}>
                {videos.length && videos.map((item) => (
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
                ))}
            </div>
        </div>
    )
}

export default Channel