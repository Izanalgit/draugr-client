import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import useFetchPOST from "../hooks/useFetchPOST";
import AutoNavigate from "./AutoNavigate";
import addMessageWithDelay from "../utils/addMessage";

const AcceptChat = ({ chatToken, userToken , setMessagesLog}) => {
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
        saveCertifiedTime,
        inviteAccept,
    } = useApp();

    const { fetchData, data, loading, error } = useFetchPOST();

    const [acceptInvite, setAcceptInvite] = useState(false);

    useEffect(()=>{

        const saveCredentials = async () => {
            await addMessageWithDelay(setMessagesLog, "Guardando credenciales recividas...", 100);
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

            await addMessageWithDelay(setMessagesLog, "Enviando credenciales...", 1000);

            await fetchData(url, payload, config);
        };

        if (acceptInvite) {
            sendAcceptRequest();
        }
    }, [acceptInvite]);

    useEffect(() => {
        const handleAcceptResponse = async () =>{
            if (loading) {
                await addMessageWithDelay(setMessagesLog, "Procesando respuesta del servidor...", 0);
            } else if (error) {
                await addMessageWithDelay(setMessagesLog, `Error: ${error}`, 1500);
            } else if (data) {
                await addMessageWithDelay(setMessagesLog, data.message || "Credenciales aceptadas...", 2000);
                inviteAccept();
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
            {isOnChat && isReadyToChat && <AutoNavigate page={'/chat'}/>}
        </>
    );
};

export default AcceptChat;
