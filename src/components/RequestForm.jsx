import { useState } from "react";

const RequestForm = ({ isLoading, isSended, getInvite, setErrorMessage }) => {
    const [inviteData, setInviteData] = useState({
        sender: "",
        email: "",
        message: "",
    });

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInviteData({
            ...inviteData,
            [name]: value,
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inviteData.sender) {
            setErrorMessage("Debes introducir un remitente.");
            return;
        }
        if (!inviteData.email) {
            setErrorMessage("Debes introducir el email del contacto.");
            return;
        }

        getInvite(inviteData);
    };

    return (
        <form onSubmit={handleSubmit} className="invite-form">
            <div className="form-group">
                <label htmlFor="sender">Remitente reconocible</label>
                <input
                    type="text"
                    id="sender"
                    name="sender"
                    value={inviteData.sender}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={inviteData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Mensaje de invitación</label>
                <textarea
                    id="message"
                    name="message"
                    value={inviteData.message}
                    onChange={handleChange}
                    placeholder="Escribe si quieres un mensaje de invitación"
                />
            </div>
            {!isLoading && !isSended && <button type="submit">Enviar invitación</button>}
        </form>
    );
};

export default RequestForm;
