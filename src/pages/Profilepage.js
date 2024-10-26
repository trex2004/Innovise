import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { ProfilePageHeader } from "../components/ProfilePageHeader";
import "./ProfilePage.css"
import { FollowerList } from "../components/FollowerList";
import { PostContainer } from "../components/PostContainer";


const ProfilePage = () =>{

    const [typeFilter,setTypeFilter] = useState("")

    return(
        <>
            
            <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                <div className="nav-left-profile-page d-flex justify-content-center mx-2 ">
                    <NavBar  filterSetter={setTypeFilter}/>
                </div>
                <div className="middle-column-profile-page d-flex flex-column justify-content-center mx-2">
                    <ProfilePageHeader/>
                    <PostContainer id={localStorage.getItem("id")} self={true} type={typeFilter}/>
                </div>
                <div className="nav-right-profile-page mx-2">
                    <FollowerList/>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;