import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong Login");
    }
  };

  return (
    <>
      <Layout title={"Forget-Password"}>
        <div className="form-container">
          <h4 className="title">Reset Password</h4>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <input
                type="email"
                value={email}
                class="form-control"
                id="exampleInputEmail"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                value={answer}
                class="form-control"
                id="exampleInputAnswer"
                placeholder="Enter Your favorite sport Name"
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                value={newPassword}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your NewPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Reset Password
            </button>

          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgetPassword;
