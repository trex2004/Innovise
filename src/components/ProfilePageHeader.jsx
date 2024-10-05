import { useEffect, useState } from "react";
import "./ProfilePageHeader.css";
import testProfilepic from "./test-profile-pic.jpg"
import api from "./axiosbaseurl";

export function ProfilePageHeader(){
    
    const [userDetails,setUserDetails] = useState("");

    useEffect(() => {
        const getUserDetails = async () => {
            try{
                const data = await api.get("/test");
                console.log("here")
                setUserDetails(data.data)
            }
            catch (error){
                console.log("something went wrong while retriving user data profile page header component")

            }
        }
        getUserDetails()
    },[])

    console.log(userDetails)
    const tags = ["Backend","Web Development","Cpp","Machine Learning","React.js","Frontend","Figma","Python","Nodejs","JavaScript"]

    const tagsHtml = tags.map((tag,i) => {
        return(
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    return (
        <>
            <div className="test d-flex flex-column Poppins">
                <div className=" profilepage-display-div d-flex">
                    <div className="profilepage-picture-div d-flex justify-content-center">
                        <img src={testProfilepic} alt="profile picture" className="rounded-circle profilepage-picture-internal-div m-auto"></img>
                    </div>
                    <div className="border profilepage-details-div">
                        <p>Profile detaisl</p>
                    </div>
                </div>
                <div className=" profilepage-tag-div d-flex flex-wrap gap-2 m-3">
                    {tagsHtml}
                </div>
            </div>
        </>
    )
}