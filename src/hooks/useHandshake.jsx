import { useState, useCallback } from "react";
import axios from "axios";
import { encryptData } from "../utils/encryptRSA";

const API_PUBLIC = import.meta.env.VITE_API_PUBLIC_KEY;
const API_HANDSAKE = import.meta.env.VITE_API_HANDSAKE;

const useHandshake = () => {
    const [csrfToken, setCsrfToken] = useState(null);
    const [handshakeToken, setHandshakeToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initiateHandshake = useCallback(async (url) => {
        setLoading(true);
        setError(null);

        const publicKey = API_PUBLIC.replace(/\\n/g, "\n");

        try {
            const payload = { payload: { giveMe: API_HANDSAKE } };
            const encryptedPayload = encryptData(payload, publicKey);

            const response = await axios.post(
                url,
                { encryptedData: encryptedPayload },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            setCsrfToken(response.data.csrfToken);
            setHandshakeToken(response.headers.authorization);

            console.log(response.headers)

        } catch (err) {
            const errorMessage = err.response
                ? `STATUS ${err.response.status} : ${
                      err.response.data.error || "Error desconocido"
                  }`
                : "El servidor no responde";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { initiateHandshake, csrfToken, handshakeToken, loading, error };
};

export default useHandshake;