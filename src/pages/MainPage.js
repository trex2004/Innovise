import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import "./MainPage.css";
import { SideProfile } from "../components/SideProfile"; // Change of component
import { Suggestion } from "../components/Suggestion";
import { PostContainer } from "../components/PostContainer.jsx";
import api from "../components/axiosbaseurl.js"; //import this to send request
import { CreatePostBar } from "../components/CreatePostBar.jsx";
import { ConfigProvider, message } from "antd";



const MainPage = () =>{

    const [typeFilter,setTypeFilter] = useState("")
    const [tagFilter,setTagFilter] = useState([])
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        async function test(){
            try {
                let data = await api.get('/test'); //sending request to backend with axios
                console.log(data.data); 
            } catch (error) {
                messageApi.open({type: 'error',content: 'Oops!! something went wrong!',className: 'Poppins-message',style:{}});
            }
        }

        test();
        
    },[])

    const handleClick = (value) =>{
        console.log(value)
    }
   

    return(
        <>
            <ConfigProvider theme={{components: {Message: {contentBg:"#2c2c2e",colorText:"white"},},}}>
                {contextHolder}
                <div className=" d-flex mx-3 justify-content-evenly responsive-flex ">
                    <div className="d-flex flex-column">
                        <div className="nav-top">
                            <div className='border d-flex justify-content-between'>
                                <button onClick={() => handleClick("nav-left")}>left</button>
                                <button onClick={() => handleClick("nav-right")}>right</button>
                            </div>
                        </div>
                        <div>
                            <div className="nav-left d-flex justify-content-center mx-2 rounded " >
                                <NavBar filterSetter={setTypeFilter}/>
                            </div>
                            <div className="middle-column d-flex flex-column mx-2">
                                <CreatePostBar tagSetter={setTagFilter}/>
                                <PostContainer id={"main"} self={false} type={typeFilter} tags={tagFilter}/>
                            </div>
                            <div className="nav-right mx-2">
                                <div className="mb-4">
                                    <SideProfile/> 
                                </div>
                                <div className="tw-mt-5">
                                    <Suggestion/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </>
    );
}

export default MainPage;