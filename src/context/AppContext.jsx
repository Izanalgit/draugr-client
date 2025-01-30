import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvaider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    const API_WS = import.meta.env.VITE_API_WS;

    // Tokens
    const [authToken, setAuthToken] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);
    const [chatToken, setChatToken] = useState(null);
    const [userToken, setUserToken] = useState(null);

    // Pair keys
    const [privateKey, setPrivateKey] = useState(null);
    const [publicKey, setPublicKey] = useState(null);

    // Status check
    const [certified, setCertified] = useState(false);
    const [isOnChat, setIsOnChat] = useState(false);
    const [isReadyToChat, setIsReadyToChat] = useState(false);
    const [isInvited, setIsInvited] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);

    // Time certified
    const timeLimit = 60 * 60 * 1000; // 1h on ms
    const [certifiedTime, setCertifiedTime] = useState(null);

    const saveAuthToken = (token) => setAuthToken(token);
    const saveCSRFToken = (token) => setCsrfToken(token);
    const saveChatToken = (token) => setChatToken(token);
    const saveUserToken = (token) => setUserToken(token);
    const savePrivateKey = (key) => setPrivateKey(key);
    const savePublicKey = (key) => setPublicKey(key);
    const saveCertifiedTime = (time) => setCertifiedTime(time);
    const inviteAccept = () => setIsInvited(true);
    const requestAccept = () => setIsAccepted(true);

    useEffect(()=>{
        if(authToken && csrfToken)
            setCertified(true);
    },[authToken,csrfToken])

    useEffect(()=>{
        if(chatToken && userToken)
            setIsOnChat(true);
    },[chatToken,userToken])

    useEffect(()=>{
        if(privateKey && publicKey)
            setIsReadyToChat(true);
    },[privateKey,publicKey])

    useEffect(()=>{
        
        if (!certifiedTime) return;

        const interval = setInterval(() => {
            const elapsed = Date.now() - certifiedTime;
            if (elapsed >= timeLimit) {
                clearInterval(interval);
                setCertifiedTime(null);
                setCertified(false);
                setIsOnChat(false);
                setIsReadyToChat(false);
            }
        }, 60000);
    
        return () => clearInterval(interval);

    },[certifiedTime])

    return (
        <AppContext.Provider
            value={{
                API_URL,
                API_WS,
                saveAuthToken,
                saveCSRFToken,
                saveChatToken,
                saveUserToken,
                savePrivateKey,
                savePublicKey,
                saveCertifiedTime,
                inviteAccept,
                requestAccept,
                authToken,
                csrfToken,
                chatToken,
                userToken,
                privateKey,
                publicKey,
                certified,
                isOnChat,
                isReadyToChat,
                isInvited,
                isAccepted,
                certifiedTime,
                timeLimit,
            }}>
            {children}
        </AppContext.Provider>
    );
};

const useApp = () => useContext(AppContext);

export { AppProvaider, useApp };