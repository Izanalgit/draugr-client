import { useState } from 'react';
import { useApp } from '../context/AppContext';
import useChatWebSocket from '../hooks/useChatWebSocket';
import AutoNavigate from './AutoNavigate';

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
        isClosed,
        requestAccept,
        chatClosed
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
        requestAccept,
        chatClosed 
    });

    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <div className='log'>
                <pre>
                    {(!isInvited && !isAccepted) &&
                        <p>Esperando confirmación del contacto</p>
                    }
                    {isClosed &&
                        <>
                            <p>Conexión terminada !</p>
                            <p>Limpiando memoria ...</p>
                            <AutoNavigate page={'/'} delay={10000} />
                        </>
                    }
                </pre>
            </div>
            {(isInvited || isAccepted) &&
                <div className='messages-box'>
                    <div className='messages'>
                        {messages.map((msg, index) => (
                            <p key={index} className={msg.from === 'Yo'?'left-msg':'right-msg'}>
                                <strong>{msg.from}:</strong>{msg.content}
                            </p>
                        ))}
                    </div>
                    {!isClosed &&
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
                    }
                </div>
            }
        </div>
    );
};

export default ChatComponent;
