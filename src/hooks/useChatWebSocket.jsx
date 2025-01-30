import { useEffect, useRef, useState } from 'react';
import { sendEncryptedMessage } from '../utils/encryptRSA';
import { encryptE2EE, decryptE2EE } from '../utils/messageE2EE';
const API_PUBLIC = import.meta.env.VITE_API_PUBLIC_KEY;

const useChatWebSocket = ({ 
        API_WS,
        authToken, 
        chatToken, 
        userToken, 
        privateKey, 
        publicKey, 
        shouldSendChatAccepted,
        requestAccept
    }) => {
    
    const publicKeyAPI = API_PUBLIC.replace(/\\n/g, "\n");

    const [messages, setMessages] = useState([]);
    const wsRef = useRef(null);

    useEffect(() => {
        if (!chatToken || !userToken) return;

        const ws = new WebSocket(`${API_WS}/ws?authorization=${authToken}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('Conexión WebSocket establecida');
            let data;

            if (shouldSendChatAccepted) {
                data = {
                    action: 'CHAT_ACCEPTED',
                    chatToken,
                    authToken: userToken,
                };
                console.log('Mensaje CHAT_ACCEPTED enviado'); //CHIVATO
            }else{
                data = {
                    action: 'INIT_CONNECTION',
                    chatToken,
                    authToken: userToken,
                };
                console.log('Mensaje INIT_CONNECTION enviado'); //CHIVATO
            }
            sendEncryptedMessage(ws,JSON.stringify(data),publicKeyAPI);
                
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'ENCRYPTED_MESSAGE') {
                console.log(`Chat recivido de: ${data.from}`); //CHIVATO
                const decryptedMessage = decryptE2EE(data.message, privateKey);
                setMessages((prev) => [...prev, { from: 'Contacto', content: decryptedMessage }]);
            } else if (data.type === 'CHAT_ACCEPTED') {
                console.log(`Chat aceptado por: ${data.from}`); //CHIVATO
                requestAccept();
            }
        };

        ws.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };

        ws.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        return () => ws.close();
    }, [API_WS, chatToken, userToken, shouldSendChatAccepted]);

    // Función para enviar mensajes
    const sendMessage = (message) => {
        setMessages((prev) => [...prev, { from: 'Yo', content: message }]);
        if (wsRef.current && message.trim()) {
            const encryptedMessage = encryptE2EE(message, publicKey);
            const data = JSON.stringify({
                action: 'ENCRYPTED_MESSAGE',
                encryptedMessage,
                chatToken,
                authToken: userToken,
            });

            sendEncryptedMessage(wsRef.current,data,publicKeyAPI);
        }
    };

    return { messages, sendMessage };
};

export default useChatWebSocket;
