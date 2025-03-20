import { useState } from "react"
import data from "../../static.json"

export default function UsersList () {
    const [userIndex, setUserIndex] = useState(0);
    return (
        <ul className="users items-list-nav">
            {data.users.map((u, i) => (
                <li key={u.id} className={i === userIndex ? "selected" : null} >
                    <button className="btn" onClick={() => setUserIndex(i)}>{u.name}</button>
                </li>
            ))}
        </ul>
    )
}