import "./CreatePostBar.css"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect, useState } from "react";
import { Button, ConfigProvider, Form, Input, Modal, Select, message } from "antd";
import api from "./axiosbaseurl";


export function CreatePostBar(props){

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [typeOfPost, setTypeOfPost] = useState("post");
    const [options,setOptions] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [reload,setReload] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const [messageApi, contextHolder] = message.useMessage();
    const [pic,setPic] = useState("");

    useEffect(()=>{
        const getTags = async() => {
            const x = await api.get("/users/tags")
            let new_options = x.data.payload.map((i)=>{
                return {
                    value: i
                }
            })
            setOptions(new_options);
        }
        getTags();
    },[])


    const handleClick = (value) =>{
        try {
            setTypeOfPost(value)
            setShowCreatePostModal(true)
        } catch (error) {
            console.log("Error in create post component")
        }
    }
    
    const handleSearch = (value) =>{
        try {
            setShowSearchModal(true)
        } catch (error) {
            console.log("Error in search component")
        }
    }

    const searchTags = async (values) => {
        try {
            props.tagSetter(values.tags)
            setReload(!reload)
            setShowSearchModal(false)
        } catch (error) {
            console.log(error)
            console.log("add tag modal issue")
        }
    }

    let colour="#1D1D1D";
    let activeColour = "#131313";
    let passiveColour = "#181818";
    let dropDownColour = "#333333";

    if(typeOfPost==="post"){
        colour="#1D1D1D";
        activeColour = "#131313";
        passiveColour = "#181818";
        dropDownColour = "#333333";
    }
    if(typeOfPost==="internship"){
        colour="#081F20";
        activeColour = "#031415";
        passiveColour = "#04191B";
        dropDownColour = "#062A2B";
    }
    if(typeOfPost==="project"){
        colour="#09122D";
        activeColour = "#05090E";
        passiveColour = "#070E17";
        dropDownColour = "#0B1739";
    }

    const submitFormData = async (values) => {
        try {
            var bodyFormData = new FormData();
            var i=1;
            values.tags.forEach(tag => {
                bodyFormData.append(`tag[${i}]`,tag)
                i++;
            });
            bodyFormData.append("num",values.tags.length)
            bodyFormData.append("content",values.textContent)
            bodyFormData.append("type",values.type)
            bodyFormData.append("link[1]",values.link1)
            bodyFormData.append("link[2]",values.link2)
            const data = await api.post("/users/post",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
            messageApi.open({type: 'success',content: 'Added new post!',className: 'Poppins-message',style:{}});
            setShowCreatePostModal(false)
            

        } catch (error) {
            messageApi.open({type: 'error',content: 'Error in adding new post!',className: 'Poppins-message',style:{}});
        }
    }

    return (
        <div className="create-div d-flex flex-column align-items-center gap-3 py-3 Poppins">
            {contextHolder}
            <div className="create-div-top d-flex flex-row gap-4 justify-content-center ">
                <div className="create-bar-picture-div d-flex justify-content-center">
                    <img src={ "data:image;base64,"+localStorage.getItem("picture")} alt="profile picture" className="rounded-circle create-bar-picture-internal-div m-auto"></img>
                </div>
                <div className=" create-post-button-div align-self-center ">
                    <div className="main-create-post-button d-flex align-items-center Poppins-create-post-button px-4 gap-2 py-2" onClick={() => handleSearch("search")}><SearchRoundedIcon fontSize="large"/>Search </div>
                </div>
            </div>

            <div className="create-div-bottom d-flex flex-row gap-4 px-4 Poppins">

            <div variant="outlined" className="post-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("post")}><AddRoundedIcon/>Post</div>
                <div variant="outlined" className="project-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("project")}><AddRoundedIcon/>Project Collab</div>
                 <div variant="outlined" className="intern-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("internship")}><AddRoundedIcon/>Internship</div>
            </div>
            <ConfigProvider theme={{components: {
                Form: {labelColor:"#FFFFFF"}, 
                Modal: {titleColor:"#FFFFFF",titleFontSize:17,titleLineHeight:2,colorIcon:"#FFFFFF"},
                Input: {activeBg: activeColour,activeBorderColor: activeColour,
                        hoverBg: activeColour,hoverBorderColor: activeColour,
                        colorBgContainer: passiveColour,colorBorder: passiveColour,
                        colorText:"#FFFFFF",colorTextPlaceholder:"#3D3D3D"},
                Select: {colorText:"#FFFFFF",colorTextPlaceholder:"#3D3D3D",
                        colorBgContainer: passiveColour,colorBorder: passiveColour,
                        activeBorderColor: activeColour,hoverBorderColor: activeColour,
                        optionSelectedBg: activeColour,colorBgElevated: dropDownColour,
                        multipleItemBg: activeColour,multipleItemBorderColor: activeColour,
                        colorIcon: "#FFFFFF"},
                },}}>
                                {contextHolder}
                    
                <Modal title="Create Post" open={showCreatePostModal} onCancel={() => setShowCreatePostModal(false)} destroyOnClose={true}  footer={false} styles={{content: { backgroundColor: colour}, header: { backgroundColor: colour}}}>
                    <Form onFinish={submitFormData} labelCol={{ span: 4 }} layout="horizontal" style={{ maxWidth: 800 }} initialValues={{["type"]: typeOfPost,["link1"]:"",["link2"]:"" }}>
                        <Form.Item name="type" label="Type" rules={[{ required: true,message: 'Please select Type!'}]} >
                            <Select onChange={(value) => setTypeOfPost(value)}
                                options={[
                                    { value: 'post', label: 'Post' },
                                    { value: 'internship', label: 'Internship' },
                                    { value: 'project', label: 'Project' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="textContent" label="Content" rules={[{ required: true,message: 'Please enter text!'}]} >
                            <Input.TextArea placeholder="Lorem ipsum" />
                        </Form.Item>
                        <Form.Item name="link1" label="Link 1" rules={[{ type: 'url'}, { type: 'string', min: 6 }, {pattern: new RegExp(/(https):\/\/([\w.]+\/?)\S*/), message: "Url is not valid"}]}>
                            <Input placeholder="https://www.example.com" />
                        </Form.Item>
                        <Form.Item name="link2" label="Link 2" rules={[{ type: 'url'}, { type: 'string', min: 6 }, {pattern: new RegExp(/(https):\/\/([\w.]+\/?)\S*/), message: "Url is not valid"}]}>
                            <Input placeholder="https://www.example.com" />
                        </Form.Item>
                        <Form.Item name="tags" label="Tags" rules={[{ required: true,message: 'Please enter atleast 1 tag!'}]}>
                            <Select mode="multiple" placeholder="Please Select Tags" options={options} />
                        </Form.Item>
                        <Form.Item style={{display:"flex",justifyContent:"right"}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="Search By Tags" open={showSearchModal} onCancel={() => setShowSearchModal(false)} destroyOnClose={false} footer={false} styles={{content: { backgroundColor: colour}, header: { backgroundColor: colour}}}>
                    <Form name="dynamic_form_nest_item"  onFinish={searchTags} autoComplete="off" >
                        <Form.Item name="tags" label="Tags" >
                            <Select mode="multiple" placeholder="Please Select Tags" options={options}/>
                        </Form.Item>
                        <Form.Item style={{display:"flex",justifyContent:"right"}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        </div>
    )
}