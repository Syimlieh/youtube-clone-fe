import { Link, useSearchParams } from "react-router-dom";
import { selectVideoById, setSelectedVideo } from "../store/slice/video.slice";
import { useDispatch, useSelector } from "react-redux";
import { formatViews } from "../utils/formatter.utils";
import { PiThumbsUp, PiThumbsDown, PiShareFatLight, PiDotsThreeLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import RelatedVideos from "./RelatedVideos";
import Comments from "./Comments";
import VideoDescription from "./VideoDescription";
import { API_BASE_URL } from "../lib/axios";
import { VIDEO_DETAIL_URL } from "../services/api/url.service";
import useApiRequest from "../hooks/useGetQuery";

const VideoView = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const toggle = useSelector((state) => state.toggle.sidebar);

  const videoFromStore = useSelector((state) => selectVideoById(state, videoId));

  // URL can be safely built regardless
  const URL = API_BASE_URL + VIDEO_DETAIL_URL.replace(':id', videoId);

  // Always call hook
  const { data } = useApiRequest(URL);

  const video = videoFromStore || data?.data;

  dispatch(setSelectedVideo(video));

  const { title, views, likes, profile, channel, channelId, publishedAt, subscriberCount, description } = video || {};

  return (
    <div className={`flex flex-col m-auto xl:flex-row gap-6 max-w-screen-[2314px] 3xl:w-9/10 px-4 py-22`}>
      {toggle && <div className="absolute top-0 left-0 w-screen h-screen bg-gray-800 opacity-30 z-10"></div>}
      {/* Video Player */}
      <div className="w-full xl:w-[70%]">
        <div className="aspect-video rounded-xl overflow-hidden shadow-md">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        {/* Video title */}
        <h1 className="text-base 2xl:text-xl font-bold mt-4">
          {title}
        </h1>

        {/* Views, Sub, Date, and Like/Dislike and Download*/}
        <div className="flex justify-between items-center flex-wrap text-sm mt-2 text-slate-950">
          <div className="flex gap-4 xsm:gap-2 2xl:gap-4 items-center mb-2">
            <Link to={`/channel/${channelId}`} className="flex gap-4 xsm:gap-2 2xl:gap-4 items-center mb-2">
              <img src={profile} alt='channel profile' className='w-10 h-10 2xl:w-12 2xl:h-12 rounded-full' />
              <div>
                <h3 className="text-base 2xl:text-xl font-bold">{channel}</h3>
                <p className="text-xs text-gray-700">{formatViews(subscriberCount)} subscribers</p>
              </div>
            </Link>
            <p className="text-white lg:text-sm 3xl:text-lg h-8 2xl:h-10 font-medium flex items-center bg-gray-900 rounded-full px-4 md:px-4 cursor-pointer hover:bg-gray-900">
              Subscribe
            </p>
          </div>
          <div className="flex gap-4 xsm:gap-2 2xl:gap-4 items-center">
            <span className="flex items-center tiny-2 gap-2 tiny:gap-4 xsm:gap-2 bg-gray-100 rounded-full px-2 py-1.5 cursor-pointer hover:bg-gray-200">
              <PiThumbsUp className="cursor-pointer text-lg  2xl:text-3xl" />
              <p className="text-black text-sm font-semibold">{formatViews(likes)}</p>
              <div className="w-px h-4 bg-gray-400 mx-2" />
              <PiThumbsDown className="text-lg  2xl:text-3xl" />
            </span>
            <span className="flex items-center gap-2 bg-gray-100 rounded-full px-2 tiny:px-4 xsm:px-2 md:px-4 py-1.5 cursor-pointer hover:bg-gray-200">
              <PiShareFatLight className="cursor-pointer text-lg  2xl:text-3xl" />
              <p className="text-black text-sm font-semibold 2xl:text-base">Share</p>
            </span>
            <span className="hidden tiny:flex xsm:hidden 2xl:flex items-center gap-2 bg-gray-100 rounded-full px-2 tiny:px-4 xsm:px-2 md:px-4 py-1.5 cursor-pointer hover:bg-gray-200">
              <LiaDownloadSolid className="cursor-pointer text-lg  2xl:text-3xl" />
              <p className="text-black text-base font-semibold">Download</p>
            </span>
            <span className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">
              <PiDotsThreeLight className="text-lg  2xl:text-3xl" />
            </span>
          </div>
        </div>
        {
          video && <VideoDescription views={views} channel={channel} profile={profile} subscriberCount={subscriberCount} publishedAt={publishedAt} description={description} likes={likes} />
        }
        <Comments />
      </div>

      <div className="w-full xl:w-[30%]">
        <RelatedVideos />
      </div>
    </div>
  );
};

export default VideoView;