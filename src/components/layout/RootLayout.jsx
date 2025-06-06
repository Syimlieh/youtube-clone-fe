import { useDispatch, useSelector } from "react-redux";
import { myProfile } from "../../services/api/auth.service";
import { setProfile } from "../../store/slice/profile.slice";
import { useEffect } from "react";
import AuthInitializer from "../auth/AuthInitializer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    // This Layout component is used for all page with user profile and used to initialize the user profile
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.value);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            // if there token but no profile then we refetch teh profile details 
            if (token && !user) {
                try {
                    const profile = await myProfile();
                    dispatch(setProfile(profile)); // save to store
                } catch (err) {
                    return;
                }
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
            <AuthInitializer />
            <Outlet />
        </>
    );
};

export default RootLayout;