import {createContext, useState, useCallback} from 'react';

export const AuthContext = createContext({
    loginState: {isLoggedIn: false},
    login: () => {},
    logout: () => {}
});



// maybe this should be in its own "useAuth" hook? I think because it's not a reducer its fine in here?

//maybe it doesnt work ;lo


// export const GetAuthFunc = () => {
//     const [loginState,
//         setIsLoggedIn] = useState([false, {id: 0, username: ""}]);

//     const login = useCallback((user) => {
//         const {id, username} = user;

//         console.log('id is -> ', id);
//         console.log('un is -> ', username);


//         console.log('check below this one btw');
//         setIsLoggedIn(true);
//         // console.log( setIsLoggedIn([true, {id: id, username: username}]) ); 
//     }, [])

//     const logout = useCallback(() => {
//         setIsLoggedIn([false]);
//     }, [])

//     return [loginState, setIsLoggedIn, login, logout]
// }
