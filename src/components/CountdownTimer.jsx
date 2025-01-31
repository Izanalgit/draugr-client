import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const CountdownTimer = () => {

    const { certifiedTime, timeLimit } = useApp();

    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        if(certifiedTime){
            const updateRemainingTime = () => {
                const elapsed = Date.now() - certifiedTime;
                setTimeLeft(Math.max(timeLimit - elapsed, 0)); // Avoid 0
            };

            const interval = setInterval(updateRemainingTime, 1000); // Each 1 sec

            updateRemainingTime();

            return () => clearInterval(interval);
        }

    }, [certifiedTime]);

    // Format time
    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000); // mins 
        const seconds = Math.floor((ms % 60000) / 1000); // secs

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="countdown">
            {timeLeft > 0 ? (
                <span>{formatTime(timeLeft)}</span>
            ) : (
                <span>EXPIRADO</span>
            )}
        </div>
    );
};

export default CountdownTimer;
