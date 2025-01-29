import { useApp } from "../context/AppContext";
import Handshake from "../components/Handshake";
import RequestChat from "../components/RequestChat";

const Loader = () => {
    
    const { certified , isReadyToChat} = useApp();

    return (
        <>
            {!isReadyToChat && <Handshake />}
            {certified && <RequestChat />}
        </>
    );
};

export default Loader;