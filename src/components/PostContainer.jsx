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
    const uid = props.id;

    useEffect(() => {
        const getPostDetails = async () => {
            setLoading(true);
            setPostData([]);
            try {
                if (uid === "main") {
                    // if(typeFilter!=""){
                        let bodyFormData = new FormData();
                        // var i=1;
                        // values.tags.forEach(tag => {
                        //     bodyFormData.append(`interest[${i}]`,tag)
                        //     i++;
                        // });
                        // bodyFormData.append("num",values.tags.length)
                        console.log("here" + typeFilter)
                        bodyFormData.append("type",typeFilter)
                        bodyFormData.append("num",0)
                        const x = await api.post("/users/post/filter",bodyFormData, {headers: { Authorization: "Bearer " + authToken },});
                        console.log(x)
                        // setPostData(data.data.payload);
                        // setMapping(data.data.mapping)
                    // }
                    // else{
                        const data = await api.get("/users/post/suggestions", {headers: { Authorization: "Bearer " + authToken },});
                        setPostData(data.data.payload);
                        setMapping(data.data.mapping)
                    // }
                } else {
                    const data = await api.get("/users/post/" + uid, {
                        headers: { Authorization: "Bearer " + authToken },
                    });
                    setPostData(data.data.payload);
                    setMapping(data.data.mapping)
                }
            } catch (error) {
                console.log(error)
                console.log("error in post container");
            } finally {
                setLoading(false); // Stop loading after data fetch
            }
        };

        getPostDetails();
    }, [uid, authToken, typeFilter]);


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
