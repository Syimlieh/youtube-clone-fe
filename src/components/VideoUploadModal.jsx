import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { VIDEO_FIELDS } from '../utils/constants/video';
import { addVideo, updateVideo } from '../services/api/video.service';
import { VIDEO_LIST_URL } from '../services/api/url.service';
import { addVideos } from '../store/slice/video.slice';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';
import { useDispatch } from 'react-redux';

const VideoUploadModal = ({ isOpen, onClose, video = null }) => {
    const dispatch = useDispatch();
    const isEditMode = Boolean(video);
    const [form, setForm] = useState({
        videoId: '',
        title: '',
        description: '',
        thumbnail: '',
        url: '',
        duration: '',
        channel: '',
        channelId: '',
        profile: '',
        views: '',
        subscriberCount: '',
        publishedAt: '',
        category: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            const updated = { ...errors };
            delete updated[name];
            setErrors(updated);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        VIDEO_FIELDS.forEach(({ value }) => {
            if (!form[value]) newErrors[value] = `${value[0].toUpperCase() + value.slice(1)} is required`;
        });
        if (!form.description) newErrors.description = 'Description is required';
        return newErrors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            const payload = {
                ...form,
                category: form.category.split(',').map(item => item.trim()).filter(Boolean),
            };
            if (isEditMode) {
                delete payload?.videoId
            }
            const result = isEditMode
                ? await updateVideo(video._id, payload)
                : await addVideo(payload);
            if (!result || !result.data) return;

            const refreshed = await axiosInstance.get(VIDEO_LIST_URL);
            if (refreshed?.data?.data) {
                dispatch(addVideos(refreshed.data.data));
                toast.success(isEditMode ? 'Video updated!' : 'Video uploaded!');
                onClose(); // Optionally close the modal
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

    useEffect(() => {
        if (video) {
            setForm({
                videoId: video.videoId || '',
                title: video.title || '',
                description: video.description || '',
                thumbnail: video.thumbnail || '',
                url: video.url || '',
                duration: video.duration || '',
                channel: video.channel || '',
                channelId: video.channelId || '',
                profile: video.profile || '',
                views: video.views || '',
                subscriberCount: video.subscriberCount || '',
                publishedAt: video.publishedAt?.split('T')[0] || '', // Format date for input
                category: Array.isArray(video.category) ? video.category.join(', ') : video.category || '',
            });
        } else {
            setForm({
                videoId: '',
                title: '',
                description: '',
                thumbnail: '',
                url: '',
                duration: '',
                channel: '',
                channelId: '',
                profile: '',
                views: '',
                subscriberCount: '',
                publishedAt: '',
                category: '',
            });
        }
        setErrors({});
    }, [video]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative z-50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Video' : 'Upload New Video'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <IoClose className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {VIDEO_FIELDS.map(({ name, value }) => (
                            <div key={value}>
                                <input
                                    type={['views', 'subscriberCount'].includes(value) ? 'number' : value === 'publishedAt' ? 'date' : 'text'}
                                    name={value}
                                    value={form[value]}
                                    onChange={handleChange}
                                    placeholder={name}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                />
                                {errors[value] && <p className="text-red-500 text-sm mt-1">{errors[value]}</p>}
                            </div>
                        ))}
                    </div>

                    <div>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                        >
                            {isEditMode ? 'Update' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadModal;
