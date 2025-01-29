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
            await addMessageWithDelay(setMessages,"Estableciendo conexión...", 0);
            await addMessageWithDelay(setMessages,"Encriptado conexión...", 100);
            await initiateHandshake(HANDSHAKE_URL);
        };

        startHandshake();
    }, [initiateHandshake]);

    useEffect(() => {
        const handleHandshakeProcess = async () => {
            if (loading) {
                await addMessageWithDelay(setMessages,"Cargando...", 500);
            }
            if (error) {
                await addMessageWithDelay(setMessages,`Error: ${error}`, 1000);
            }
            if(handshakeToken && csrfToken){
                await addMessageWithDelay(setMessages,"Credenciales recibidas...",1500);
                await addMessageWithDelay(setMessages,"Conexión establecida...",2000);
                setTimeout(() => {
                    saveAuthToken(handshakeToken);
                    saveCSRFToken(csrfToken);
                }, 2050);
            }
        }

        handleHandshakeProcess();

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