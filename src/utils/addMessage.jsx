const addMessageWithDelay = (setMessages, message, delay = 1000) => {
    setTimeout(() => {
        setMessages((prev) => [...prev, message]);
    }, delay);
};

export default addMessageWithDelay;