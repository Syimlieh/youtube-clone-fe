import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api/auth.service';

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        channelId: '',
        profile: null,
    });
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        // using formdata to handle file uploads 
        if (!form.email || !form.password || !form.channelId) {
            alert('Please fill in all required fields.');
            return;
        }
        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('channelId', form.channelId);
        formData.append('profile', form.profile);

        try {
            const result = await registerUser(formData);

            if (!result || !result.data) {
                return;
            }

            navigate("/auth/login", { replace: true });
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, profile: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Create your YouTube Account
                </h2>

                <form className="space-y-4">
                    {/* Profile upload */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="profile" className="cursor-pointer">
                            {/* will help preview the uploaded profile picture */}
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile preview"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                                    Upload
                                </div>
                            )}
                        </label>
                        <input
                            id="profile"
                            name="profile"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <span className="text-sm text-gray-600">Choose a profile picture</span>
                    </div>

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />

                    <div className="relative w-full">
                        <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-sm">@</span>
                        <input
                            type="text"
                            name="channelId"
                            placeholder="Channel ID"
                            value={form.channelId}
                            onChange={handleChange}
                            className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-medium py-2 rounded hover:bg-red-700 transition"
                        onClick={(e) => handleRegister(e)}
                    >
                        Register
                    </button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-600"                >
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-blue-600 hover:underline cursor-pointer">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
