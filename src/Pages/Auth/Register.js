import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css'
import { useNavigate } from "react-router-dom";
const baseUrl = 'https://mern-backend-bvwk.onrender.com'

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [phone,setPhone] =useState('');
    const [address,setAddress] =useState('');
    const [answer,setAnswer]= useState('')
    const navigate = useNavigate();

    // form handler function
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          const res = await axios.post(`${baseUrl}/api/v1/auth/register`,{
            name,
            email,
            password,
            phone,
            address,
            answer
          });
          if(res.data.success){
            toast.success(res.data.message);
            navigate('/login');

          }else{
            toast.error(res.data.message);
          }

        }catch(error){
          console.log(error);
          toast.error("something went wrong Register")
        } 
    }
    // console.log(process.env.REACT_APP_API)

  return (
    <>
      <Layout title={"register"}>
        <div className="form-container">
          <h4 className="title">REGISTER FORM</h4>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <input type="text"
               class="form-control" 
               value={name}
               id="exampleInputName"
               placeholder="Enter Your Name"
               onChange={(e)=>setName(e.target.value)} 
               required
               />
            </div>

            <div class="mb-3">
              <input type="email"
              value={email}
               class="form-control" 
               id="exampleInputEmail"
               placeholder="Enter Your Email" 
               onChange={(e)=>setEmail(e.target.value)}
               required />
            </div>
            <div class="mb-3">
              
              <input
                type="password"
                value={password}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <input type="text"
              value={phone}
               class="form-control" 
               id="exampleInputPhone"
               placeholder="Enter Your Phone" 
               onChange={(e)=>setPhone(e.target.value)}
               required/>
            </div>
            <div class="mb-3">
              <input type="text"
              value={address}
               class="form-control" 
               id="exampleInputAddress"
               placeholder="Enter Your Address"
               onChange={(e)=>setAddress(e.target.value)}
               required
             />
            </div>
            <div class="mb-3">
              <input type="text"
              value={answer}
               class="form-control" 
               id="exampleInputAnswer"
               placeholder="What is your favorite sports"
               onChange={(e)=>setAnswer(e.target.value)}
               required
             />
            </div>

            <button type="submit" class="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
