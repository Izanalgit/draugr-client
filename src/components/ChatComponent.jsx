import { useState } from 'react';
import { useApp } from '../context/AppContext';
import useChatWebSocket from '../hooks/useChatWebSocket';

const ChatComponent = () => {
    const { 
        API_WS, 
        authToken,
        chatToken, 
        userToken, 
        privateKey, 
        publicKey, 
        isInvited,
        isAccepted,
        requestAccept
    } = useApp();
    
    const shouldSendChatAccepted = isInvited;

    const { messages, sendMessage } = useChatWebSocket({ 
        API_WS,
        authToken, 
        chatToken, 
        userToken, 
        publicKey,
        privateKey, 
        shouldSendChatAccepted,
        requestAccept 
    });

    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            {(!isInvited && !isAccepted) &&
                <p>Esperando confirmación del contacto</p>
            }
            {(isInvited || isAccepted) &&
                <>
                    <div>
                        {messages.map((msg, index) => (
                            <p key={index}>
                                <strong>{msg.from}:</strong> {msg.content}
                            </p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage(inputValue);
                                setInputValue('');
                            }
                        }}
                        placeholder="Escribe tu mensaje..."
                    />
                </>
            }
        </div>
    );
};

export default ChatComponent;
