import {Post} from "./Post.jsx"
export function PostContainer({filter=0}){
    return (
        <>
            <div style={{"marginTop":"1vi"}}>
                <Post></Post>
                <Post></Post>
            </div>
        </>
    )
}