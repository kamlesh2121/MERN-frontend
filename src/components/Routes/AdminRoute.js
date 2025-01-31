import { useState,useEffect } from "react";
import { useAuth } from "../../Contex/AuthContex";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
const baseUrl = 'https://mern-backend-bvwk.onrender.com'


export default function AdminRoute(){
    const [ok,setOk] = useState(false);
    const [auth] = useAuth();

    useEffect( () =>{
        const authCheck = async ()=>{
            const res = await axios.get(`${baseUrl}/api/v1/auth/admin-auth`);
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()

    },[auth?.token])
    return ok ? <Outlet/> : <Spinner/>
}