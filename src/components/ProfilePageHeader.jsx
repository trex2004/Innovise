import { useEffect, useState } from "react";
import "./ProfilePageHeader.css";
import testProfilepic from "./test-profile-pic.jpg"
import api from "./axiosbaseurl";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Form, Input, Modal, Space, AutoComplete, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export function ProfilePageHeader() {

    const [userDetails, setUserDetails] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'));
    const [reload,setReload] = useState(false);

    const [options,setOptions] = useState([]);
    const [selectedOptions,setSelectedOptions] = useState([]);
    
    const userId = localStorage.getItem("id")


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
            setShowModal(false)
        } catch (error) {
            console.log(error)
            console.log("add tag modal issue")
        }
    }

    let data_b64 = userDetails["picture"];
    data_b64 = "data:image;base64,"+data_b64

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
                        <div className="rounded-pill border ps-2 pe-3 py-2 edit-div-profile-header"><EditRoundedIcon/> Edit</div>
                    </div>
                </div>
                <div className=" profilepage-tag-div d-flex flex-wrap gap-2 m-3">
                    {tagsHtml}
                    <div className="rounded-pill ps-2 pe-3 py-2 tag-single-div tag-edit-div Poppins" onClick={() => setShowModal(true)}><AddRoundedIcon /> Add</div>
                </div>
            </div>
            <Modal title="Add Tags" open={showModal} onCancel={() => setShowModal(false)} destroyOnClose={true} footer={false} >
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
        </>
    )
}