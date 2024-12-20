import { useEffect, useState } from "react";
import "./ProfilePageHeader.css";
import api from "./axiosbaseurl";
import { message } from "antd";
import Loader from "./Loader";

export function ProfilePageHeaderOtherUser(props) {

    const userName = props.userName
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'))
    const [userDetails, setUserDetails] = useState([]);
    const [userTags, setUserTags] = useState([]);
    const [userId, setUserId] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true)
            try {
                const temp = await api.get("/users/name/"+userName)
                const tempUserId = temp.data.payload._id
                const x = await api.get("/users/" + tempUserId)
                const y = await api.get("/users/" + tempUserId + "/interests")
                const z = await api.get("/users/following/"+tempUserId,{headers: {Authorization: 'Bearer ' + authToken}})
                setIsFollowing(z.data.payload)
                setUserId(tempUserId)
                setUserTags(y.data.payload)
                setUserDetails(x.data.payload)
                setError(false);
            }
            catch (error) {
                messageApi.open({type: 'error',content: 'User Does not exist!',className: 'Poppins-message',style:{}});
                setError(true);
            }
            finally{
                setLoading(false)
            }
        }
        getUserDetails()
        
    }, [userName])

    const handleFollow = async () => {
        try {
            var bodyFormData = new FormData();
            bodyFormData.append("name",userName)
            if(isFollowing){
                bodyFormData.append("delete",1)
                setIsFollowing(false)
                await api.post("/users/following",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
                messageApi.open({type: 'success',content: 'Unfollowed Sucessfully',className: 'Poppins-message',style:{}});

            }
            else{
                bodyFormData.append("delete",0)
                setIsFollowing(true)
                await api.post("/users/following",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
                messageApi.open({type: 'success',content: 'Followed Sucessfully',className: 'Poppins-message',style:{}});

            }

        } catch (error) {
        }
    }

    const tagsHtml = userTags.map((tag, i) => {
        return (
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    let data_b64 = userDetails["picture"];
    data_b64 = "data:image;base64,"+data_b64

    
    if(loading){
        return (
            <Loader/>
        );
    }
    if(error){
        return (
            <>
                {contextHolder}
            </>
        );
    }

    return (
        <>
            {contextHolder}
            <div className="profile-header-main-div d-flex flex-column Poppins">
                <div className="profilepage-display-div d-flex">
                    <div className="profilepage-picture-div d-flex justify-content-center">
                        <img src={data_b64} alt="profile picture" className="rounded-circle profilepage-picture-internal-div m-auto"></img>
                    </div>
                    <div className=" profilepage-details-div d-flex flex-column gap-4 m-auto">
                        <div>
                            <div className="h2">{userDetails.fullname}</div>
                            <div className="h6">{userDetails.email}</div>
                            <div className="">{userDetails.bio}</div>
                        </div>
                        <div className="rounded-pill border px-3 py-1 edit-div-profile-header" onClick={handleFollow}>{isFollowing?"Unfollow":"Follow"}</div>
                    </div>
                </div>
                <div className=" profilepage-tag-div d-flex flex-wrap gap-2 m-3">
                    {tagsHtml}
                </div>
            </div>
            
        </>
    )
}