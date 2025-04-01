import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";
import { FaSpinner } from "react-icons/fa";

export default function UsersList ({user, setUser, isPending}) {

    const {data: users = []} = useQuery({
        queryKey: ["users"], 
        queryFn: () => getData("http://localhost:3001/users"),
        suspense: true
    });

    return (
        <ul className="users items-list-nav">
            {users.map(u => (
                <li key={u.id} className={u.id === user?.id ? "selected" : null} >
                    <button className="btn" onClick={() => setUser(u)}>
                        {u.id === user?.id && isPending && <FaSpinner/>}{u.name}{u.id === user?.id && isPending && <FaSpinner/>}
                    </button>
                </li>
            ))}
        </ul>
    );
}