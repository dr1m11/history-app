import {useLayoutEffect, useState} from "react";

export const useAnimatedNumber = (targetNumber: number, duration: number) => {
    const [currentNumber, setCurrentNumber] = useState(targetNumber);

    useLayoutEffect(() => {
        let startValue = currentNumber;
        const endValue = targetNumber;
        let startTime: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = startValue + (endValue - startValue) * progress;
            setCurrentNumber(Math.floor(currentValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        if (startValue !== endValue) {
            const animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [targetNumber, duration]);

    return currentNumber;
};

