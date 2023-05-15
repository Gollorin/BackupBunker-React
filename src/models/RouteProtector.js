import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RouterProtector({ children }) {

    const navigate = useNavigate();
    
    useEffect(() => {
        if(sessionStorage.getItem("HAS-LOGIN") === null){
            navigate('/');
        }
    });

    if(sessionStorage.getItem("HAS-LOGIN") === null){
        navigate('/');
        return;
    } else {
        return children;
    }
}

export default RouterProtector;