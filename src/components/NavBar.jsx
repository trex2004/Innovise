import { Button } from "@mui/material"
import "./NavBar.css"
import innoviseLogo from "./innovise_logo.png"
import MovingRoundedIcon from '@mui/icons-material/MovingRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function NavBar(props){
    
    const [activeButton,setActiveButton] = useState("")
    const navigate = useNavigate();

    const handleClick = (value) =>{
        if(value=='Trending'){
            props.filterSetter("")
            navigate("/")
            setActiveButton("Trending")
        }
        if(value=='Following'){
            if(activeButton=="Following"){
                props.filterSetter("")
                setActiveButton("Trending")
            }
            else{
                props.filterSetter('following')
                navigate("/")
                setActiveButton("Following")
            }
        }
        if(value=='Post'){
            if(activeButton=="Post"){
                props.filterSetter("")
                setActiveButton("")
            }
            else{
                setActiveButton("Post")
                props.filterSetter('post')
            }
        }
        if(value=='Internships'){
            if(activeButton=="Internships"){
                props.filterSetter("")
                setActiveButton("")
            }
            else{
                setActiveButton("Internships")
                props.filterSetter('internship')
            }
        }
        if(value=='Project'){
            if(activeButton=="Project"){
                props.filterSetter("")
                setActiveButton("")
            }
            else{
                setActiveButton("Project")
                props.filterSetter('project')
            }
        }
    }

    return (
        <div className="side-div d-flex flex-column  ">
            <div className="logo-div d-flex my-3" onClick={() => handleClick('Trending')} style={{cursor:"pointer"}}>
                <img className="logo-div-img rounded" src={innoviseLogo} alt="Innovise Logo" />
            </div>
            <div className="nav-div gap-3 d-flex flex-column">
                <Button className={activeButton=="Trending"?"navbar-Button-active navbar-Button Poppins py-2":"navbar-Button Poppins py-2"} onClick={() => handleClick('Trending')}><MovingRoundedIcon className="icon"/> &nbsp; Trending</Button>
                <Button className={activeButton=="Following"?"navbar-Button-active navbar-Button Poppins py-2":"navbar-Button Poppins py-2"} onClick={() => handleClick('Following')}><HowToRegRoundedIcon className="icon"/> &nbsp; Following</Button>
                <Button className={activeButton=="Post"?"navbar-Button-active navbar-Button Poppins py-2":"navbar-Button Poppins py-2"} onClick={() => handleClick('Post')}><HistoryEduRoundedIcon className="icon"/> &nbsp; Post</Button>
                <Button className={activeButton=="Internships"?"navbar-Button-active navbar-Button Poppins py-2":"navbar-Button Poppins py-2"} onClick={() => handleClick('Internships')}><WorkOutlineOutlinedIcon className="icon"/> &nbsp; Internships</Button>
                <Button className={activeButton=="Project"?"navbar-Button-active navbar-Button Poppins py-2":"navbar-Button Poppins py-2"} onClick={() => handleClick('Project')}><Groups3OutlinedIcon className="icon" /> &nbsp; Project Collab</Button>
            </div>
        </div>
    )
}