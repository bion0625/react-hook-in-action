import { useContext, useEffect, useState } from "react"
import { CgSpinner } from "react-icons/cg";
import getData from "../../util/api";
import UserContext from "./UserContext";

export default function UserPickers () {

    const {user, setUser} = useContext(UserContext);
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData("http://localhost:3001/users")
        .then(data => {
            setUsers(data);
            setUser(data[0]);
        })
        .catch(err => setError(err));
    }, [setUser]);

    const handlerSelect = (e) => {
        const selectedUser = users.find(u => u.id == e.target.value);

        setUser(selectedUser);
    }

    if (users == null) return <CgSpinner/>

    if (error) return <p>{error.message}</p>;

    return (
        <select className="user-picker" onChange={handlerSelect} value={user?.id}>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
    )
}