import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(3);
  const usenavigate = useNavigate();
  const uselocation = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 && usenavigate(`/${path}`,{
      state: uselocation.pathname
    });
    return () => clearInterval(interval);
  }, [count, usenavigate,path]);

  return (
    <>
      <div className="redirect-spinner " style={{
        display:"flex",flexDirection:"column",alignItems:"center",marginTop:'20vw'
      }}>

        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <h1>Redirecting to you Login {count} second</h1>
      </div>
    </>
  );
};

export default Spinner;
