import axiosInstance from '../../lib/axios';
import { ADD_VIDEO_URL, DELETE_VIDEO_URL, UPDATE_VIDEO_URL, VIDEO_DETAIL_URL } from './url.service';

// Add new comment service function
export const refetchVideo = async (videoId, user) => {
    let URL = VIDEO_DETAIL_URL.replace(":id", videoId);

    if (user) {
        URL += `?userId=${user?._id}`;
    }

    const response = await axiosInstance.get(URL);

    return response.data;
}

export const addVideo = async (payload) => {
    const response = await axiosInstance.post(ADD_VIDEO_URL, payload);

    return response.data;
}

export const updateVideo = async (id, payload) => {
    let URL = UPDATE_VIDEO_URL.replace(":id", id);

    const response = await axiosInstance.put(URL, payload);

    return response.data;
}

export const deleteVideo = async (id) => {
    let URL = DELETE_VIDEO_URL.replace(":id", id);

    const response = await axiosInstance.delete(URL);

    return response.data;
}