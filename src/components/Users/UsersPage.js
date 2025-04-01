import { Suspense, useState } from "react";
import UsersDetails from "./UsersDetails";
import UsersList from "./UsersList";
import { useUser } from "./UserContext";
import { FaSpinner } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import getData from "../../util/api";

export default function UsersPage () {

    const [loggedInUser] = useUser();
    const [selectedUser, setSelectedUser] = useState(null);
    const user = selectedUser || loggedInUser;
    const queryClient = useQueryClient();

    const switchUser = (nextUser) => {

        setSelectedUser(nextUser);

        queryClient.prefetchQuery({
            queryKey: ["user", nextUser.id],
            queryFn: () => getData(`http://localhost:3001/users/${nextUser.id}`)
        });

        queryClient.prefetchQuery({
            queryKey: `http://localhost:3001/img/${nextUser.img}`,
            queryFn: () => new Promise(resolve => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = `http://localhost:3001/img/${nextUser.img}`;
            })
        });
    }

    return user ? (
        <main className="users-page">
            <UsersList user={user} setUser={switchUser}/>
            <Suspense fallback={<FaSpinner/>}>
                <UsersDetails userID={user.id}/>
            </Suspense>
        </main>
    ) : null
}