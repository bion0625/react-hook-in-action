import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";
import Avatar from "./Avatar";

const UsersDetails = ({userID}) => {
    const {data: user} = useQuery({
        queryKey: ["user", userID],
        queryFn: () => getData(`http://localhost:3001/users/${userID}`),
        suspense: true
    });

    return user ? (
        <div className="item user">
            <div className="item-header">
                <h2>{user.name}</h2>
            </div>

            <Avatar src={`http://localhost:3001/img/${user.img}`} fallbackSrc={`http://localhost:3001/img/avatar.gif`} alt={user.name}/>

            <div className="user details">
                <h3>{user.title}</h3>
                <p>{user.notes}</p>
            </div>
        </div>
    ) : null
};

export default UsersDetails;