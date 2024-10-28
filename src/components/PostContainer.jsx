import { useEffect, useState } from "react";
import { Post } from "./Post.jsx";
import api from "./axiosbaseurl.js";
import Loader from "./Loader.jsx";
import { ConfigProvider, Pagination, message } from "antd";
import not_found_src from "./not_found.png"

export function PostContainer(props) {

    const [mapping,setMapping] = useState({})
    const [postData, setPostData] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true); // Add loading state
    const [page, setPage] = useState(1);
    const [noOfPages, setNoOfPages] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const typeFilter = props.type;
    const tagFilter = props.tags;
    const uid = props.id;
    const pid = props.pid;

    useEffect(() => {
        const getPostDetails = async () => {
            setLoading(true);
            setPostData([]);
            try {
                if (uid === "main") {
                    if(typeFilter!="" || tagFilter.length>0){
                        let bodyFormData = new FormData();
                        let i=1;
                        tagFilter.forEach(tag => {
                            bodyFormData.append(`tag[${i}]`,tag)
                            i++;
                        });
                        bodyFormData.append("num",tagFilter.length)
                        if(typeFilter=="following"){
                            bodyFormData.append("following",1)
                        }
                        else{
                            bodyFormData.append("type",typeFilter)
                        }
                        bodyFormData.append("page",page)
                        const x = await api.post("/users/post/filter",bodyFormData, {headers: { Authorization: "Bearer " + authToken },});
                        setNoOfPages(x.data.pages)
                        setPostData(x.data.payload.reverse());
                        setMapping(x.data.mapping)
                    }
                    else{
                        const data = await api.get("/users/post/suggestions"+"?page="+page, {headers: { Authorization: "Bearer " + authToken },});
                        setNoOfPages(data.data.pages)
                        setPostData(data.data.payload);
                        setMapping(data.data.mapping)
                    }
                } else {
                    if(typeFilter!=""){
                        let bodyFormData = new FormData();
                        // let i=1;
                        // tagFilter.forEach(tag => {
                            //     bodyFormData.append(`tag[${i}]`,tag)
                            //     i++;
                            // });
                            // bodyFormData.append("num",tagFilter.length)
                            bodyFormData.append("owner",uid)
                            bodyFormData.append("type",typeFilter)
                            bodyFormData.append("page",page)
                            const x = await api.post("/users/post/filter",bodyFormData, {headers: { Authorization: "Bearer " + authToken },});
                            setNoOfPages(x.data.pages)
                            setPostData(x.data.payload);
                            setMapping(x.data.mapping);
                        }
                    else{
                        if(pid){
                            const data = await api.get("/post/" + pid, {headers: { Authorization: "Bearer " + authToken },});
                            setNoOfPages(data.data.pages)
                            setPostData(data.data.payload);
                            setMapping(data.data.mapping)
                        }
                        else{
                            const data = await api.get("/users/post/" + uid + "?page="+page, {headers: { Authorization: "Bearer " + authToken },});
                            setNoOfPages(data.data.pages)
                            setPostData(data.data.payload);
                            setMapping(data.data.mapping)
                        }
                    }
                }
            } catch (error) {
                messageApi.open({type: 'error',content: 'Couldn\'t fetch posts!',className: 'Poppins-message',style:{}});
            } finally {
                setLoading(false); // Stop loading after data fetch
            }
        };

        getPostDetails();
    }, [uid, authToken, typeFilter, tagFilter, page]);

    let postHtml = postData.map((data, i) => {
            return <Post data={data} pic={mapping[data.user_id]} key={i} self={props.self}></Post>;
        });
    
    if (postData.length == 0){
        postHtml =  <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}>
                        <img className="tw-opacity-25 tw-scale-50" src={not_found_src} alt="not-found-img" width="500vw"/>
                    </div>
    }

    let colour="#1D1D1D";
    let activeColour = "#131313";
    let passiveColour = "#181818";
    let dropDownColour = "#333333";

    if (loading) {
        return (
            <div className="tw-mt-12">
                <Loader />
            </div>
        );
    }

    let pagination = (
        <ConfigProvider theme={{components: {
                    Pagination: {colorBgContainer : dropDownColour, colorText:"#FFFFFF",
                                colorTextDisabled:"#FFFFFF",itemBg:dropDownColour},}
            ,}}>
        <Pagination defaultCurrent={1} current={page} total={noOfPages} onChange={(value) => setPage(value)}/>
        </ConfigProvider>
    )

    return (
        <>
            {contextHolder}
            <div style={{ marginTop: "1vi" }}>
                {postHtml}
            </div>

            {postData.length > 0 ? pagination : <></>}
        </>
    );
}
