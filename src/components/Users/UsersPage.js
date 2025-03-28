import { useState } from "react";
import UsersDetails from "./UsersDetails";
import UsersList from "./UsersList";
import { useUser } from "./UserContext";

export default function UsersPage () {

    const [user, setUser] = useState(null);

    const [loggedInUser] = useUser();

    const currentUser = user || loggedInUser;

    return (
        <main className="users-page">
            <UsersList user={currentUser} setUser={setUser}/>
            <UsersDetails user={currentUser}/>
        </main>
    )
}