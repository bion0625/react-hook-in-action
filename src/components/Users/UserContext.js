import { createContext, useState } from "react";

const UserContext = createContext();

export const UserSetContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    return (
    <UserContext.Provider value={user}>
        <UserSetContext.Provider value={setUser}>
        {children}
        </UserSetContext.Provider>
    </UserContext.Provider>
    )
}

export default UserContext;