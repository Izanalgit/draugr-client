import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import useHandshake from "../hooks/useHandshake";
import addMessageWithDelay from "../utils/addMessage";

const Handshake = ({setMessagesLog}) => {

    const {
        API_URL,
        saveAuthToken,
        saveCSRFToken,
    } = useApp()

    const { 
        initiateHandshake, 
        csrfToken, 
        handshakeToken, 
        loading, 
        error 
    } = useHandshake();

    useEffect(() => {
        const startHandshake = async () => {
            const HANDSHAKE_URL = API_URL+"/api/connect";
            await addMessageWithDelay(setMessagesLog,"Estableciendo conexión...", 0);
            await addMessageWithDelay(setMessagesLog,"Encriptado conexión...", 100);
            await initiateHandshake(HANDSHAKE_URL);
        };

        startHandshake();
    }, [initiateHandshake]);

    useEffect(() => {
        const handleHandshakeProcess = async () => {
            if (loading) {
                await addMessageWithDelay(setMessagesLog,"Cargando...", 500);
            }
            if (error) {
                await addMessageWithDelay(setMessagesLog,`Error: ${error}`, 1000);
            }
            if(handshakeToken && csrfToken){
                await addMessageWithDelay(setMessagesLog,"Credenciales recibidas...",1500);
                await addMessageWithDelay(setMessagesLog,"Conexión establecida...",2000);
                setTimeout(() => {
                    saveAuthToken(handshakeToken);
                    saveCSRFToken(csrfToken);
                }, 2050);
            }
        }

        handleHandshakeProcess();

    },[loading,error,handshakeToken,csrfToken])

};

export default Handshake;