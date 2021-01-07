import {createContext, useState, useCallback} from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

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
