import React from "react";
import { NavBar } from "../components/NavBar";
import "./MainPage.css";
import { ProfileBlurb } from "../components/ProfileBlurb";

const MainPage = () =>{
    return(
        <>
            <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                <div className="nav-right bg-warning d-flex justify-content-center mx-2">
                    <NavBar/>
                </div>
                <div className="middle-collumn bg-primary d-flex justify-content-center mx-2">
                    <p>hello</p>
                </div>
                <div className="nav-left bg-success d-flex justify-content-center mx-2">
                    <ProfileBlurb/>
                </div>
            </div>
        </>
    )
}

export default MainPage;