

import React from 'react';
import './SideProfile.css';
import myImage from "../assests/profile.jpg";

function SideProfile() {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img
          src={myImage} // Replace with your image URL
          alt="Profile"
        />
      </div>
      <div className="profile-details">
        <h2>Billeshwar Kumar</h2>
        <p>Fish Lover | Rat Hater | IIIT Kottayam</p>
      </div>
      <button className="edit-btn">Edit</button>
    </div>
  );
}

export default SideProfile;
