import { Button } from "@mui/material"
import "./NavBar.css"
import innoviseLogo from "./innovise_logo.png"
import MovingRoundedIcon from '@mui/icons-material/MovingRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useNavigate } from "react-router-dom";


export function NavBar(props){
    
    const navigate = useNavigate();

    const handleClick = (value) =>{
        if(value=='Trending'){
            props.filterSetter("")
            navigate("/")
        }
        if(value=='Following'){
            props.filterSetter('Following')
            navigate("/")
        }
        if(value=='Post'){
            props.filterSetter('Post')
        }
        if(value=='Internships'){
            props.filterSetter('Internships')
        }
        if(value=='Project'){
            props.filterSetter('Project')
        }
    }

    return (
        <div className="side-div d-flex flex-column  ">
            <div className="logo-div d-flex my-3">
                <img className="logo-div-img rounded" src={innoviseLogo} alt="Innovise Logo"/>
            </div>
            <div className="nav-div gap-3 d-flex flex-column">
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Trending')}><MovingRoundedIcon className="icon"/> &nbsp; Trending</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Following')}><HowToRegRoundedIcon className="icon"/> &nbsp; Following</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Post')}> &nbsp; Post</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Internships')}><WorkOutlineOutlinedIcon className="icon"/> &nbsp; Internships</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Project')}><Groups3OutlinedIcon className="icon" /> &nbsp; Project Collab</Button>
            </div>
        </div>
    )
}