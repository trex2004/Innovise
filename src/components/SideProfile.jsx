import React, { useEffect, useState } from 'react';
import './SideProfile.css';
import api from './axiosbaseurl';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

export function SideProfile() {
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [userDetails, setUserDetails] = useState([]);
    const [userLogout, setUserLogout] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const navigate = useNavigate();


    useEffect(() => {
        async function dataFetch() {
            const x = await api.get("/users/" + userId)
            setUserDetails(x.data.payload)
        }

        dataFetch();
    }, [userId])

    let data_b64 = userDetails["picture"];
    data_b64 = "data:image;base64,"+data_b64

    useEffect(() => {
        const logout = async () => {
            if(userLogout){
                await api.get("/users/logout",{headers: {Authorization: 'Bearer ' + authToken}})
                localStorage.removeItem("authToken")
                localStorage.removeItem("id")
                localStorage.removeItem("username")
                localStorage.removeItem("picture")
                navigate("/login")
            }
        }

        logout()
    },[userLogout])

    const handleClick = (value) =>{
        if(value=='profile'){
            navigate("/profile")
        }
        if(value=='logout'){
            setUserLogout(true)
        }        
    }

    if (userDetails) {
        return (
            <div className="profile-card Poppins">
                <div onClick={() => handleClick("profile")} style={{cursor:"pointer"}}>
                    <div className="profile-image">
                        <img
                            src={data_b64}
                            alt="Profile"
                        />
                    </div>
                    <div className="profile-details">
                        <h2>{userDetails.fullname}</h2>
                        <p>{userDetails.bio}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-center gap-3'>
                    <button className="edit-btn" onClick={() => handleClick("profile")}>Edit</button>
                    <button className="logout-btn" onClick={() => handleClick("logout")}>Logout</button>
                </div>
            </div>
        );
    }

    return (
        <Loader/>
    )
}

export default SideProfile;
