import { useEffect, useState } from "react"
import { CgSpinner } from "react-icons/cg";

export default function UserPickers () {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            const resp = await fetch("http://localhost:3001/users");
            const data = await resp.json();
            setUsers(data);
        }
        getUsers();
    }, []);

    if (users == null) return <CgSpinner/>
    
    return (
        <select>
            {users.map(u => (
                <option key={u.id}>{u.name}</option>
            ))}
        </select>
    )
}