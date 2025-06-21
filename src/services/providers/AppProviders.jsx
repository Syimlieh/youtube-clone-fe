import { Provider as ReduxProvider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "../../routes.jsx";
import { store } from "../../store/store";
import { Toaster } from "react-hot-toast";

const appRouter = createBrowserRouter(routes);

export default function AppProviders() {
    return (
        <ReduxProvider store={store}>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
            <RouterProvider router={appRouter} />
        </ReduxProvider>
    );
}
