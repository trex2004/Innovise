import { useEffect, useState } from "react";
import "./ProfilePageHeader.css";
import testProfilepic from "./test-profile-pic.jpg"
import api from "./axiosbaseurl";

export function ProfilePageHeaderOtherUser(props) {

    const userName = props.userName
    const [userDetails, setUserDetails] = useState("");
    const [userTags, setUserTags] = useState([]);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const temp = await api.get("/users/name/"+userName)
                const userId = temp.data.payload._id
                const x = await api.get("/users/" + userId)
                const y = await api.get("/users/" + userId + "/interests")
                setUserTags(y.data.payload)
                setUserDetails(x.data.payload)
            }
            catch (error) {
                console.log("something went wrong while retriving user data, profile page header other user component")

            }
        }
        getUserDetails()
    }, [userName])


    const tagsHtml = userTags.map((tag, i) => {
        return (
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    return (
        <>
            <div className="profile-header-main-div d-flex flex-column Poppins">
                <div className="profilepage-display-div d-flex">
                    <div className="profilepage-picture-div d-flex justify-content-center">
                        <img src={testProfilepic} alt="profile picture" className="rounded-circle profilepage-picture-internal-div m-auto"></img>
                    </div>
                    <div className=" profilepage-details-div d-flex flex-column gap-4 m-auto">
                        <div>
                            <div className="h2">{userDetails.fullname}</div>
                            <div className="">{userDetails.bio}</div>
                        </div>
                    </div>
                </div>
                <div className=" profilepage-tag-div d-flex flex-wrap gap-2 m-3">
                    {tagsHtml}
                </div>
            </div>
            
        </>
    )
}