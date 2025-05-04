import axios from "axios";
import { useEffect, useState } from "react";

const useApiRequest = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }
        // Create an abort controller to cancel the request if the component unmounts
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null);
            try {
                const response = await axios.get(url, { signal: controller.signal });
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                if (error.name === 'CanceledError') {
                    return;
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        return () => {
            // Cancel the request if the component unmounts
            controller.abort();
        }

    }, [url])

    return { data, loading, error };
}

export default useApiRequest;