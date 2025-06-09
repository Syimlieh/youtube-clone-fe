import axiosInstance from '../../lib/axios';
import { COMMENT_REACTION_URL, DELETE_COMMENT_REACTION_URL, DELETE_VIDEO_REACTION_URL, VIDEO_REACTION_URL } from './url.service';

// Add new comment service function
export const addNewReaction = async (payload) => {
    const response = await axiosInstance.post(VIDEO_REACTION_URL, payload);

    return response.data;
}

export const deleteReaction = async (id) => {
    const URL = DELETE_VIDEO_REACTION_URL.replace(":id", id)

    const response = await axiosInstance.delete(URL);

    return response.data;
}

export const addNewCommentReaction = async (payload) => {
    const response = await axiosInstance.post(COMMENT_REACTION_URL, payload);

    return response.data;
}

export const deleteCommentReaction = async (id) => {
    const URL = DELETE_COMMENT_REACTION_URL.replace(":id", id)

    const response = await axiosInstance.delete(URL);

    return response.data;
}