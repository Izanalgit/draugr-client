import { useApp } from "../context/AppContext";
import CountdownTimer from "../components/CountdownTimer";
import ChatComponent from "../components/ChatComponent";

const Chat = () => {

    const {certified, isOnChat, isReadyToChat} = useApp();

    return(
         <>
            {certified && isOnChat && isReadyToChat &&
                <> 
                    <CountdownTimer />
                    <ChatComponent />
                </>
            }
            {!certified && <p>No tienes credenciales !</p>}
        </>
    )
}

export default Chat;