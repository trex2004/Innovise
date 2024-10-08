import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import api from "../components/axiosbaseurl";
import { useNavigate } from "react-router-dom";
import SideVideo from "../components/sideVideo";
import myImage from "../assets/Group1.png";

import "./RegisterPage.css";

const RegisterPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [fullname, setFullName] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            var bodyFormData = new FormData();
            bodyFormData.append("email", email);
            bodyFormData.append("password", password);
            bodyFormData.append("name", name);
            bodyFormData.append("fullname", fullname); // Fixed to use fullname
            const x = await api.post("/users", bodyFormData);
            console.log(x);
            navigate("/login");
        } catch (error) {
            console.log("register page post error: sending name,email,password,full name");
            console.log(error);
        }
    };

    return (
        <>
            <div className="side-content tw-m-0 tw-overflow-x-auto tw-overflow-y-hidden tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full tw-relative tw-bg-[#111]">
                <div className="vdo">
                    <SideVideo />
                </div>
                <div className="outer-container tw-w-[45vw] tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <div className="image tw-h-32 tw-my-0 tw--mt-16">
                        <img
                            src={myImage}
                            alt="Logo"
                            className="tw-h-auto"
                        />
                    </div>

                    <div className="container tw-w-full tw-h-auto">
                        <div className="heading">{"Register"}</div>
                        <form onSubmit={submitHandler} className="form">
                            <input
                                className="input"
                                required
                                placeholder="Email"
                                value={email}
                                onInput={e => setEmail(e.target.value)}
                                type="email"
                            />
                            <input
                                className="input"
                                required
                                placeholder="Password"
                                value={password}
                                onInput={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <input
                                className="input"
                                required
                                placeholder="UserName"
                                value={name}
                                onInput={e => setName(e.target.value)}
                            />
                            <input
                                className="input"
                                required
                                placeholder="Full Name"
                                value={fullname}
                                onInput={e => setFullName(e.target.value)}
                            />
                            <span className="forgot-password">
                                Already have an account? <a href="/login">{"Login"}</a>
                            </span>
                            <div className="flex tw-justify-center tw-items-center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="login-button tw-px-8 tw-py-3 tw-border-0 tw-bg-[#36A6B2] tw-text-white tw-font-bold tw-transition-all tw-duration-500 hover:tw-bg-[#669ca2] hover:tw-shadow-lg hover:tw-scale-110 active:tw-bg-[#19484d] active:tw-scale-95"
                                >
                                    {"Register"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;