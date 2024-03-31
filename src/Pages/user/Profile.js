import React ,{useState,useEffect} from "react";
import Layout from "../../components/Layout/Layout.js";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Contex/AuthContex.js";
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  const [auth, seAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(()=>{
    const {name,email,phone,address} = auth?.user;
    setName(name)
    setEmail(email)
    setPhone(phone);
    setAddress(address);

  },[auth?.user])

  // form handler function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        "http://localhost:5000/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if(data?.error){
        toast.error(data.error)
      }else{
        seAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("Profile Successfylly updated")
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong Register");
    }
  };

  return (
    <Layout title={"Your-Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="form-container">
              <h4 className="title">Profile</h4>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    value={name}
                    id="exampleInputName"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div class="mb-3">
                  <input
                    type="email"
                    disabled
                    value={email}
                    class="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                   
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    value={password}
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    value={phone}
                    class="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter Your Phone"
                    onChange={(e) => setPhone(e.target.value)}
                   
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    value={address}
                    class="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter Your Address"
                    onChange={(e) => setAddress(e.target.value)}
                    
                  />
                </div>
                   <button type="submit" class="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
