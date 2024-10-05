import React from "react";
import { NavBar } from "../components/NavBar";
import { Suggestion } from "../components/Suggestion";
import { ProfilePageHeader } from "../components/ProfilePageHeader";
import "./ProfilePage.css"

const ProfilePage = () =>{
    return(
        <>
            <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                <div className="nav-left-profile-page d-flex justify-content-center mx-2 ">
                    <NavBar/>
                </div>
                <div className="middle-column-profile-page d-flex justify-content-center mx-2">
                    <ProfilePageHeader/>
                </div>
                <div className="nav-right bg-success d-flex justify-content-center mx-2 flex-column">
                    <Suggestion/>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;