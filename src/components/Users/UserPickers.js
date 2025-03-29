import { useEffect } from "react"
import { CgSpinner } from "react-icons/cg";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";

export default function UserPickers () {
    
    const {data: users = [], status, error} = useQuery({queryKey: ["users"], queryFn: () => getData("http://localhost:3001/users")});

    const [user, setUser] = useUser();

    useEffect(() => {
        setUser(users[0]);
    }, [users, setUser]);

    const handlerSelect = (e) => {
        const selectedUser = users.find(u => u.id == e.target.value);

        setUser(selectedUser);
    }

    if (status === "loading") return <CgSpinner/>

    if (status === "error") return <p>{error.message}</p>;

    return (
        <select className="user-picker" onChange={handlerSelect} value={user?.id}>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
    )
}