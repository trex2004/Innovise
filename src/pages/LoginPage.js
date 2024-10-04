import { Button, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/axiosbaseurl";

const LoginPage = (props) =>{

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            var bodyFormData = new FormData();
            bodyFormData.append("password",password)
            bodyFormData.append("name",name)
            const x = await api.get("/user/66ffaf12b15ab606ef2bd46d")
            console.log(x)
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
                    <TextField required label="Name" value={name} onInput={ e=>setName(e.target.value)}/>
                    <TextField required label="Password" value={password} onInput={ e=>setPassword(e.target.value)} type="password"/>
                    <FormHelperText/>
                    <Button type="submit">Sumbit</Button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;