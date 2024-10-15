import { useEffect, useState } from "react"
import "./Suggestion.css"
import api from "./axiosbaseurl";
import testProfilepic from "./test-profile-pic.jpg"
import { useNavigate } from "react-router-dom";


export function FollowerList(){

    const [users,setUsers] = useState([]);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'))
    const navigate = useNavigate();


    useEffect(()=> {
        const getSuggestions = async () => {
            try {
                const x = await api.get("/users/followers",{headers: {Authorization: 'Bearer ' + authToken}}) //temp until route is made - swayam
                const data = x.data.payload
                setUsers(data)
            } catch (error) {
                console.log("Error in seggestions component while feting data")
            }
        }
        getSuggestions();
    },[])


    const handleClick = (value) =>{
        try {
            navigate("/profile/"+value)
        } catch (error) {
            console.log("Error in navigating to profile : suggestion component")
        }
    }

    const x = users.map((user,i)=>{
        return (
            <div className="suggest-option  d-flex justify-content-between p-1 Poppins" key={i} >
                <div className="d-flex">
                    <div className="suggestions-picture-div d-flex justify-content-center">
                        <img src={testProfilepic} alt="profile picture" className="rounded-circle suggestions-picture-internal-div m-auto"></img>
                    </div>
                    <div className="uname-div align-self-center Poppins-sugg" onClick={() => handleClick(user.name)}>{user.fullname}</div>
                </div>  
                <div className="d-flex me-2">
                    <button className="rounded-pill border px-2 py-1 visit-div-suggestions align-self-center Poppins-sugg " onClick={() => handleClick(user.name)}>View</button>
                </div>
            </div>
        )
    })
    return (
        <div className="suggest-div d-flex flex-column gap-3 p-2  justify-content-center Poppins">
            <div className="align-self-center mt-3">
                <div className="h5">My Followers</div>
            </div>

            <div className="suggest-content d-flex flex-column gap-3">
                {x}
            </div>
        </div>
    )
}