import { useState } from "react";
import { GrEmoji } from "react-icons/gr";
import EmojiPickerWrapper from "./EmojiWrapper";

const AddNewComment = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [comment, setComment] = useState("");

    const handleCancel = () => {
        setComment("");
        setIsFocused(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setComment("");
        setIsFocused(false);
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
