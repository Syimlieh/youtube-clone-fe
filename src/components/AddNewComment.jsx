import { useState } from "react";
import { GrEmoji } from "react-icons/gr";
import EmojiPickerWrapper from "./EmojiWrapper";
import { addNewComment } from "../services/api/comment.service";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../store/slice/comment.slice";
import axiosInstance, { API_BASE_URL } from "../lib/axios";
import { VIDEO_COMMENT_URL } from "../services/api/url.service";
import { useNavigate } from 'react-router-dom';

const AddNewComment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [comment, setComment] = useState("");
    const selectedVideo = useSelector((state) => state.videos.selected);
    const user = useSelector((state) => state.profile.value);

    const handleCancel = () => {
        setComment("");
        setIsFocused(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if user is not logged in, we redirect to login page
        if (!user?._id) {
            navigate("/auth/login");
            return;
        }
        if (!comment.trim()) return;
        setComment("");
        setIsFocused(false);

        // we only add new coment if video id is there
        if (!selectedVideo?._id) {
            return;
        }
        const payload = {
            videoId: selectedVideo?._id,
            comment: comment.trim(),
        }
        const result = await addNewComment(payload);
        if (result && result.data) {
            // if adding comment is successful, we need to refresh the comments list
            let URL = API_BASE_URL + VIDEO_COMMENT_URL.replace(":id", selectedVideo._id);
            if (user?._id) {
                URL += `?userId=${user._id}`; // Append userId for reaction data
            }
            const refreshed = await axiosInstance.get(URL);

            if (refreshed?.data?.data) {
                // we need to update the comments in the store
                dispatch(setComments(refreshed?.data.data)); // full populated list
            }
        }
    };

    const handleEmojiClick = (emojiData) => {
        setComment((prev) => prev + emojiData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 px-2 py-1 bg-transparent text-sm"
                onFocus={() => setIsFocused(true)}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {isFocused && (
                <div className="relative flex justify-between items-center">
                    <div className="absolute top-6 left-4">
                        {openEmoji && <EmojiPickerWrapper onEmojiClick={(emojiData) => handleEmojiClick(emojiData)} />}
                    </div>
                    <GrEmoji className="text-xl cursor-pointer text-gray-600" onClick={() => setOpenEmoji(!openEmoji)} />
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
                            className="px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 rounded-2xl cursor-pointer fone-semibold"
                            disabled={!comment}
                        >
                            Comment
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default AddNewComment;
