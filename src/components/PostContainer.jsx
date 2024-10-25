import { useEffect, useState } from "react";
import { Post } from "./Post.jsx";
import api from "./axiosbaseurl.js";
import Loader from "./Loader.jsx";

export function PostContainer(props) {
    const [postData, setPostData] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true); // Add loading state
    const uid = props.id;

    useEffect(() => {
        const getPostDetails = async () => {
            setLoading(true);
            setPostData([]);
            try {
                if (uid === "main") {
                    const data = await api.get("/users/post/suggestions", {
                        headers: { Authorization: "Bearer " + authToken },
                    });
                    setPostData(data.data.payload);
                } else {
                    const data = await api.get("/users/post/" + uid, {
                        headers: { Authorization: "Bearer " + authToken },
                    });
                    // console.log(data.data.payload)
                    setPostData(data.data.payload);
                }
            } catch (error) {
                console.log("error in post container");
            } finally {
                setLoading(false); // Stop loading after data fetch
            }
        };

        getPostDetails();
    }, [uid, authToken]);

    const postHtml = postData.map((data, i) => {
        return <Post data={data} key={i}></Post>;
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
