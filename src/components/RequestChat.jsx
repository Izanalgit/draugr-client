import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import useFetchPOST from "../hooks/useFetchPOST";
import RequestForm from "./RequestForm";
import addMessageWithDelay from "../utils/addMessage";

const RequestChat = () => {
    const { API_URL, authToken, csrfToken } = useApp();

    const { fetchData, data, loading, error } = useFetchPOST();

    const [inviteData, setInviteData] = useState(null);
    const [messages, setMessages] = useState([]);

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

            addMessageWithDelay(setMessages, "Enviando invitación...", 500);

            await fetchData(url, payload, config);
        };

        if (inviteData) {
            requestToUser();
        }
    }, [inviteData]);

    useEffect(() => {
        if (loading) {
            addMessageWithDelay(setMessages, "Procesando solicitud...", 0);
        } else if (error) {
            addMessageWithDelay(setMessages, `Error: ${error}`, 1000);
        } else if (data) {
            addMessageWithDelay(setMessages, data.message || "Invitación enviada con éxito", 1000);
        }
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
            {!loading && (
                <RequestForm
                    getInvite={setInviteData}
                    setErrorMessage={(err) => addMessageWithDelay(setMessages, `Error: ${err}`, 0)}
                />
            )}
        </>
    );
};

export default RequestChat;
