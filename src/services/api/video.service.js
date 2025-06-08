import axiosInstance from '../../lib/axios';
import { VIDEO_DETAIL_URL } from './url.service';

// Add new comment service function
export const refetchVideo = async (videoId, user) => {
    let URL = VIDEO_DETAIL_URL.replace(":id", videoId);

    if (user) {
        URL += `?userId=${user?._id}`;
    }

    const response = await axiosInstance.get(URL);

    return response.data;
}