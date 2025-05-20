import App from "./App";
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
];
