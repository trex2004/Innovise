import React, { useEffect, useState } from 'react';
import './SideProfile.css';
import testProfilepic from "./test-profile-pic.jpg"
import api from './axiosbaseurl';

export function SideProfile() {
  const [userId,setUserId] = useState(localStorage.getItem("id"));
  const [userDetails,setUserDetails] = useState();

  useEffect(()=>{
    // Data fetching using id from localstorage
    async function dataFetch(){
      const x = await api.get("/users/" + userId)
      setUserDetails(x.data.payload)
    }

    dataFetch();
  },[userId])

  // What to render after loading data
  if (userDetails){
    
      return (
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={testProfilepic} // Replace with your image URL
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <h2>{userDetails.fullname}</h2>
            <p>{userDetails.bio}</p>
          </div>
          <button className="edit-btn">Edit</button>
        </div>
      );
  }

  return (
    <>Loading...</>
  )
}

export default SideProfile;
