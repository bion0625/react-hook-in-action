import { useContext, useState } from "react";
import UsersDetails from "./UsersDetails";
import UsersList from "./UsersList";
import UserContext from "./UserContext";

export default function UsersPage () {

    const [user, setUser] = useState(null);

    const {user : loggedInUser} = useContext(UserContext);

    console.log("user:", user);
    console.log("loggedInUser:", loggedInUser);
    const currentUser = user || loggedInUser;
    
    console.log("currentUser:", currentUser);

    return (
        <main className="users-page">
            <UsersList user={currentUser} setUser={setUser}/>
            <UsersDetails user={currentUser}/>
        </main>
    )
}