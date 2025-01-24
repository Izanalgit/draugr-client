import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvaider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    const [authToken, setAuthToken] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);
    const [chatToken, setChatToken] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [certified, setCertified] = useState(false);
    const [isOnChat, setIsOnChat] = useState(false);
    const [isReadyToChat, setIsReadyToChat] = useState(false);

    const saveAuthToken = (token) => setAuthToken(token);
    const saveCSRFToken = (token) => setCsrfToken(token);
    const saveChatToken = (token) => setChatToken(token);
    const saveUserToken = (token) => setUserToken(token);
    const savePrivateKey = (token) => setPrivateKey(token);
    const savePublicKey = (token) => setPublicKey(token);

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

    return (
        <AppContext.Provider
            value={{
                API_URL,
                saveAuthToken,
                saveCSRFToken,
                saveChatToken,
                saveUserToken,
                savePrivateKey,
                savePublicKey,
                authToken,
                csrfToken,
                chatToken,
                userToken,
                privateKey,
                publicKey,
                certified,
                isOnChat,
                isReadyToChat,
            }}>
            {children}
        </AppContext.Provider>
    );
};

const useApp = () => useContext(AppContext);

export { AppProvaider, useApp };