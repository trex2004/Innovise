import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Suggestion } from "../components/Suggestion";
import "./ProfilePage.css"
import { useParams } from "react-router-dom";
import { ProfilePageHeaderOtherUser } from "../components/ProfilePageHeaderOtherUser";
import { PostContainer } from "../components/PostContainer";
import api from "../components/axiosbaseurl";
import { ConfigProvider, message } from "antd";


const ProfilePageOtherUser = (props) =>{

    const [userId, setUserId] = useState();
    const userName = useParams().username
    const pid = useParams().pid
    const [typeFilter,setTypeFilter] = useState("")
    const [messageApi, contextHolder] = message.useMessage();


    
    useEffect(() => {
        const getUserID = async () => {
            try {
                const temp = await api.get("/users/name/"+userName)
                const tempUserId = temp.data.payload._id
                setUserId(tempUserId)
            } catch (error) {
                messageApi.open({type: 'error',content: 'User Not Found!',className: 'Poppins-message',style:{}});

            }
        }
        getUserID();
        
    },[userName])

    

    return(
        <>
            <ConfigProvider theme={{components: {Message: {contentBg:"#2c2c2e",colorText:"white"},},}}>
                <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                    <div className="nav-left-profile-page d-flex justify-content-center mx-2 ">
                        <NavBar filterSetter={setTypeFilter}/>
                    </div>
                    <div className="middle-column-profile-page d-flex flex-column justify-content-center mx-2">
                        <ProfilePageHeaderOtherUser userName={userName}  />
                        <PostContainer id={userId} self={false} type={typeFilter} pid={pid}/>
                    </div>
                    <div className="nav-right mx-2 ">
                        <Suggestion/>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}

export default ProfilePageOtherUser;