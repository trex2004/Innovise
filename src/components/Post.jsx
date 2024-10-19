import {Card,Avatar,Flex,Button, Anchor} from "antd"
import testProfilepic from "./test-profile-pic.jpg"
import { useEffect, useState } from "react"
import api from "./axiosbaseurl"

export function Post({data}){
    
    const [userData,setUserData] = useState([])
    
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
    // console.log(tagsHtml)
    
    
    const handleFollow = () =>{
        console.log("Follow")
    }
    const handleShare = () =>{
        console.log("Share")
    }
    const handleLike = () =>{
        console.log("Like")
    }


    return (
        <Flex gap="middle" vertical align="center" style={{"marginBottom":"1vi"}}>
            <Card style={{"width":"100%","backgroundColor":colour,"border":"none","borderRadius":"20px"}}>
                <Flex gap="middle" align="center" style={{"marginBottom":"1vi"}}>
                    <Flex justify="flex-start" align="center" style={{"width":"70%"}}>
                        <Avatar src={testProfilepic} style={{"marginRight":"1vi","width":"15%","height":"15%"}}/>
                        <div style={{"color":"#FFFFFF"}}>
                            <h4>{userData.fullname}</h4>
                            <p>
                                {userData.bio}
                            </p>
                        </div>   
                    </Flex>

                    <Flex justify="flex-end" style={{"width":"30%"}}>
                        <Button onClick={() => handleFollow()}>Follow</Button>
                    </Flex>  
                </Flex>

                <Flex style={{"marginBottom":"1vi"}}>
                    <p style={{"color":"#FFFFFF"}}>
                        {data.content}
                    </p>
                </Flex>

                <Flex vertical gap="middle">
                    <Flex gap="middle" align="flex-start" justify="flex-start" style={{"height":"50%","color":"#FFFFFF"}}>
                        {data.links.map((x,i)=>{
                            return <a href={x}>Link {i+1}</a>
                        })}
                        
                    </Flex>
                    <Flex gap="middle" align="flex-end" style={{"height":"50%"}} wrap >
                        {tagsHtml}
                    </Flex>
                    <Flex gap="middle" align="flex-end" justify="flex-end" style={{"height":"50%"}}>
                        <Button onClick={() => handleShare()}>Share</Button>
                        <Button onClick={() => handleLike()}>Like</Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}