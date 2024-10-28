import { useEffect, useState } from "react";
import "./ProfilePageHeader.css";
import api from "./axiosbaseurl";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Form, Input, Modal, Select, Upload, ConfigProvider } from 'antd';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ImgCrop from 'antd-img-crop';
import Loader from "./Loader";
import { message } from "antd";


export function ProfilePageHeader() {

    const [userDetails, setUserDetails] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const [reload,setReload] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [options,setOptions] = useState([]);
    const[pic,setPic] =  useState({})
    
    const userId = localStorage.getItem("id")


    useEffect(()=>{
        const getTags = async() => {
            try {
                const x = await api.get("/users/tags")
                let new_options = x.data.payload.map((i)=>{
                    return {
                        value: i
                    }
                })
                setOptions(new_options);
            } catch (error) {
                message.error("Error fetching tags");
            }
        }
        const getUserDetails = async () => {
            try {
                const x = await api.get("/users/" + userId)
                const y = await api.get("/users/" + userId + "/interests")
                setUserTags(y.data.payload)
                setUserDetails(x.data.payload)
            }
            catch (error) {
                message.error("Unable to fetch user data in profile page header component");
            }
        }
        getTags();
        getUserDetails()
    },[reload,userId])


    const tagsHtml = userTags.map((tag, i) => {
        return (
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    const addTags = async (values) => {
        try {
            var bodyFormData = new FormData();
            var i=1;
            values.tags.forEach(tag => {
                bodyFormData.append(`interest[${i}]`,tag)
                i++;
            });
            bodyFormData.append("num",values.tags.length)
            await api.put("/users/",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
            messageApi.open({type: 'success',content: 'Updated interests!',className: 'Poppins-message',style:{}});
            setReload(!reload)
            setShowAddTagModal(false)
        } catch (error) {
            messageApi.open({type: 'error',content: 'Unable to update interests!',className: 'Poppins-message',style:{}});
        }
    }
    
    const editProfile = async (values) => {
        try {
            var bodyFormData = new FormData();
            var i=1;
            values.tags.forEach(tag => {
                bodyFormData.append(`interest[${i}]`,tag)
                i++;
            });
            bodyFormData.append("num",values.tags.length)
            bodyFormData.append("email",values.email)
            bodyFormData.append("bio",values.bio)
            bodyFormData.append("fullname",values.fullname)
            bodyFormData.append("picture",pic)

            await api.put("/users/",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
            messageApi.open({type: 'success',content: 'Updated profile!',className: 'Poppins-message',style:{}});
            setReload(!reload)
            setShowEditProfileModal(false)
        } catch (error) {
            messageApi.open({type: 'error',content: 'Unable to update profile!',className: 'Poppins-message',style:{}});
        }
    }

    let data_b64 = userDetails["picture"];
    localStorage.setItem("picture",data_b64)
    data_b64 = "data:image;base64,"+data_b64

    let colour="#1D1D1D";
    let activeColour = "#131313";
    let passiveColour = "#181818";
    let dropDownColour = "#333333";
    
    return !userDetails?(
        <Loader/>
    ):(
        <>
            <div className="profile-header-main-div d-flex flex-column Poppins">
                {contextHolder}
                <div className="profilepage-display-div d-flex">
                    <div className="profilepage-picture-div d-flex justify-content-center">
                        <img src={data_b64} alt="profile picture" className="rounded-circle profilepage-picture-internal-div m-auto"></img>
                    </div>
                    <div className=" profilepage-details-div d-flex flex-column gap-4 m-auto">
                        <div>
                            <div className="h2">{userDetails.fullname}</div>
                            <div className="">{userDetails.bio}</div>
                        </div>
                        <div className="rounded-pill border ps-2 pe-3 py-2 edit-div-profile-header" onClick={() => setShowEditProfileModal(true)}><EditRoundedIcon/> Edit</div>
                    </div>
                </div>
                <div className=" profilepage-tag-div d-flex flex-wrap gap-2 m-3">
                    {tagsHtml}
                    <div className="rounded-pill ps-2 pe-3 py-2 tag-single-div tag-edit-div Poppins" onClick={() => setShowAddTagModal(true)}><AddRoundedIcon /> Add</div>
                </div>
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
                        multipleItemBg: "#304244",multipleItemBorderColor: activeColour,
                        colorIcon: "#FFFFFF"},
                Upload: {colorText:"#FFFFFF",colorTextPlaceholder:"#3D3D3D",
                        colorBgContainer: passiveColour,
                        activeBorderColor: activeColour,hoverBorderColor: activeColour,
                        optionSelectedBg: activeColour,colorBgElevated: dropDownColour,
                        multipleItemBg: "#304244",multipleItemBorderColor: activeColour,
                        colorIcon: "#FFFFFF"},
                },}}>
                <Modal title="Add Tags" open={showAddTagModal} onCancel={() => setShowAddTagModal(false)} destroyOnClose={true} footer={false} styles={{content: { backgroundColor: colour}, header: { backgroundColor: colour}}}>
                    <Form name="dynamic_form_nest_item"  onFinish={addTags} autoComplete="off" initialValues={{["tags"]:userTags}}>
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
                <Modal title="Edit Profile" open={showEditProfileModal} onCancel={() => setShowEditProfileModal(false)} destroyOnClose={true} footer={false} styles={{content: { backgroundColor: colour}, header: { backgroundColor: colour}}}>
                    <Form name="dynamic_form_nest_item"  onFinish={editProfile} labelCol={{ span: 4 }} layout="horizontal" style={{ maxWidth: 800 }} autoComplete="off" initialValues={{["fullname"]:userDetails.fullname,["bio"]:userDetails.bio,["email"]:userDetails.email,["tags"]:userTags}}>
                        <Form.Item name="fullname" label="FullName" rules={[{ required: true,message: 'Please enter name!'}]}>
                            <Input placeholder="Fullname"/>
                        </Form.Item>
                        <Form.Item name="bio" label="Bio" rules={[{ required: true,message: 'Please enter bio!'}]}>
                            <Input placeholder="Bio"/>
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true,message: 'Please enter email!'}]}>
                            <Input placeholder="example@gmail.com"/>
                        </Form.Item>
                        <Form.Item name="tags" label="Tags" >
                            <Select mode="multiple" placeholder="Please Select Tags" options={options}/>
                        </Form.Item>
                        <Form.Item name="picture" label="Picture">
                            <ImgCrop rotationSlider>
                                <Upload listType="picture-card" maxCount={1} multiple={false} beforeUpload={(file)=>setPic(file)} customRequest={({onSuccess})=>onSuccess("Ok")}>
                                    + Upload
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                        <Form.Item style={{display:"flex",justifyContent:"right"}}> 
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        </>
    )
}