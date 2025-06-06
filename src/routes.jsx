import App from "./App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RootLayout from "./components/layout/RootLayout";
import ChannelProfile from "./pages/ChannelProfile";
import VideoDetails from "./pages/VideoDetails";

export const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <App /> },
            { path: "watch", element: <VideoDetails /> },
            { path: "channel/:channelId", element: <ChannelProfile /> },
        ],
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
