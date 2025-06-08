import { SlArrowDown } from "react-icons/sl";
import { formatUploadAt, formatViews } from "../utils/formatter.utils";
import { PiThumbsUp, PiThumbsDown } from "react-icons/pi";
import { useSelector } from "react-redux";
import { REPLIES_COMMENT_URL } from "../services/api/url.service";
import axiosInstance, { API_BASE_URL } from "../lib/axios";
import { useState } from "react";
import { addNewComment } from "../services/api/comment.service";
import { useNavigate } from "react-router-dom";
import EmojiPickerWrapper from "./EmojiWrapper";
import { GrEmoji } from "react-icons/gr";

const CommentItem = ({ commentId, userName, comment, profileFile, postedAt, likes, dislikes, replyCount, nestedReply = false }) => {
    const navigate = useNavigate();
    const [replies, setReplies] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [reply, setReply] = useState("");
    const [showAllReplies, setShowAllReplies] = useState(false);
    const [openEmoji, setOpenEmoji] = useState(false);

    const user = useSelector((state) => state.profile.value);
    const selectedVideo = useSelector((state) => state.videos.selected);

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        // if user is not logged in, we redirect to login page
        if (!user?._id || !reply.trim()) navigate("/auth/login");

        const payload = {
            videoId: selectedVideo?._id,
            comment: reply.trim(),
            parentCommentId: commentId,
        };

        const result = await addNewComment(payload);
        if (result?.data) {
            const URL = REPLIES_COMMENT_URL.replace(":id", commentId);
            const refreshed = await axiosInstance.get(URL);
            if (refreshed?.data?.data) {
                setReplies(refreshed.data.data || []);
                setReply("");
                setOpenEmoji(false);
                setShowReplyInput(false);
            }
        }
    };

    const handleShowCommentReply = async () => {
        setShowAllReplies(true);
        const URL = REPLIES_COMMENT_URL.replace(":id", commentId);
        const refreshed = await axiosInstance.get(URL);
        setReplies(refreshed.data.data || []);
    };

    const handleCancel = () => {
        setReply("");
        setShowReplyInput(false);
        setOpenEmoji(false);
    };

    return (
        <div className="flex gap-2 mt-8 items-start w-full">
            <img
                src={profileFile?.url}
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
            />
            <div className="w-full">
                <div className="flex gap-2">
                    <h3 className='text-sm leading-5 font-semibold'>{userName}</h3>
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
                    <p className="text-black text-sm font-semibold">{formatViews(dislikes)}</p>
                    {!nestedReply && <p className="text-sm font-semibold ml-4" onClick={() => setShowReplyInput(!showReplyInput)}>Reply</p>}
                </span>

                {showReplyInput && (
                    <form onSubmit={handleReplySubmit} className="flex flex-col gap-2 mt-3 w-full relative">
                        <input
                            type="text"
                            placeholder="Write a reply..."
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 px-2 py-1 bg-transparent text-sm"
                            autoFocus
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />

                        <div className="relative flex justify-between items-center">
                            <div className="absolute top-6 left-4 z-20">
                                {openEmoji && (
                                    <EmojiPickerWrapper onEmojiClick={(emoji) => setReply((prev) => prev + emoji)} />
                                )}
                            </div>
                            <GrEmoji
                                className="text-xl cursor-pointer text-gray-600"
                                onClick={() => setOpenEmoji(!openEmoji)}
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-1 text-md text-gray-700 hover:text-black cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!reply.trim()}
                                    className="px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 rounded-2xl cursor-pointer font-semibold"
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Show Replies Button if there is reply */}
                {replyCount > 0 && (
                    <button
                        className="px-3 py-2 flex gap-3 items-center cursor-pointer hover:bg-blue-100 text-blue-800 rounded-2xl w-fit text-md font-semibold"
                        onClick={() => {
                            if (!showAllReplies) {
                                handleShowCommentReply(); // fetch and show replies
                            } else {
                                setShowAllReplies(false); // just hide replies
                            }
                        }}
                    >
                        {/* we can use another icon or just rotate the existing one */}
                        <SlArrowDown className={showAllReplies ? "rotate-180 transition-transform" : "transition-transform"} />
                        {showAllReplies ? "Hide replies" : `${replyCount} ${replyCount > 1 ? "replies" : "reply"}`}
                    </button>
                )}

                {/* Replies List */}
                {showAllReplies &&
                    replies.length && replies.map((reply) => (
                        <CommentItem key={reply._id}
                            commentId={reply._id}
                            userName={reply?.userDetails?.channelId}
                            comment={reply.comment}
                            profileFile={reply?.userDetails?.profileFile}
                            postedAt={reply.createdAt}
                            likes={reply.likes}
                            dislikes={reply.dislikes}
                            replyCount={reply.replyCount}
                            nestedReply={true}
                        />
                    ))}
            </div>
        </div>
    )
}

export default CommentItem