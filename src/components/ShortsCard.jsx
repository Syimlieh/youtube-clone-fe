import { formatUploadAt, formatViews } from "../utils/formatter.utils"

const ShortsCard = ({ title, thumbnail, views, publishedAt, duration }) => {
  return (
      <div className='flex flex-col rounded-xl'>
          <div>
              <div className='relative aspect-[9/16]'>
                <img src={thumbnail} alt={title + thumbnail} className='w-full object-cover h-full rounded-2xl ' />
                <p className='absolute right-2 bottom-2 bg-black text-slate-50 p-1'>{duration}</p>
              </div>
               <div className='flex flex-col gap-2 mt-2'>
                    <h3 className='text-base font-bold'>{title}</h3>
                    <span className='flex gap-2 items-center'>
                        <p className='text-gray-500 text-sm'>{formatViews(views)} Views</p>
                        <p className='text-gray-500 text-sm'>{formatUploadAt(publishedAt)}</p>
                    </span>
                </div>
        </div>
    </div>
  )
}

export default ShortsCard