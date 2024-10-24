import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/axiosbaseurl";
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";
import SideVideo from "../components/sideVideo";
import myImage from "../assets/Group1.png";
import { message } from "antd";

const LoginPage = (props) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      var bodyFormData = new FormData();
      bodyFormData.append("password", password);
      bodyFormData.append("username", name);
      const x = await api.post("/users/login", bodyFormData);
      const token = x.data.access_token;
      const username = jwtDecode(token).sub;
      const userId = await api.get("/users/name/" + username);
      localStorage.setItem("username", username);
      localStorage.setItem("id", userId.data.payload._id);
      localStorage.setItem("authToken", x.data.access_token);
      navigate("/");
      message.success("Login Successfull");
    } catch (error) {
      message.error("Login Unsccessfull");
      console.log("login page error: sending name, password");
    }
  };

  return (
    <>
      <div className="side-content tw-m-0 tw-overflow-x-auto tw-overflow-y-hidden tw-flex tw-justify-center tw-items-center tw-w-full tw-h-[100vh] tw-relative tw-bg-[#111]">
        <div className="vdo">
          <SideVideo />
        </div>
        <div className="outer-container tw-w-[45vw] tw-h-auto tw-flex tw-flex-col tw-justify-center tw-items-center">
          <div className="image tw-h-32 tw-my-0 tw--mt-16">
            <img src={myImage} alt="Logo" className="tw-h-auto" />
          </div>
          <div className="container">
            <div className="heading tw-text-6xl">Login</div>
            <form onSubmit={submitHandler} className="form">
              <input
                className="input"
                required
                placeholder="UserName"
                value={name}
                onInput={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                required
                placeholder="Password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                type="password"
              />
              <span className="forgot-password">
                Don't have an account? <a href="/register">{"Register"}</a>
              </span>
              <div className="flex tw-justify-center tw-items-center">
                <Button
                  type="submit"
                  variant="contained"
                  className="login-button tw-px-8 tw-py-3 tw-border-0 tw-bg-[#36A6B2] tw-text-white tw-font-bold tw-transition-all tw-duration-500 hover:tw-bg-[#669ca2] hover:tw-shadow-lg hover:tw-scale-110 active:tw-bg-[#19484d] active:tw-scale-95"
                >
                  {"Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;