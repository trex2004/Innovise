import "./CreatePostBar.css"
import testProfilepic from "./test-profile-pic.jpg"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useEffect, useState } from "react";
import { AutoComplete, Button, Form, Input, Modal, Select, Space } from "antd";
import api from "./axiosbaseurl";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


export function CreatePostBar(){

    const [showModal, setShowModal] = useState(false);
    const [typeOfPost, setTypeOfPost] = useState("post");
    const [options,setOptions] = useState([]);
    const [selectedOptions,setSelectedOptions] = useState([]);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));


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
            setShowModal(true)
            console.log(value)
        } catch (error) {
            console.log("Error in create post component")
        }
    }

    let colour = "#000000";
    if(typeOfPost==="post"){
        colour="#1D1D1D";
    }
    if(typeOfPost==="internship"){
        colour="#081F20";
    }
    if(typeOfPost==="project"){
        colour="#09122D";
    }

    const submitFormData = async (values) => {
        try {
            var bodyFormData = new FormData();
            var i=1;
            values.tags.forEach(tag => {
                bodyFormData.append(`tag[${i}]`,tag.tag)
                i++;
            });
            bodyFormData.append("num",values.tags.length)
            bodyFormData.append("content",values.textContent)
            bodyFormData.append("type",values.type)
            bodyFormData.append("link[1]",values.link1)
            bodyFormData.append("link[2]",values.link2)
            const data = await api.post("/users/post",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
            setShowModal(false)
        } catch (error) {
            console.log("error while submitting post data")
        }
    }

    return (
        <div className="create-div d-flex flex-column align-items-center gap-4 py-4 Poppins">
            <div className="create-div-top d-flex flex-row gap-4 justify-content-center ">
                <div className="create-bar-picture-div d-flex justify-content-center">
                    <img src={testProfilepic} alt="profile picture" className="rounded-circle create-bar-picture-internal-div m-auto"></img>
                </div>
                <div className=" create-post-button-div align-self-center ">
                    <div className="main-create-post-button d-flex align-items-center Poppins-create-post-button px-4 gap-2" onClick={() => handleClick("post")}><DriveFileRenameOutlineRoundedIcon/>Start a Post</div>
                </div>
            </div>

            <div className="create-div-bottom d-flex flex-row gap-4 px-4 Poppins">
                <div variant="outlined" className="intern-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("internship")}><AddRoundedIcon/>Internship</div>
                <div variant="outlined" className="project-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("project")}><AddRoundedIcon/>Project Collab</div>
                <div variant="outlined" className="post-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("post")}><AddRoundedIcon/>Post</div>
            </div>
            <Modal title="Create Post" open={showModal} onCancel={() => setShowModal(false)} destroyOnClose={true}  footer={false} styles={{content: { backgroundColor: colour}, header: { backgroundColor: colour}}}>
                <Form onFinish={submitFormData} labelCol={{ span: 4 }} layout="horizontal" style={{ maxWidth: 800 }} initialValues={{["type"]: typeOfPost,["link1"]:"",["link2"]:"" }}>
                    <Form.Item name="type" label="Type" rules={[{ required: true,message: 'Please select Type!'}]} >
                        <Select
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
                    <Form.Item name="link1" label="Link 1" rules={[{ type: 'url'}, { type: 'string', min: 6 }]}>
                        <Input placeholder="www.example.com" />
                    </Form.Item>
                    <Form.Item name="link2" label="Link 2" rules={[{ type: 'url'}, { type: 'string', min: 6 }]}>
                        <Input placeholder="www.example.com" />
                    </Form.Item>
                    <Form.List name="tags">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{paddingLeft:12}}>
                                        <div className="d-flex flex-row gap-2 px-2 align-items-baseline"> 
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'tag']}
                                                rules={[{ required: true, message: 'Missing tag',},]} >
                                                <AutoComplete 
                                                    style={{ color: "#FFFFFF" }}
                                                    placeholder="Tag" options={options}
                                                    onSelect={(data)=>{
                                                        setSelectedOptions((x)=>[...x,data]);
                                                    }}
                                                    filterOption={(inputValue, option) =>{
                                                        if (option){
                                                            return option.value.toUpperCase().startsWith(inputValue.toUpperCase())
                                                        }
                                                        return false;
                                                    }
                                                    }
                                                >
                                                    <Input></Input>
                                                </AutoComplete> 
                                            </Form.Item>
                                            <MinusCircleOutlined  onClick={() => remove(name)} />
                                        </div>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Tag
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item style={{display:"flex",justifyContent:"right"}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}