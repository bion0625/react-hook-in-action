import { useEffect, useState } from "react";
import UsersDetails from "./UsersDetails";
import UsersList from "./UsersList";
import { CgSpinner } from "react-icons/cg";

export default function UsersPage () {

    const [user, setUser] = useState(null);

    return (
        <main className="users-page">
            <UsersList user={user} setUser={setUser}/>
            <UsersDetails user={user}/>
        </main>
    )
}