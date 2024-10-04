import { Button, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";
import api from "../components/axiosbaseurl";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            var bodyFormData = new FormData();
            bodyFormData.append("email",email)
            bodyFormData.append("password",password)
            bodyFormData.append("name",name)
            const x = await api.post("/users",bodyFormData)
            console.log(x)
            navigate("/login");
        } catch (error) {
            console.log("register page post error: sending name,email passowrd")
            console.log(error)
        }
    }

    return(
        <>
            <div>
                <p>Register Page</p>
                <form onSubmit={submitHandler}>
                    <TextField required label="Email" value={email} onInput={ e=>setEmail(e.target.value)} type="email"/>
                    <TextField required label="Password" value={password} onInput={ e=>setPassword(e.target.value)} type="password"/>
                    <TextField required label="Name" value={name} onInput={ e=>setName(e.target.value)}/>
                    <FormHelperText/>
                    <Button type="submit">Sumbit</Button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage;