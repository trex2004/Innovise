import { useEffect, useState } from "react";
import "./ProfilePageHeader.css";
import testProfilepic from "./test-profile-pic.jpg"
import api from "./axiosbaseurl";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Form, Input, Modal, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export function ProfilePageHeader() {

    const [userDetails, setUserDetails] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const userId = localStorage.getItem("id")
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
    }, [])

    // console.log(userDetails)

    const tagsHtml = userTags.map((tag, i) => {
        return (
            <div key={i} className="rounded-pill px-3 py-2 tag-single-div Poppins">
                {tag}
            </div>
        )
    })

    const addTags = async (values) => {
        try {
            const x = []
            values.tags.forEach(tag => {
                x.push(tag.tag)
            });
            console.log(x);
        } catch (error) {
            console.log(error)
            console.log("add tag modal issue")
        }
    }

    return (
        <>
            <div className="profile-header-main-div d-flex flex-column Poppins">
                <div className="profilepage-display-div d-flex">
                    <div className="profilepage-picture-div d-flex justify-content-center">
                        <img src={testProfilepic} alt="profile picture" className="rounded-circle profilepage-picture-internal-div m-auto"></img>
                    </div>
                    <div className=" profilepage-details-div d-flex flex-column gap-4 m-auto">
                        <div>
                            <div className="h2">{userDetails.fullname}</div>
                            <div className="">{userDetails.bio}</div>
                        </div>
                        <div className="rounded-pill border px-3 py-1 edit-div-profile-header">Edit</div>
                    </div>
                </div>
                <div className=" profilepage-tag-div d-flex flex-wrap gap-2 m-3">
                    {tagsHtml}
                    <div className="rounded-pill ps-2 pe-3 py-2 tag-single-div Poppins" onClick={() => setShowModal(true)}><AddRoundedIcon /> Add</div>
                </div>
            </div>
            <Modal title="Add Tags" open={showModal} onCancel={() => setShowModal(false)} destroyOnClose={true} footer={false} >
                <Form name="dynamic_form_nest_item"  onFinish={addTags} autoComplete="off" >
                    <Form.List name="tags">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} >
                                        <div className="d-flex flex-row gap-2 px-2 align-items-baseline"> 
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'tag']}
                                                rules={[{ required: true, message: 'Missing tag',},]} >
                                                <Input placeholder="Tag"/>
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