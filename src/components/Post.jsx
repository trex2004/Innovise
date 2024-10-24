import { Card, Avatar, Flex } from "antd"
import { useEffect, useState } from "react"
import api from "./axiosbaseurl"
import "./Post.css"
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button } from "@mui/material";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

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
                    const tempPostData = await api.get("/post/"+data._id,{headers: {Authorization: 'Bearer ' + authToken}})
                    setData(tempPostData.data.payload)
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
            <div key={i} className="rounded-pill px-2 py-1 tag-single-div Poppins-tag">
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
    let linkColour = "#000000";
    if (data.type === "post") {
        colour = "#1D1D1D";
        linkColour = "#333333";
    }
    if (data.type === "internship") {
        colour = "#081F20";
        linkColour = "#06322F";
    }
    if (data.type === "project") {
        colour = "#09122D";
        linkColour = "#0B1745";
    }


    return (
        <Flex gap="middle" vertical align="center" style={{ "marginBottom": "1vi" }}>
            <Card style={{ "width": "100%", "backgroundColor": colour, "border": "none", "borderRadius": "20px" }}>
                <div className="mx-2">
                    <Flex gap="middle" align="center" style={{ "marginBottom": "1vi" }} >
                        <Flex justify="flex-start" align="start" style={{ "width": "70%"}}>
                            <Avatar src={data_b64} style={{ "marginRight": "1vi", "width": "12%", "height": "12%" }} />
                            <div style={{ "color": "#FFFFFF" }} className="Poppins d-flex flex-column post-name-div">
                                <h4 className="Poppins-big ">
                                    {userData.fullname}
                                </h4>
                                <p className="Poppins-bio ">
                                    {userData.bio}
                                </p>
                            </div>
                        </Flex>

                        <Flex justify="flex-end" style={{ "width": "30%" }}>
                            <button className="post-follow-button" onClick={() => handleView(userData.name)}>View</button>
                        </Flex>
                    </Flex>

                    <Flex style={{ "marginBottom": "1.5vi", "marginTop": "1.5vi" }}>
                        <p style={{ "color": "#FFFFFF" }} className="Poppins-content">
                            {data.content}
                        </p>
                    </Flex>

                    <Flex vertical gap="middle">
                        <Flex gap="middle" align="flex-start" justify="flex-start" style={{ "height": "50%", "color": "#FFFFFF" }}>
                            {data.links.map((x, i) => {
                                return (
                                    <div className="p-1 rounded d-flex gap-2 post-link-div " style={{backgroundColor: linkColour}}>
                                        <div className="d-flex gap-1 post-link-main-div" style={{color: "#8F8F8F"}}>
                                            <div className=""><LinkOutlined /></div>
                                            <a href={x} key={i} className="">Link {i + 1}</a>
                                        </div>
                                        <div className="post-link-copy-div"><ContentCopyRoundedIcon style={{color:"#8F8F8F"}} fontSize="small"/></div>
                                    </div>
                                )
                            })}

                        </Flex>
                        <Flex gap="small" align="flex-end" style={{ "height": "50%" }} wrap >
                            {tagsHtml}
                        </Flex>
                        <Flex gap="middle" align="flex-end" justify="flex-end" style={{ "height": "50%" }}>
                            <Button className="border rounded-pill border-secondary text-secondary Poppins-btn post-btn" onClick={() => handleShare()} style={{textTransform:"none"}} startIcon={<ShareAltOutlined />} >Share</Button>
                            <Button className="border rounded-pill border-secondary text-secondary Poppins-btn post-btn" onClick={() => handleLike()} style={{textTransform:"none"}} startIcon={data.has_liked? <HeartFilled style={{color:"red",fontSize:"20px"}}/>: <HeartOutlined style={{color:"red",fontSize:"20px"}}/>}>Like {data.likes?<>&middot;</>:""} {data.likes?data.likes:""} </Button>
                        </Flex>
                    </Flex>
                </div>
            </Card>
        </Flex>
    )
}