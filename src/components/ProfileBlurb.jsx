import "./ProfileBlurb.css"

export function ProfileBlurb(){
    return (
        <div className="profile-blurb-div">
            <div className="profile-details-div">
                <div className="profile-pic-div">

                </div>

                <div className="user-details-div">
                    <p>User Name</p>
                    <p>Bio</p>
                </div>
            </div>

            <div className="profile-edit-div">
                <button className="profile-edit-button">Edit</button>
            </div>
        </div>
    )
}