import App from "./App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChannelProfile from "./pages/ChannelProfile";
import VideoDetails from "./pages/VideoDetails";

export const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/watch",
        element: <VideoDetails />
    },
    {
        path: "/channel/:channelId",
        element: <ChannelProfile />
    },
    {
        path: "/auth/login",
        element: <Login />
    },
    {
        path: "/auth/register",
        element: <Register />
    },
];
