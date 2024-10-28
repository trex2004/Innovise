import { useEffect, useState } from "react"
import "./Suggestion.css"
import api from "./axiosbaseurl";
import { useNavigate } from "react-router-dom";
import { message } from "antd";



export function Suggestion(props){

    const [users,setUsers] = useState([]);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();


    useEffect(()=> {
        const getSuggestions = async () => {
            try {
                const x = await api.get("/users/suggestions",{headers: {Authorization: 'Bearer ' + authToken}})
                const data = x.data.payload
                setUsers(data)
            } catch (error) {
                messageApi.open({type: 'error',content: 'Unable to fetch suggestions !',className: 'Poppins-message',style:{}});
            }
        }
        getSuggestions();
    },[])
    
    
    const handleClick = (value) =>{
        try {
            navigate("/profile/"+value)
        } catch (error) {
            messageApi.open({type: 'error',content: 'Something went wrong!',className: 'Poppins-message',style:{}});
        }
    }

    const x = users.map((user,i)=>{
        return (
            <div className="suggest-option  d-flex justify-content-between p-1 Poppins" key={i} >
                <div className="d-flex">
                    <div className="suggestions-picture-div d-flex justify-content-center">
                        <img src={"data:image;base64,"+user.picture} alt="profile picture" className="rounded-circle suggestions-picture-internal-div m-auto"></img>
                    </div>
                    <div className="uname-div align-self-center Poppins-sugg" onClick={() => handleClick(user.name)}>{user.fullname}</div>
                </div>  
                <div className="d-flex me-2">
                    <button className="rounded-pill border px-2 py-1 visit-div-suggestions align-self-center Poppins-sugg-btn" onClick={() => handleClick(user.name)}>View</button>
                </div>
            </div>
        )
    })
    
    return (
        <>
            {contextHolder}
            <div className="suggest-div d-flex flex-column gap-3 p-2  justify-content-center Poppins">
                <div className="align-self-center mt-3">
                    <div className="h5">Suggested</div>
                </div>

                <div className="suggest-content d-flex flex-column gap-3">
                    {x}
                </div>
                
            </div>
        </>
    )
}