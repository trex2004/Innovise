import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import "./MainPage.css";
import { SideProfile } from "../components/SideProfile"; // Change of component
import { Suggestion } from "../components/Suggestion";
import { SearchBar } from "../components/SearchBar";
import api from "../components/axiosbaseurl.js"; //import this to send request
import { useNavigate } from "react-router-dom";

const MainPage = () =>{

    const navigate = useNavigate();

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



    return(
        <>
            <div className="d-flex my-4 mx-3 justify-content-evenly responsive-flex ">
                <div className="nav-left d-flex justify-content-center mx-2 rounded">
                    <NavBar/>
                </div>
                <div className="middle-column bg-primary d-flex justify-content-center mx-2">
                    <SearchBar/>
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
        </>
    )
}

export default MainPage;