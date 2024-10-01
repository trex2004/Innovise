import "./NavBar.css"
export function NavBar(){
    return (
        <div className="side-div">
            <div className="logo-div">
                Innovise
            </div>

            <div className="nav-div">
                <div className="option-div">
                    <div>Trending</div>
                </div>

                <div className="option-div">
                    <div>Search</div>
                </div>

                <div className="option-div">
                    <div>Following</div>
                </div>

                <div className="option-div">
                    <div>Internships</div>
                </div>

                <div className="option-div">
                    <div>Project Collab</div>
                </div>
            </div>
        </div>
    )
}