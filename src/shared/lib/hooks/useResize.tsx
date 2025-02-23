import { useState, useEffect, useRef } from "react";

export const useResize = (delay: number = 100) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setScreenWidth(window.innerWidth);
            }, delay);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [delay]);

    return screenWidth;
};