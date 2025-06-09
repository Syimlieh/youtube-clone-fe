import axiosInstance from '../../lib/axios';
import { DELETE_COMMENT_URL, NEW_COMMENT_URL, REPLIES_COMMENT_URL, UPDATE_COMMENT_URL, VIDEO_COMMENT_URL } from './url.service';

// Add new comment service function
export const addNewComment = async (payload) => {
    const response = await axiosInstance.post(NEW_COMMENT_URL, payload);

    return response.data;
}

export const fetchVideoComments = async (videoId, user) => {
    let URL = VIDEO_COMMENT_URL.replace(":id", videoId);
    if (user) {
        URL += `?userId=${user?._id}`;
    }

    const response = await axiosInstance.get(URL);

    return response.data;
}

export const fetchCommentReplies = async (commentId, user) => {
    let URL = REPLIES_COMMENT_URL.replace(":id", commentId);
    if (user) {
        URL += `?userId=${user?._id}`;
    }

    const response = await axiosInstance.get(URL);

    return response.data;
}

export const updateComment = async (commentId, payload) => {
    let URL = UPDATE_COMMENT_URL.replace(":id", commentId);

    const response = await axiosInstance.put(URL, payload);

    return response.data;
}

export const deleteComment = async (commentId) => {
    let URL = DELETE_COMMENT_URL.replace(":id", commentId);

    const response = await axiosInstance.delete(URL);

    return response.data;
}
