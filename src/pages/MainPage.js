import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import "./MainPage.css";
import { ProfileBlurb } from "../components/ProfileBlurb";
import { Suggestion } from "../components/Suggestion";
import { SearchBar } from "../components/SearchBar";
import api from "../components/axiosbaseurl.js";

const MainPage = () =>{

    useEffect(() => {
        async function test(){
            try {
                let data = await api.get('/');
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
                <div className="nav-right bg-success d-flex justify-content-center mx-2 flex-column">
                    <ProfileBlurb/>
                    <Suggestion/>
                </div>
            </div>
        </>
    )
}

export default MainPage;