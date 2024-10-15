import React from "react";
import { NavBar } from "../components/NavBar";
import { Suggestion } from "../components/Suggestion";
import "./ProfilePage.css"
import { useParams } from "react-router-dom";
import { ProfilePageHeaderOtherUser } from "../components/ProfilePageHeaderOtherUser";
import { PostContainer } from "../components/PostContainer";

const ProfilePageOtherUser = (props) =>{

    const userName = useParams().username

    return(
        <>
            <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                <div className="nav-left-profile-page d-flex justify-content-center mx-2 ">
                    <NavBar/>
                </div>
                <div className="middle-column-profile-page d-flex flex-column justify-content-center mx-2">
                    <ProfilePageHeaderOtherUser userName={userName}/>
                    <PostContainer/>
                </div>
                <div className="nav-right mx-2 ">
                    <Suggestion/>
                </div>
            </div>
        </>
    )
}

export default ProfilePageOtherUser;