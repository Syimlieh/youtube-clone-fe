import { Link } from "react-router-dom";
import { formatUploadAt, formatViews } from "../utils/formatter.utils";

// component for all related video shown in video detail
// desctructure item
const RelatedVideoCard = ({ thumbnail, title, duration, channel, views, publishedAt, videoId }) => {
    return (
        <div className="flex gap-2 w-full">
            <Link to={`/watch?v=${videoId}`} className="relative w-[45%] shrink-0">
                <img src={thumbnail} alt={title} className='w-full h-full rounded-2xl' />
                <p className='text-tiny absolute right-2 bottom-2 bg-black rounded font-semibold text-slate-50 p-0.5 z-10'>{duration}</p>
            </Link>
            <div className="flex flex-col text-gray-500 w-[55%]">
                <Link to={`/watch?v=${videoId}`}>
                    <h3 className="text-base font-bold line-clamp-2">{title}</h3>
                </Link>
                <p>{channel}</p>
                <span className='flex gap-2 items-center'>
                    <p className='text-sm'>{formatViews(views)} Views</p>
                    <span className='rounded-full w-1 h-1 bg-gray-500'></span>
                    <p className=' text-sm'>{formatUploadAt(publishedAt)}</p>
                </span>
            </div>
        </div>
    )
}

export default RelatedVideoCard