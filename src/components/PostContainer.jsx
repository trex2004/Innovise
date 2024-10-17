import { useEffect, useState } from "react"
import {Post} from "./Post.jsx"
import api from "./axiosbaseurl.js"

export function PostContainer(props){

    const [postData,setPostData] = useState([])
    const uid =  props.id;

    useEffect(()=>{
        const getPostDetails = async () =>{
            try {
                const data = await api.get("/users/post/"+uid)
                setPostData(data.data.payload)
            } catch (error) {
                // console.log(error)
                console.log("error in post container")
            }
        }
        getPostDetails()
    },[uid])

    const postHtml = postData.map((data,i) =>{
        return(
            <Post data={data} key={i}></Post>
        )
    })

    return (
        <>
            <div style={{"marginTop":"1vi"}}>
                {postHtml}
            </div>
        </>
    )
}