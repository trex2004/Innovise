import { Card, Avatar, Flex, message, ConfigProvider } from "antd"
import { useState } from "react"
import api from "./axiosbaseurl"
import "./Post.css"
import { useNavigate } from "react-router-dom";
import { LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button } from "@mui/material";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LikeButton from "./Like";


export function Post(props) {

    const [data, setData] = useState(props.data);
    const [deleted, setDeleted] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const [messageApi, contextHolder] = message.useMessage();
    const [isLiked,setLiked]=useState(data.has_liked);
    
    const pic = props.pic;
    const navigate = useNavigate();

    let tagsHtml=[]
    if(!deleted){
        tagsHtml = data.tags.map((tag, i) => {
            return (
                <div key={i} className="rounded-pill px-0 py-1 Poppins-tag">
                    {"#"+tag}
                </div>
            )
        })
    }

    
    const handleView = (value) => {
        navigate("/profile/" + value)
    }
    const handleShare = () => {
        navigator.clipboard.writeText("https://innovise-iota.vercel.app/profile/"+data.user_name+"/"+data._id)
        messageApi.open({type: 'success',content: 'Share Link Copied',className: 'Poppins-message',style:{}});
    }

    const handleDelete = async () => {
        try {
            message.success({content: 'Post Deleted Successfully',className: 'Poppins-message',style: {}});
            await api.delete(`/post/${data._id}`, {headers: { Authorization: 'Bearer ' + authToken }});
            setDeleted(true);
            setData([]);
        } catch (error) {
            console.error("Error while deleting post:", error);
            message.error({content: 'Failed to delete post',className: 'Poppins-message',style: {}});
        }
    }
    
    const handleCopyClick = (link) => {
        navigator.clipboard.writeText(link)
        messageApi.open({type: 'success',content: 'Link Copied',className: 'Poppins-message',style:{}});
    }

    const handleLike = async () => {
        try {
            const updatedData = {
                ...data,
                has_liked: !data.has_liked,
                likes: data.has_liked ? data.likes - 1 : data.likes + 1,
            };
            setData(updatedData);
            !data.has_liked? setLiked(true):setLiked(false);

            var bodyFormData = new FormData();
            bodyFormData.append("post_id",data._id)
            bodyFormData.append("like",+ !data.has_liked)
            api.post("/users/like",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
        } catch (error) {
            message.error({content: 'Failed to like post',className: 'Poppins-message',style: {}});
        }
    }
    
    let data_b64 = pic;
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


    if(deleted){
        return(
            <></>
        )
    }

    return (
        <>
        <ConfigProvider theme={{components: {Message: {contentBg:"#2c2c2e",colorText:"white"},},}}>
            {contextHolder}
            <Flex gap="middle" vertical align="center" style={{ "marginBottom": "1vi" }}>
                
                <Card gap="middle" style={{ "width": "100%", "backgroundColor": colour, "border": "none", "borderRadius": "20px" }}>
                    
                    <div className="mx-2">
                    
                        <Flex gap="middle" align="center" style={{ "marginBottom": "1vi" }} >
                            <Flex justify="flex-start" align="start" style={{ "width": "70%"}}>
                                <Avatar src={data_b64} style={{ "marginRight": "1vi", "width": "12%", "height": "12%","cursor":"pointer" }} onClick={() => handleView(data.user_name)}/>
                                <div style={{ "color": "#FFFFFF","cursor":"pointer" }} className="Poppins d-flex flex-column post-name-div" onClick={() => handleView(data.user_name)}>
                                    <h4 className="Poppins-big ">
                                        {data.user_fullname}
                                    </h4>
                                    <p className="Poppins-bio ">
                                        {data.user_bio}
                                    </p>
                                </div>
                            </Flex>

                            <Flex justify="flex-end" style={{ "width": "30%" }}>
                                {props.self?
                                <button className="post-follow-button " onClick={() => handleDelete()}>Delete</button>:
                                <button className="post-follow-button " onClick={() => handleView(data.user_name)}>View</button>}
                            </Flex>
                        </Flex>

                        <Flex style={{ "marginBottom": "1.5vi", "marginTop": "1.5vi" }}>
                            <p style={{ "color": "#FFFFFF" }} className="Poppins-content">
                                {data.content}
                            </p>
                        </Flex>

                        <Flex  gap="small" align="flex-end" style={{ "height": "50%" , "marginBottom": "1.5vi" }} wrap >
                                {tagsHtml}
                            </Flex>

                        <Flex  vertical gap="middle">
                            <Flex gap="middle" align="flex-start" justify="flex-start" style={{ "height": "50%", "color": "#FFFFFF" }}>
                                {data.links.map((x, i) => {
                                    return (
                                        <div key={i} className="p-1 rounded d-flex gap-2 post-link-div " style={{backgroundColor: linkColour}}>
                                            <div className="d-flex gap-1 post-link-main-div" style={{color: "#8F8F8F" , cursor:"pointer"}} onClick={() => window.open(x, '_blank')}>
                                                <div className="post-link-icon"><LinkOutlined /></div>
                                                <p className="post-link-link" >Link {i + 1}</p>
                                            </div>
                                            <div className="post-link-copy-div" onClick={() => handleCopyClick(x)}>
                                                <ContentCopyRoundedIcon className="post-link-copy-div-icon" style={{color:"#8F8F8F"}} fontSize="small"/>
                                            </div>
                                        </div>
                                    )
                                })}

                            </Flex>
                        
                            <Flex gap="middle" align="flex-end" justify="flex-end" style={{ "height": "50%" }}>
                                <Button className="border rounded-pill border-secondary text-secondary Poppins-btn post-btn" onClick={() => handleShare()} style={{textTransform:"none"}} startIcon={<ShareAltOutlined />} >Share</Button>
                                <Button className="border rounded-pill border-secondary text-secondary Poppins-btn" onClick={handleLike} style={{textTransform:"none"}} startIcon={<LikeButton isLiked={isLiked}  />}> {data.likes?data.likes:"Like"} </Button>
                            </Flex>
                        </Flex>
                    </div>
                </Card>
            </Flex>
            </ConfigProvider>
        </>
    )
}