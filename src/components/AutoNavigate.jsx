import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoNavigate = () => {

    const navigate = useNavigate();

    const handleNavigate = () => navigate('/chat');

    useEffect(()=>{handleNavigate()},[])

}

export default AutoNavigate;