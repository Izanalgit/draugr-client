import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import useFetchPOST from "../hooks/useFetchPOST";
import AutoNavigate from "./AutoNavigate";
import addMessageWithDelay from "../utils/addMessage";

const AcceptChat = ({ chatToken, userToken }) => {
    const { 
        API_URL, 
        authToken, 
        csrfToken,
        isOnChat,
        isReadyToChat, 
        saveChatToken,
        saveUserToken,
        savePrivateKey,
        savePublicKey,
        saveCertifiedTime
    } = useApp();

    const { fetchData, data, loading, error } = useFetchPOST();

    const [acceptInvite, setAcceptInvite] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(()=>{

        const saveCredentials = async () => {
            await addMessageWithDelay(setMessages, "Guardando credenciales recividas...", 100);
            setTimeout(() => {
                saveChatToken(chatToken);
                saveUserToken(userToken);
            }, 1000);
            setTimeout(() => {
                setAcceptInvite(true)
            }, 2000);
        }

        if(chatToken && userToken)
            saveCredentials();

    },[chatToken, userToken])

    useEffect(() => {
        const sendAcceptRequest = async () => {
            const url = `${API_URL}/api/load`;
            const payload = {
                csrfToken: csrfToken,
                payload : {
                    chatToken,
                    userToken,
                }
            };
            const config = {headers: { Authorization: authToken }};

            await addMessageWithDelay(setMessages, "Enviando credenciales...", 1000);

            await fetchData(url, payload, config);
        };

        if (acceptInvite) {
            sendAcceptRequest();
        }
    }, [acceptInvite]);

    useEffect(() => {
        const handleAcceptResponse = async () =>{
            if (loading) {
                await addMessageWithDelay(setMessages, "Procesando respuesta del servidor...", 0);
            } else if (error) {
                await addMessageWithDelay(setMessages, `Error: ${error}`, 1500);
            } else if (data) {
                await addMessageWithDelay(setMessages, data.message || "Credenciales aceptadas...", 2000);
                setTimeout(() => {
                    savePrivateKey(data.keys.user);
                    savePublicKey(data.keys.contact);
                    saveCertifiedTime(data.sessionTime);
                }, 2500);
            }
        }

        handleAcceptResponse();
        
    }, [data, loading, error]);

    return (
        <>
            <div className="request-chat log">
                <pre>
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </pre>
            </div>

            {isOnChat && isReadyToChat && <AutoNavigate/>}
        </>
    );
};

export default AcceptChat;
