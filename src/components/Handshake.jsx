import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import useHandshake from "../hooks/useHandshake";
import addMessageWithDelay from "../utils/addMessage";

const Handshake = () => {

    const {
        API_URL,
        saveAuthToken,
        saveCSRFToken,
    } = useApp()

    const { initiateHandshake, csrfToken, handshakeToken, loading, error } =
        useHandshake();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const startHandshake = async () => {
            const HANDSHAKE_URL = API_URL+"/api/connect";
            addMessageWithDelay(setMessages,"Estableciendo conexión...", 0);
            addMessageWithDelay(setMessages,"Encriptado conexión...", 100);
            await initiateHandshake(HANDSHAKE_URL);
        };

        startHandshake();
    }, [initiateHandshake]);

    useEffect(() => {
        if (loading) {
            addMessageWithDelay(setMessages,"Cargando...", 500);
        }
        if (error) {
            addMessageWithDelay(setMessages,`Error: ${error}`, 1000);
        }
        if(handshakeToken && csrfToken){
            addMessageWithDelay(setMessages,"Credenciales recibidas...",1500);
            saveAuthToken(handshakeToken);
            saveCSRFToken(csrfToken);
            addMessageWithDelay(setMessages,"Conexión establecida...",2000);
        }

    },[loading,error,handshakeToken,csrfToken])

    return (
        <div className="handshake log">
            <pre>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </pre>
        </div>
    );
};

export default Handshake;