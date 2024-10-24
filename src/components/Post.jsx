import {Card,Avatar,Flex,Button, Anchor} from "antd"
import { useEffect, useState } from "react"
import api from "./axiosbaseurl"
import "./Post.css"
import { useNavigate } from "react-router-dom";

export function Post({data}){
    
    const [userData,setUserData] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const tempUserData = await api.get("/users/"+data.user_id)
                setUserData(tempUserData.data.payload)
            } catch (error) {
                console.log("error while getting user data in post component")
            }
        }
        getUserData()
    },[])

    const tagsHtml = data.tags.map((tag, i) => {
        return (
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    let colour = "#000000";
    if(data.type==="post"){
        colour="#1D1D1D";
    }
    if(data.type==="internship"){
        colour="#081F20";
    }
    if(data.type==="project"){
        colour="#09122D";
    }    
    
    const handleView = (value) =>{
        navigate("/profile/"+value)
    }
    const handleShare = () =>{
        console.log("Share")
    }
    const handleLike = () =>{
        console.log("Like")
    }

    let data_b64 = userData["picture"];
    data_b64 = "data:image;base64,"+data_b64

    return (!userData || !data_b64 )?(
        <div className=" tw-flex tw-flex-row tw-gap-2 tw-justify-center">
        <div className="tw-animate-pulse tw-bg-gray-300 tw-w-[10vw] tw-h-[10vh] tw-rounded-full" />
        <div className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-animate-pulse tw-bg-gray-300 tw-w-[20vw] tw-h-[3vh] tw-rounded-full" />
          <div className="tw-animate-pulse tw-bg-gray-300 tw-w-[25vw] tw-h-[3vh] tw-rounded-full" />
        </div>
      </div>
      ):(
        <Flex  gap="middle" vertical align="center" style={{"marginBottom":"1vi"}}>
                <Card style={{"width":"100%","backgroundColor":colour,"border":"none","borderRadius":"20px"}}>
                    <div className="mx-2">
                    <Flex gap="middle" align="center" style={{"marginBottom":"1vi"}} >
                        <Flex justify="flex-start" align="center" style={{"width":"70%"}}>
                            <Avatar src={data_b64} style={{"marginRight":"1vi","width":"11%","height":"11%"}}/>
                            <div style={{"color":"#FFFFFF"}} className="Poppins">
                                <h4 className="Poppins-big">
                                    {userData.fullname}
                                </h4>
                                <p className="Poppins-bio">
                                    {userData.bio}
                                </p>
                            </div>   
                        </Flex>

                        <Flex justify="flex-end" style={{"width":"30%"}}>
                            <button className="post-follow-button" onClick={() => handleView(userData.name)}>View</button>
                            
                        </Flex>  
                    </Flex>

                    <Flex style={{"marginBottom":"1.5vi","marginTop":"1.5vi"}}>
                        <p style={{"color":"#FFFFFF"}} className="Poppins">
                            {data.content}
                        </p>
                    </Flex>

                    <Flex vertical gap="middle">
                        <Flex gap="middle" align="flex-start" justify="flex-start" style={{"height":"50%","color":"#FFFFFF"}}>
                            {data.links.map((x,i)=>{
                                return <a href={x} key={i}>Link {i+1}</a>
                            })}
                            
                        </Flex>
                        <Flex gap="small" align="flex-end" style={{"height":"50%"}} wrap >
                            {tagsHtml}
                        </Flex>
                        <Flex gap="middle" align="flex-end" justify="flex-end" style={{"height":"50%"}}>
                            <Button onClick={() => handleShare()}>Share</Button>
                            <Button onClick={() => handleLike()}>Like</Button>
                        </Flex>
                    </Flex>
                    </div>
                </Card>
        </Flex>
    )
}