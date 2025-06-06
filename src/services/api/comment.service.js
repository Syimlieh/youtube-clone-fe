import axiosInstance from '../../lib/axios';
import { NEW_COMMENT_URL } from './url.service';

// Add new comment service function
export const addNewComment = async (payload) => {
    const response = await axiosInstance.post(NEW_COMMENT_URL, payload);

    return response.data;
}