import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";
import Avatar from "./Avatar";
import { Suspense } from "react";
import UserBookings from "./UserBooking";
import UserTodos from "./UserTodos";

const UsersDetails = ({userID, isPending}) => {
    const {data: user} = useQuery({
        queryKey: ["user", userID],
        queryFn: () => getData(`http://localhost:3001/users/${userID}`),
        suspense: true
    });

    return user ? (
        <div className={isPending ? "item user user-pending" : "item user"}>
            <div className="item-header">
                <h2>{user.name}</h2>
            </div>

            <Avatar src={`http://localhost:3001/img/${user.img}`} fallbackSrc={`http://localhost:3001/img/avatar.gif`} alt={user.name}/>

            <div className="user details">
                <h3>{user.title}</h3>
                <p>{user.notes}</p>
            </div>

            <Suspense fallback={<p>Loading user bookings...</p>}>
                <UserBookings id={userID}/>
            </Suspense>

            {/* <Suspense fallback={<p>Loading user todos...</p>}>
                <UserTodos id={userID}/>
            </Suspense> */}
        </div>
    ) : null
};

export default UsersDetails;