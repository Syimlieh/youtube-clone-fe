import { SlArrowDown } from "react-icons/sl";
import { formatUploadAt, formatViews } from "../utils/formatter.utils";
import { PiThumbsUp, PiThumbsDown } from "react-icons/pi";

const CommentItem = ({ userName, comment, postedAt, likes }) => {
    return (
        <div className="flex gap-2 mt-8 items-start">
            <img
                src="/images/profile.jpg"
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
            />
            <div>
                <div className="flex gap-2">
                    <h3 className='text-sm leading-5 font-semibold'>@{userName}</h3>
                    <p className="text-gray-700 text-sm">{formatUploadAt(postedAt)} ago</p>
                </div>
                <h3 className='text-md'>{comment}</h3>
                <span className="flex items-center tiny-2 gap-2 cursor-pointer ">
                    <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                            <PiThumbsUp className="text-lg text-black" />
                        </div>
                        <p className="text-black text-sm font-semibold">{formatViews(likes)}</p>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                        <PiThumbsDown className="text-lg text-black" />
                    </div>
                    <p className="text-sm font-semibold ml-4">Reply</p>
                </span>
                <div className="px-3 py-2 flex gap-3 items-center cursor-pointer hover:bg-blue-100 text-blue-800 rounded-2xl w-fit text-md font-semibold">
                    <SlArrowDown />
                    <p>3 replies</p>
                </div>
            </div>
        </div>

    )
}

export default CommentItem