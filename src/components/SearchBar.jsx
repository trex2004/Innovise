import { Button, TextField } from "@mui/material"
import "./SearchBar.css"
import testProfilepic from "./test-profile-pic.jpg"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

export function SearchBar(){
    const handleClick = (value) =>{
        try {
            console.log(value)
        } catch (error) {
            console.log("Error in create post component")
        }
    }

    return (
        <div className="search-div d-flex flex-column align-items-center gap-4 py-4 Poppins">
            <div className="search-div-top d-flex flex-row gap-4 justify-content-center ">
                <div className="search-bar-picture-div d-flex justify-content-center">
                    <img src={testProfilepic} alt="profile picture" className="rounded-circle search-bar-picture-internal-div m-auto"></img>
                </div>
                <div className=" create-post-button-div align-self-center ">
                    <div className="main-create-post-button d-flex align-items-center Poppins-create-post-button px-4 gap-2" onClick={() => handleClick("base")}><DriveFileRenameOutlineRoundedIcon/>Start a Post</div>
                </div>
            </div>

            <div className="search-div-bottom d-flex flex-row gap-4 px-4 Poppins">
                <div variant="outlined" className="intern-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("internship")}><AddRoundedIcon/>Internship</div>
                <div variant="outlined" className="project-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("project")}><AddRoundedIcon/>Project Collab</div>
                <div variant="outlined" className="post-button base-post-button d-flex align-items-center rounded-pill Poppins-create-post-sub-button gap-2" onClick={() => handleClick("post")}><AddRoundedIcon/>Post</div>
            </div>
        </div>
    )
}