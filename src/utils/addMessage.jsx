const addMessageWithDelay = (setMessages, message, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            setMessages((prev) => [...prev, message]);
        }, delay);
        resolve();
    })
};

export default addMessageWithDelay;