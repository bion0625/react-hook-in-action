import data from "../../static.json"

export default function UserPickers () {
    
    return (
        <select>
            {data.users.map(u => (
                <option key={u.id}>{u.name}</option>
            ))}
        </select>
    )
}