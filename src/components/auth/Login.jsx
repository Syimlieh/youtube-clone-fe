import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, myProfile } from '../../services/api/auth.service';
import { setProfile } from '../../store/slice/profile.slice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        // handle error validation
        const newErrors = {};
        if (!form.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
        if (form.password.trim().length < 8) newErrors.password = 'Password length must be at least 8';
        if (!form.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // handle login logic
        try {
            const result = await loginUser(form);
            // storing token to localStorage
            if (!result || !result.data) {
                return;
            }

            localStorage.setItem('token', result.data);

            const user = await myProfile();

            dispatch(setProfile(user));

            // Navigate after success
            navigate('/');
        } catch (err) {
            const resMessage = err?.response?.data?.message;

            if (typeof resMessage === 'string') {
                toast.error(resMessage);
            } else {
                toast.error('Something went wrong. Please try again.');
            }

        }
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
                    {/* this will only be visible if there is error  */}
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    {/* this will only be visible if there is error  */}
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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