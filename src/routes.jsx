import App from "./App";
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
];
