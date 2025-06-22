import { SlArrowDown } from "react-icons/sl";
import { formatUploadAt, formatViews } from "../utils/formatter.utils";
import { PiThumbsUp, PiThumbsDown, PiThumbsDownFill, PiThumbsUpFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { REPLIES_COMMENT_URL } from "../services/api/url.service";
import axiosInstance from "../lib/axios";
import { useState } from "react";
import { addNewComment, deleteComment, fetchCommentReplies, fetchVideoComments, updateComment } from "../services/api/comment.service";
import { useNavigate } from "react-router-dom";
import EmojiPickerWrapper from "./EmojiWrapper";
import { GrEmoji } from "react-icons/gr";
import { addNewCommentReaction, deleteCommentReaction } from "../services/api/reaction.service";
import { setComments } from "../store/slice/comment.slice";
import { BsThreeDotsVertical } from "react-icons/bs";
import SimpleModal from "./common/SimpleModal";
import toast from "react-hot-toast";

const actionItem = ["Edit", "Delete"];
const CommentItem = ({
    commentId, userName, comment, profileFile, postedAt, likes, dislikes, reactedByMe, replyCount, nestedReply = false, parentCommentId, parentSetReplies, myComment
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [replies, _setReplies] = useState(null);  // _ here is just naming convention to avoid naming conflict
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [reply, setReply] = useState("");
    const [showAllReplies, setShowAllReplies] = useState(false);
    const [openEmoji, setOpenEmoji] = useState(false);
    const setReplies = nestedReply ? parentSetReplies : _setReplies;
    // for a nested reply, don’t use my own setReplies
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);

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
        const refreshed = await fetchCommentReplies(commentId, user)
        setReplies(refreshed.data || []);
    };

    const handleCancel = () => {
        setReply("");
        setShowReplyInput(false);
        setOpenEmoji(false);
    };

    // update and add new reaction to comment
    const handleNewReaction = async (newIsLiked) => {
        try {
            if (!user) {
                navigate("/auth/login")
            }

            const videoId = selectedVideo._id;

            // Already reacted with same type  delete
            if (reactedByMe?.isLiked === newIsLiked) {
                await deleteCommentReaction(reactedByMe._id);
            } else {
                await addNewCommentReaction({ isLiked: newIsLiked, commentId });
            }

            // refetch nester comments
            if (nestedReply) {
                const refreshed = await fetchCommentReplies(parentCommentId, user)
                setReplies(refreshed.data || []);
            } else {
                // Top-level comment refetch all comments
                const refreshed = await fetchVideoComments(videoId, user);
                dispatch(setComments(refreshed.data || []));
            }
        } catch (err) {
            const resMessage = err?.response?.data?.message;

            if (typeof resMessage === 'string') {
                toast.error(resMessage);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const handleEditSubmit = async () => {
        try {
            await updateComment(commentId, { comment: editedComment });

            if (nestedReply && parentCommentId) {
                const refreshed = await fetchCommentReplies(parentCommentId, user);
                parentSetReplies(refreshed.data || []);
            } else if (selectedVideo?._id) {
                const refreshed = await fetchVideoComments(selectedVideo._id, user);
                dispatch(setComments(refreshed.data || []));
            }

            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update comment", err);
            const resMessage = err?.response?.data?.message;

            if (typeof resMessage === 'string') {
                toast.error(resMessage);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const handleModifyComment = async (action) => {
        if (action === "Edit") {
            setIsEditing(true);
            setShowOptions(false);
        } else if (action === "Delete") {
            try {
                await deleteComment(commentId);

                if (nestedReply && parentCommentId) {
                    const refreshed = await fetchCommentReplies(parentCommentId, user);
                    parentSetReplies(refreshed.data || []);
                } else if (selectedVideo?._id) {
                    const refreshed = await fetchVideoComments(selectedVideo._id, user);
                    dispatch(setComments(refreshed.data || []));
                }
            } catch (err) {
                const resMessage = err?.response?.data?.message;

                if (typeof resMessage === 'string') {
                    toast.error(resMessage);
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            } finally {
                setShowOptions(false);
            }
        }
    };

    return (
        <div className="flex gap-2 mt-8 items-start w-full justify-between">
            <div className="flex gap-2 items-start w-full">
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
                    {isEditing ? (
                        <div className="flex flex-col gap-2 mt-2 w-full relative">
                            <input
                                type="text"
                                placeholder="Write a reply..."
                                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 px-2 py-1 bg-transparent text-sm"
                                autoFocus
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
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
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-1 text-md text-gray-700 hover:text-black cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleEditSubmit}
                                        disabled={!editedComment.trim()}
                                        className="px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 rounded-2xl cursor-pointer font-semibold"
                                    >
                                        Update Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-md">{comment}</h3>
                    )}
                    <span className="flex items-center tiny-2 gap-2 cursor-pointer ">
                        <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => handleNewReaction(true)}>
                                {
                                    reactedByMe?.isLiked === true ? (
                                        <PiThumbsUpFill className="text-lg text-black" />
                                    ) : (
                                        <PiThumbsUp className="text-lg text-black" />
                                    )
                                }

                            </div>
                            <p className="text-black text-sm font-semibold">{formatViews(likes)}</p>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => handleNewReaction(false)}>
                            {
                                reactedByMe?.isLiked === false ? (
                                    <PiThumbsDownFill className="text-lg text-black" />
                                ) : (
                                    <PiThumbsDown className="text-lg text-black" />
                                )
                            }

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
                        replies?.length && replies.map((reply) => (
                            <CommentItem key={reply._id}
                                commentId={reply._id}
                                userName={reply?.userDetails?.channelId}
                                comment={reply.comment}
                                profileFile={reply?.userDetails?.profileFile}
                                postedAt={reply.createdAt}
                                likes={reply.likes}
                                dislikes={reply.dislikes}
                                reactedByMe={reply.reactedByMe}
                                replyCount={reply.replyCount}
                                nestedReply={true}
                                parentCommentId={reply.parentCommentId}
                                parentSetReplies={setReplies}
                                myComment={reply.myComment}
                            />
                        ))}
                </div>
            </div>
            <div className="relative">
                {
                    myComment && <div className="cursor-pointer" onClick={() => setShowOptions(true)}>
                        <BsThreeDotsVertical className="text-2xl" />
                    </div>
                }

                {showOptions && (
                    <div className="absolute right-0 z-50">
                        <SimpleModal
                            items={actionItem}
                            onSelect={handleModifyComment}
                            onClose={() => setShowOptions(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentItem