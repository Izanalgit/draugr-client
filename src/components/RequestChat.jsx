import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import useFetchPOST from "../hooks/useFetchPOST";
import RequestForm from "./RequestForm";
import AutoNavigate from "./AutoNavigate";
import addMessageWithDelay from "../utils/addMessage";

const RequestChat = ({setMessagesLog}) => {
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

    const [inviteData, setInviteData] = useState(null);

    useEffect(() => {
        const requestToUser = async () => {
            const url = `${API_URL}/api/create`;
            const payload = {
                csrfToken: csrfToken,
                payload : {
                    sender: inviteData.sender,
                    emailRecipient: inviteData.email,
                    message: inviteData?.message,
                }
            };
            const config = {headers: { Authorization: authToken }};

            await addMessageWithDelay(setMessagesLog, "Enviando invitación...", 500);

            await fetchData(url, payload, config);
        };

        if (inviteData) {
            requestToUser();
        }
    }, [inviteData]);

    useEffect(() => {
        const handleInviteResponse = async () =>{
            if (loading) {
                await addMessageWithDelay(setMessagesLog, "Procesando solicitud...", 0);
            } else if (error) {
                await addMessageWithDelay(setMessagesLog, `Error: ${error}`, 1000);
            } else if (data) {
                await addMessageWithDelay(setMessagesLog, data.message || "Invitación enviada con éxito", 2000);
                setTimeout(() => {
                    saveChatToken(data.chatToken);
                    saveUserToken(data.userToken);
                    saveCertifiedTime(data.sessionTime);
                }, 2050);
                setTimeout(() => {
                    savePrivateKey(data.keys.user);
                    savePublicKey(data.keys.contact);
                }, 4000);
            }
        }

        handleInviteResponse();
        
    }, [data, loading, error]);

    return (
        <>
            {!isOnChat &&
                <RequestForm
                    isLoading={loading}
                    isSended={data}
                    getInvite={setInviteData}
                    setErrorMessage={(err) => addMessageWithDelay(setMessagesLog, `Error: ${err}`, 0)}
                />
            }
            
            {isOnChat && isReadyToChat && <AutoNavigate page={'/chat'}/>}
        </>
    );
};

export default RequestChat;
