import { CgSpinner } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";

export default function UsersList ({user, setUser}) {

    const {data: users = [], status, error} = useQuery({queryKey: ["users"], queryFn: () => getData("http://localhost:3001/users")});

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