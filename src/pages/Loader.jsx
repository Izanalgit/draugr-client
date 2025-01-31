import { useState } from "react";
import { useApp } from "../context/AppContext";
import Handshake from "../components/Handshake";
import RequestChat from "../components/RequestChat";
import LogComponent from "../components/LogComponent";

const Loader = () => {
    
    const { certified , isReadyToChat} = useApp();
    const [messages,setMessages] = useState([]);

    return (
        <>
            {certified && <RequestChat setMessagesLog={setMessages}/>}
            {!isReadyToChat && <Handshake setMessagesLog={setMessages} />}
            <LogComponent messages={messages} />
        </>
    );
};

export default Loader;