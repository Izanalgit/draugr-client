import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoNavigate = ({page , delay=10}) => {

    const navigate = useNavigate();

    const handleNavigate = () => navigate(page);

    useEffect(()=>{
        setTimeout(()=>{
            handleNavigate()
        },[delay])    
    },[])

}

export default AutoNavigate;