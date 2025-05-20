import { formatViews, formatUploadAt } from '../utils/formatter.utils.js'
import { Link } from 'react-router-dom'

const VideoCard = ({ title, channel, profile, thumbnail, views, publishedAt, duration, url }) => {
    return (
        <div className='relative flex flex-col gap-4'>
            <Link to={`/watch/?v=${url.split("=")[1]}`}>
                <div className='relative'>
                    <img src={thumbnail} alt={title} className='w-full h-full rounded-2xl ' />
                    <p className='absolute right-2 bottom-2 bg-black text-slate-50 p-1'>{duration}</p>
                </div>
            </Link>
            <div className='flex gap-4'>
                <img src={profile} alt='channel profile' className='w-12 h-12 rounded-full' />
                <div className=''>
                    <Link to={`/watch/?v=${url.split("=")[1]}`}>
                        <h3 className='text-base font-bold line-clamp-2'>{title}</h3>
                    </Link>
                    <p className='text-sm text-gray-500 font-medium'>{channel}</p>
                    <span className='flex gap-2 items-center'>
                        <p className='text-gray-500 text-sm'>{formatViews(views)} Views</p>
                        <span className='rounded-full w-1 h-1 bg-gray-500'></span>
                        <p className='text-gray-500 text-sm'>{formatUploadAt(publishedAt)}</p>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default VideoCard