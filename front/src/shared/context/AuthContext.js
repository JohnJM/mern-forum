import {createContext} from 'react';

export const AuthContext = createContext({
    loginState: {isLoggedIn: false},
    login: () => {},
    logout: () => {},
    setColour: () => {}
});