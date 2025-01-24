import { useState } from "react";
import axios from "axios";
import { encryptData } from "../utils/encryptRSA";
const API_PUBLIC = import.meta.env.VITE_API_PUBLIC_KEY;

const useFetchPOST = () => {
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const fetchData = async (url, payload, config = {}) => {
        setLoading(true); 
        setError(null); 

        const publicKey = API_PUBLIC.replace(/\\n/g, "\n");
        
        try {
            
            const encryptedPayload = encryptData(payload,publicKey);

            console.log(encryptedPayload) //CHIVATO

            const response = await axios.post(url, {encryptedData:encryptedPayload}, config);

            setData(response.data); 
            setHeaders(response.headers); 

        } catch (error) {
            console.log(error) //CHIVATO
            const errorMessage = error.response
                ? `STATUS ${error.response.status} : ${
                    error.response.data.error ?
                    error.response.data.error:
                    error.response.data.errors ?
                    error.response.data.errors.map(error=>error.msg):error}`
                : "El servidor no responde";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, headers, loading, error };
};

export default useFetchPOST;