import { Card, Avatar, Flex } from "antd"
import { useEffect, useState } from "react"
import api from "./axiosbaseurl"
import "./Post.css"
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from "@mui/material";

export function Post(props) {

    const [userData, setUserData] = useState([]);
    const [data, setData] = useState(props.data);
    const [reload, setReload] = useState(false);
    const [loadPost, setLoadPost] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));

    const navigate = useNavigate();



    useEffect(() => {
        const getUserData = async () => {
            try {

                const tempUserData = await api.get("/users/" + data.user_id)
                if(loadPost){
                    // const tempPostData = await api.get("/test")
                    console.log("here")
                    setLoadPost(false)
                }
                
                setUserData(tempUserData.data.payload)
            } catch (error) {
                console.log("error while getting user data in post component")
            }
        }
        getUserData()
    }, [reload,loadPost])

    const tagsHtml = data.tags.map((tag, i) => {
        return (
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    
    const handleView = (value) => {
        navigate("/profile/" + value)
    }
    const handleShare = () => {
        console.log("Share")
    }
    const handleLike = async () => {
        try {
            var bodyFormData = new FormData();
            bodyFormData.append("post_id",data._id)
            bodyFormData.append("like",+ !data.has_liked)
            api.post("/users/like",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
            setReload(!reload)
            setLoadPost(true)
        } catch (error) {
            console.log("error while liking")
        }
    }
    
    let data_b64 = userData["picture"];
    data_b64 = "data:image;base64," + data_b64
    
    let colour = "#000000";
    if (data.type === "post") {
        colour = "#1D1D1D";
    }
    if (data.type === "internship") {
        colour = "#081F20";
    }
    if (data.type === "project") {
        colour = "#09122D";
    }


    return (
        <Flex gap="middle" vertical align="center" style={{ "marginBottom": "1vi" }}>
            <Card style={{ "width": "100%", "backgroundColor": colour, "border": "none", "borderRadius": "20px" }}>
                <div className="mx-2">
                    <Flex gap="middle" align="center" style={{ "marginBottom": "1vi" }} >
                        <Flex justify="flex-start" align="center" style={{ "width": "70%" }}>
                            <Avatar src={data_b64} style={{ "marginRight": "1vi", "width": "17%", "height": "17%" }} />
                            <div style={{ "color": "#FFFFFF" }} className="Poppins">
                                <h4 className="Poppins-big">
                                    {userData.fullname}
                                </h4>
                                <p className="Poppins-bio">
                                    {userData.bio}
                                </p>
                            </div>
                        </Flex>

                        <Flex justify="flex-end" style={{ "width": "30%" }}>
                            <button className="post-follow-button" onClick={() => handleView(userData.name)}>View</button>

                        </Flex>
                    </Flex>

                    <Flex style={{ "marginBottom": "1.5vi", "marginTop": "1.5vi" }}>
                        <p style={{ "color": "#FFFFFF" }} className="Poppins">
                            {data.content}
                        </p>
                    </Flex>

                    <Flex vertical gap="middle">
                        <Flex gap="middle" align="flex-start" justify="flex-start" style={{ "height": "50%", "color": "#FFFFFF" }}>
                            {data.links.map((x, i) => {
                                return <a href={x} key={i}>Link {i + 1}</a>
                            })}

                        </Flex>
                        <Flex gap="small" align="flex-end" style={{ "height": "50%" }} wrap >
                            {tagsHtml}
                        </Flex>
                        <Flex gap="middle" align="flex-end" justify="flex-end" style={{ "height": "50%" }}>
                            <Button className="border rounded-pill" onClick={() => handleShare()}>Share</Button>
                            <Button className="border rounded-pill" onClick={() => handleLike()} startIcon={data.has_liked? <HeartFilled style={{color:"red",fontSize:"20px"}}/>: <HeartOutlined style={{color:"red",fontSize:"20px"}}/>}>Like &middot; {data.likes}</Button>
                        </Flex>
                    </Flex>
                </div>
            </Card>
        </Flex>
    )
}