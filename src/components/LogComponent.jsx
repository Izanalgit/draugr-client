const LogComponent = ({messages}) => {

    return (
        <div className="log">
            <pre>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </pre>
        </div>
    );

}

export default LogComponent;