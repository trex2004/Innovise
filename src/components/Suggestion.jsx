import { useState } from "react"
import "./Suggestion.css"

export function Suggestion(){
    const [users,setUsers] = useState([
        {"pic":"","name":"A"},
        {"pic":"","name":"B"},
    ]);
    return (
        <div className="suggest-div">
            <h3>Suggested</h3>

            <div className="suggest-content">
                {users.map((u)=>{
                    return (
                        <div className="suggest-option">
                            <div className="pic-div"></div>
                            <div className="uname-div">{u.name}</div>
                            <button>Follow</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}