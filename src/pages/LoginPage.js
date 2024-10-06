import { Button, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/axiosbaseurl";
import { jwtDecode } from "jwt-decode";

const LoginPage = (props) =>{

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            var bodyFormData = new FormData();
            bodyFormData.append("password",password)
            bodyFormData.append("username",name)
            const x = await api.post("/users/login",bodyFormData)
            const token = x.data.access_token
            const username = jwtDecode(token).sub;
            const userId = await api.get("/users/name/"+username)
            localStorage.setItem("username",username)
            localStorage.setItem("id",userId.data.payload._id)
            localStorage.setItem("authToken",x.data.access_token)
            navigate("/");
        } catch (error) {
            console.log("login page error: sending name, passowrd")
        }
    }

    return(
        <>
            <div>
                <p>Login Page</p>
                <form onSubmit={submitHandler}>
                    <TextField required label="Name" value={name} onChange={ e=>setName(e.target.value)}/>
                    <TextField required label="Password" value={password} onChange={ e=>setPassword(e.target.value)} type="password"/>
                    <FormHelperText/>
                    <Button type="submit">Sumbit</Button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;