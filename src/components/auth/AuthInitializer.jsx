import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { myProfile } from '../../services/api/auth.service';
import { setProfile, clearProfile } from '../../store/slice/profile.slice';

// this will help us to check if the user is authenticated or not
const AuthInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const user = await myProfile();
                dispatch(setProfile(user));
            } catch (err) {
                // if the token is invalid or expired, clear the profile
                localStorage.removeItem('token');
                dispatch(clearProfile());
            }
        };

        checkAuth();
    }, []);

    return null; // Does not render anything
};

export default AuthInitializer;
