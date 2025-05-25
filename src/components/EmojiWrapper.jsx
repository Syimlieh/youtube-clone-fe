import EmojiPicker from 'emoji-picker-react';

const EmojiPickerWrapper = ({ onEmojiClick }) => {
    return (
        <EmojiPicker onEmojiClick={(emojiData) => onEmojiClick(emojiData.emoji)} />
    );
};

export default EmojiPickerWrapper;