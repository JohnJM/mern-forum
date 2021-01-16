import {createContext, useState, useCallback} from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

// maybe this should be in its own "useAuth" hook? I think because it's not a reducer its fine in here?
export const GetAuthFunc = () => {
    const [isLoggedIn,
        setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, [])

    return {isLoggedIn, setIsLoggedIn, login, logout}
}
