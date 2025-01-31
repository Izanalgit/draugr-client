import { useState} from "react";
import AutoNavigate from "./AutoNavigate";

const LandingComponent = () =>{

    const [clickButton, setClickButton] = useState(false);

    const handleButton = () => setClickButton(true); 


    return(
        <>
            <div class="disclaimer">
            <pre>
         .-"      "-.<br/>
        /            \<br/>
       |,  .-.  .-.  ,|<br/>
       | )(_o/  \o_)( |<br/>
       |/     /\     \|<br/>
       (_     ^^     _)<br/>
        \__|IIIIII|__/<br/>
         | \IIIIII/ |<br/>
         \          /<br/>
          `-.____.-'<br/>
            </pre>

                <p>⚠️ <strong>Importante:</strong> Este chat es una plataforma experimental. El autor no se hace responsable del uso del servicio. Ten en cuenta:</p>
                <ul>
                    <li>Las credenciales tienen una caducidad de <strong>1 hora</strong>.</li>
                    <li>Todo el contenido, incluidas las credenciales y mensajes, se almacena en <strong>memoria volátil</strong>. Esto significa que cualquier pérdida de conexión o refresco de la página borrará toda la información.</li>
                </ul>
            </div>

            <button onClick={handleButton}>ENTRAR</button>
            {clickButton && <AutoNavigate page={'/loader'} />}
        </>
    )
}

export default LandingComponent;