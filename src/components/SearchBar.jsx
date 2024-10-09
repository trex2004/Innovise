import "./SearchBar.css"

export function SearchBar(){
    return (
        <div className="search-div">
            <div className="search-div-top">
                <div></div>
                <form action="">
                    <input type="text"/>
                </form>
            </div>

            <div className="search-div-bottom">
                <button className="search-div-option">Internship</button>
                <button className="search-div-option">Project Collab</button>
                <button className="search-div-option">Post</button>
            </div>
        </div>
    )
}