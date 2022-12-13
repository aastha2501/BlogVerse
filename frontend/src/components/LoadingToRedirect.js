import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export default function LoadingToRedirect() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    //if user is not authorized than after 5s the user will navigate to the login page
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000);

        count === 0 && navigate("/login");
        return () => clearInterval(interval);
    }, [count, navigate]);
  return (
    <div style={{marginTop: "100px", textAlign:"center"}}>
        <h5>Redirecting you in {count} seconds.</h5>
    </div>
  )
}
