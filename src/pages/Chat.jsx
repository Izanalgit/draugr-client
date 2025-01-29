import { useApp } from "../context/AppContext";
import CountdownTimer from "../components/CountdownTimer";

const Chat = () => {

    const {certified, isOnChat, isReadyToChat} = useApp();

    return(
         <>
            {certified && isOnChat && isReadyToChat &&
                <> 
                    <CountdownTimer />
                    <p>CHAT</p>
                </>
            }
            {!certified && <p>No tienes credenciales !</p>}
        </>
    )
}

export default Chat;