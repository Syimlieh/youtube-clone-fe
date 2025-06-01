import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login payload:', formData);
        // handle login logic
        setForm({
            email: formData.email,
            password: '',
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Sign in to YouTube
                </h2>

                <form className="space-y-4">
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
                        onClick={(e) => handleLogin(e)}
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="text-blue-600 hover:underline cursor-pointer">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;