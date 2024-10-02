import { Button } from "@mui/material"
import "./NavBar.css"
import innoviseLogo from "./innovise_logo.png"
import MovingRoundedIcon from '@mui/icons-material/MovingRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';

const handleClick = (value) =>{
    console.log(value)
}

export function NavBar(){
    return (
        <div className="side-div d-flex flex-column  ">
            <div className="logo-div d-flex my-3">
                <img className="logo-div-img rounded" src={innoviseLogo} alt="Innovise Logo"/>
            </div>
            <div className="nav-div gap-3 d-flex flex-column">
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Trending')}><MovingRoundedIcon/> &nbsp; Trending</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Search')}><SearchRoundedIcon/> &nbsp; Search</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Following')}><HowToRegRoundedIcon/> &nbsp; Following</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Internships')}><WorkRoundedIcon/> &nbsp; Internships</Button>
                <Button className="navbar-Button Poppins py-2" onClick={() => handleClick('Project')}><TipsAndUpdatesRoundedIcon/> &nbsp; Project Collab</Button>
            </div>
        </div>
    )
}