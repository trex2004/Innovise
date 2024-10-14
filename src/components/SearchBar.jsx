import "./SearchBar.css"

export function SearchBar(){
    return (
        <div className="search-div border border-black d-flex flex-column align-items-center gap-4 pt-4">
            <div className="search-div-top d-flex flex-row gap-4 justify-content-center">
                <div className="p-3 rounded-circle border border-black"></div>
                <form action="">
                    <input type="text"/>
                </form>
            </div>

            <div className="search-div-bottom d-flex flex-row justify-content-evenly">
                <button className="search-div-option border border-black">Internship</button>
                <button className="search-div-option border border-black">Project Collab</button>
                <button className="search-div-option border border-black">Post</button>
            </div>
        </div>
    )
}