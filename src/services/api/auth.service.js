import axiosInstance from '../../lib/axios';
import { LOGIN_URL, MY_PROFILE, REGISTER_URL } from './url.service';

export const registerUser = async (formData) => {
    const response = await axiosInstance.post(REGISTER_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};

export const loginUser = async ({ email, password }) => {
    const response = await axiosInstance.post(LOGIN_URL, {
        email,
        password,
    });

    return response.data;
}

export const myProfile = async () => {
    const response = await axiosInstance.get(MY_PROFILE, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    return response.data;
}