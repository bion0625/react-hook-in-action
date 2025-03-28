import { createContext, useContext, useState } from "react";

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

export const useUser = () => {
    const user = useContext(UserContext);
    const setUser = useContext(UserSetContext);

    if (!setUser) throw new Error(`The UseProvider is missing.`);

    return [user, setUser];
};

export default UserContext;