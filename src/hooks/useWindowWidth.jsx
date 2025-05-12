import { useState, useEffect } from "react";

const useWindowWidth = () => {
    // initialize with whatever the current size is
    const [size, setSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setSize(window.innerWidth);
        
        // whenever the page resize it will trigger this event and re call the update state func
        window.addEventListener("resize", handleResize);

        // unmounting
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}

export default useWindowWidth;