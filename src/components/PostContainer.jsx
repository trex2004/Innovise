import { useEffect, useState } from "react";
import { Post } from "./Post.jsx";
import api from "./axiosbaseurl.js";
import Loader from "./Loader.jsx";

export function PostContainer(props) {

    const [mapping,setMapping] = useState({})
    const [postData, setPostData] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true); // Add loading state
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
                        const x = await api.post("/users/post/filter",bodyFormData, {headers: { Authorization: "Bearer " + authToken },});
                        setPostData(x.data.payload.reverse());
                        setMapping(x.data.mapping)
                    }
                    else{
                        const data = await api.get("/users/post/suggestions", {headers: { Authorization: "Bearer " + authToken },});
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
                        const x = await api.post("/users/post/filter",bodyFormData, {headers: { Authorization: "Bearer " + authToken },});
                        setPostData(x.data.payload);
                        setMapping(x.data.mapping)
                    }
                    else{
                        if(pid){
                            const data = await api.get("/post/" + pid, {headers: { Authorization: "Bearer " + authToken },});
                            setPostData(data.data.payload);
                            setMapping(data.data.mapping)
                        }
                        else{
                            const data = await api.get("/users/post/" + uid, {headers: { Authorization: "Bearer " + authToken },});
                            setPostData(data.data.payload);
                            setMapping(data.data.mapping)
                        }
                    }
                }
            } catch (error) {
                console.log("error in post container");
            } finally {
                setLoading(false); // Stop loading after data fetch
            }
        };

        getPostDetails();
    }, [uid, authToken, typeFilter, tagFilter]);


    const postHtml = postData.map((data, i) => {
        return <Post data={data} pic={mapping[data.user_id]} key={i} self={props.self}></Post>;
    });


    // Render loader when data is loading
    if (loading) {
        return (
            <div className="tw-mt-12">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div style={{ marginTop: "1vi" }}>
                {postHtml}
            </div>
        </>
    );
}
