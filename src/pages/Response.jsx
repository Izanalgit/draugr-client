import { useApp } from "../context/AppContext";
import { useLocation } from 'react-router-dom';
import Handshake from "../components/Handshake";
import AcceptChat from "../components/AcceptChat";

const Response = () => {

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
                    {!isReadyToChat && <Handshake />}
                    {certified &&  <AcceptChat chatToken={decodedChatToken} userToken={decodedUserToken}/>}
                </>
                :<p>No tienes credenciales !</p>
            }
            
        </>
    );
};

export default Response;