import { useEffect, useState } from "react";
import getData from "../../util/api"
import { CgSpinner } from "react-icons/cg";

export default function UsersList ({user, setUser}) {

    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getData("http://localhost:3001/users")
        .then(data => {
            setUser(data[0]);
            setUsers(data);
            setIsloading(false);
        })
        .catch(error => {
            setError(error);
            setIsloading(false);
        });
    },[setUser]);

    if (error) return <p>{error.message}</p>

    if (isLoading) return <p><CgSpinner/> Loading users...</p>;

    return (
        <ul className="users items-list-nav">
            {users.map(u => (
                <li key={u.id} className={u.id === user?.id ? "selected" : null} >
                    <button className="btn" onClick={() => setUser(u)}>{u.name}</button>
                </li>
            ))}
        </ul>
    );
}