import { useEffect, useState, message } from "react";
import "./ProfilePageHeader.css";
import testProfilepic from "./test-profile-pic.jpg"
import api from "./axiosbaseurl";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Form, Input, Modal, Space, AutoComplete, Select, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ImgCrop from 'antd-img-crop';

export function ProfilePageHeader() {

    const [userDetails, setUserDetails] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const [reload,setReload] = useState(false);

    const [options,setOptions] = useState([]);
    const [selectedOptions,setSelectedOptions] = useState([]);
    
    const userId = localStorage.getItem("id")

    const[pic,setPic] =  useState({})
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
    },[reload])
    // console.log(userId)

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const x = await api.get("/users/" + userId)
                const y = await api.get("/users/" + userId + "/interests")
                setUserTags(y.data.payload)
                setUserDetails(x.data.payload)
            }
            catch (error) {
                console.log("something went wrong while retriving user data, profile page header component")

            }
        }
        getUserDetails()
    }, [reload])


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
            await api.post("/users/interests",bodyFormData,{headers: {Authorization: 'Bearer ' + authToken}})
            setReload(!reload)
            setShowAddTagModal(false)
        } catch (error) {
            console.log(error)
            console.log("add tag modal issue")
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

            setReload(!reload)
            setShowEditProfileModal(false)
        } catch (error) {
            console.log("edit profile modal issue")
        }
    }

    let data_b64 = userDetails["picture"];
    data_b64 = "data:image;base64,"+data_b64

    // const [fileList, setFileList] = useState([
    //     {
    //       uid: '-1',
    //       name: 'image.png',
    //       status: 'done',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //   ]);



    //   const onPreview = async (file) => {
    //     let src = file.url;
    //     if (!src) {
    //       src = await new Promise((resolve) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file.originFileObj);
    //         reader.onload = () => resolve(reader.result);
    //       });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    //   };

    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    // const handleChange = (info) => {
    //   if (info.file.status === 'uploading') {
    //     setLoading(true);
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, (url) => {
    //       setLoading(false);
    //       setImageUrl(url);
    //     });
    //   }
    // };

    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    //   };
    //   const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     if (!isJpgOrPng) {
    //       message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //       message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    //   };

    const handlesub = (values) =>{

        console.log("Like")
    }

    return (
        <>
            <div className="profile-header-main-div d-flex flex-column Poppins">
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
            <Modal title="Add Tags" open={showAddTagModal} onCancel={() => setShowAddTagModal(false)} destroyOnClose={true} footer={false} >
                <Form name="dynamic_form_nest_item"  onFinish={addTags} autoComplete="off" >
                    <Form.Item name="tags" label="Tags" >
                        <Select mode="multiple" placeholder="Please Select Tags" options={options}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Edit Porfile" open={showEditProfileModal} onCancel={() => setShowEditProfileModal(false)} destroyOnClose={true} footer={false} >
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
                    <Form.Item> 
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}