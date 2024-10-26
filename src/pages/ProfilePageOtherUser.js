import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Suggestion } from "../components/Suggestion";
import "./ProfilePage.css"
import { useParams } from "react-router-dom";
import { ProfilePageHeaderOtherUser } from "../components/ProfilePageHeaderOtherUser";
import { PostContainer } from "../components/PostContainer";
import api from "../components/axiosbaseurl";
import Loader from "../components/Loader";
const ProfilePageOtherUser = (props) =>{

    const [userId, setUserId] = useState();
    const userName = useParams().username
    

    
    useEffect(() => {
        const getUserID = async () => {
            try {
                const temp = await api.get("/users/name/"+userName)
                const tempUserId = temp.data.payload._id
                setUserId(tempUserId)
            } catch (error) {
                console.log("Error while trying to get userid in other user profile page")
            }
        }
        getUserID();
        
    },[userName])

    

    return(
        <>
            <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                <div className="nav-left-profile-page d-flex justify-content-center mx-2 ">
                    <NavBar/>
                </div>
                <div className="middle-column-profile-page d-flex flex-column justify-content-center mx-2">
                    <ProfilePageHeaderOtherUser userName={userName} self={false}/>
                    <PostContainer id={userId}/>
                </div>
                <div className="nav-right mx-2 ">
                    <Suggestion/>
                </div>
            </div>
        </>
    )
}

export default ProfilePageOtherUser;