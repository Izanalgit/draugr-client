import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useLocation } from 'react-router-dom';
import Handshake from "../components/Handshake";
import AcceptChat from "../components/AcceptChat";
import AutoNavigate from "../components/AutoNavigate";
import LogComponent from "../components/LogComponent";

const Response = () => {

    const [messages,setMessages] = useState([]);

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const chatToken = searchParams.get('chatToken');
    const userToken = searchParams.get('userToken');

    const decodedChatToken = decodeURIComponent(chatToken);
    const decodedUserToken = decodeURIComponent(userToken);
    
    const { certified , isReadyToChat} = useApp();

    const areTokensValid = Boolean(chatToken?.trim() && userToken?.trim());

    return (
        <>
            {areTokensValid
                ?<>
                    {certified &&  
                        <AcceptChat 
                            chatToken={decodedChatToken} 
                            userToken={decodedUserToken} 
                            setMessagesLog={setMessages}
                        />
                    }
                    {!isReadyToChat && <Handshake setMessagesLog={setMessages}/>}
                    <LogComponent messages={messages} />
                </>
                :<>
                    <p>No tienes credenciales !</p>
                    <AutoNavigate page={'/'} delay={5000} />
                </>
            }
            
        </>
    );
};

export default Response;