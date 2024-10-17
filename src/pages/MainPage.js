import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import "./MainPage.css";
import { SideProfile } from "../components/SideProfile"; // Change of component
import { Suggestion } from "../components/Suggestion";
import { SearchBar } from "../components/SearchBar";
import { PostContainer } from "../components/PostContainer.jsx";
import api from "../components/axiosbaseurl.js"; //import this to send request
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar.jsx";

const MainPage = () =>{

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const toProfilePage = () => {
        navigate("/profile")
    }

    useEffect(() => {
        async function test(){
            try {
                let data = await api.get('/test'); //sending request to backend with axios
                console.log(data.data); 
            } catch (error) {
                console.log("Opps!! something went wrong")
            }
        }

        test();
        
    },[])


    
    const handleClick = (value) =>{
        
        console.log(value)
    }

    return(
        <>
            <div className="d-flex mx-3 justify-content-evenly responsive-flex ">
                <div className="d-flex flex-column">
                    <div className="nav-top">
                        <div className='border d-flex justify-content-between'>
                            <button onClick={() => handleClick("nav-left")}>left</button>
                            <button onClick={() => handleClick("nav-right")}>right</button>
                        </div>
                    </div>
                    <div>
                        <div className="nav-left d-flex justify-content-center mx-2 rounded">
                            {isOpen && <NavBar/>}
                        </div>
                        <div className="middle-column d-flex flex-column mx-2">
                            <SearchBar/>
                            <PostContainer id={localStorage.getItem("id")}/>
                        </div>
                        <div className="nav-right mx-2">
                            <div onClick={toProfilePage} className="mb-4">
                                <SideProfile/> 
                            </div>
                            <div>
                                <Suggestion/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;