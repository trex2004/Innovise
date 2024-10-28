import React from "react";
import "./ProfilePage.css"
import { ConfigProvider } from "antd";
import img404 from "../assets/pic404.png"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () =>{

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/")
    }
    

    return(
        <>
            <ConfigProvider theme={{components: {Message: {contentBg:"#2c2c2e",colorText:"white"},},}}>
                <div className="d-flex my-4 mx-3 flex-column justify-content-evenly align-items-center responsive-flex ">
                    <img src={img404} alt="404 not found" style={{width:"50vw"}}/>
                    <Button onClick={() => handleClick()} style={{color:"cyan"}}>Go Back</Button>
                </div>
            </ConfigProvider>

        </>
    )
}

export default NotFoundPage;