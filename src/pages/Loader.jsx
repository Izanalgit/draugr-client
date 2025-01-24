import { useApp } from "../context/AppContext";
import Handshake from "../components/Handshake";
import RequestChat from "../components/RequestChat";

const Loader = () => {
    
    const { certified ,isOnChat} = useApp();

    return (
        <>
            <Handshake />
            {certified && !isOnChat &&  <RequestChat />}
        </>
    );
};

export default Loader;