import { useEffect, useState } from "react"
import { CgSpinner } from "react-icons/cg";
import getData from "../../util/api";

export default function UserPickers () {

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData("http://localhost:3001/users")
        .then(data => setUsers(data))
        .catch(err => setError(err));
    }, []);

    if (users == null) return <CgSpinner/>

    if (error) return <p>{error.message}</p>;
    
    return (
        <select>
            {users.map(u => (
                <option key={u.id}>{u.name}</option>
            ))}
        </select>
    )
}