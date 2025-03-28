import { CgSpinner } from "react-icons/cg";
import useFetch from "../../util/useFetch";

export default function UsersList ({user, setUser}) {

    const {data : users = [], status, error} = useFetch("http://localhost:3001/users");

    if (status === "error") return <p>{error.message}</p>

    if (status === "loading") return <p><CgSpinner/> Loading users...</p>;

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