import { useApp } from "../context/AppContext";
import CountdownTimer from "../components/CountdownTimer";
import ChatComponent from "../components/ChatComponent";
import AutoNavigate from "../components/AutoNavigate";

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
            {!certified && 
                <>
                    <p>No tienes credenciales !</p>
                    <AutoNavigate page={'/'} delay={5000} />
                </>
            }
        </>
    )
}

export default Chat;