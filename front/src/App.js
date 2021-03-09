import React, {useState, useCallback, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainNavigation from './shared/components/nav/MainNavigation'
import Users from './user/pages/Users';
import Home from './home/pages/Home';
import SingleBoardIndex from './home/pages/SingleBoardIndex';
import SingleThreadAndPosts from './home/pages/SingleThreadAndPosts';
import Vip from './vip/pages/Vip';
import {AuthContext} from './shared/context/AuthContext';
import {SideDrawerContext} from './shared/context/SideDrawerContext';
import {useSideDrawer} from './shared/hooks/SideDrawerHook'
import FormLogin from './shared/components/form/FormLogin';
import SideProfile from './shared/components/profile-side/ProfileSide';

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

let logoutTimer;

function App() {

    // TO DO 
    //          match_input(...inputs) func in form hook / validatiors 
    //          add all this auth below into a hook? 
    //          find a way to handle errors using a model (in the server too)
    //          confirm password on register form and change password
    //          find a good way of cleaning up react code / JSX automatically. 
    //          add isFetching loading spinner as portal on btm right (with react query)
    //          add loading spinners in geenral.
    //          esc closes sidebar

    const [sideState,
        toggleOpen,
        displayContent,
        setContent,
        displayAlertMsg] = useSideDrawer();

    const [tokenExpirationDate,
        setTokenExpirationDate] = useState();

    const [loginState,
        setIsLoggedIn] = useState({isLogged: false, id: 0, username: "", token: ""});

    const login = useCallback((id, username, token, expirationDate) => {
        // const {id, username} = user;

        console.log('id is -> ', id);
        console.log('un is -> ', username);
        console.log('token is -> ', token);

        const tokenExpiry = expirationDate || new Date(new Date().getTime() + (1000 * 60 * 60 * 2));
        setTokenExpirationDate(tokenExpiry);

        localStorage.setItem('user', JSON.stringify({
            id,
            username,
            token,
            expires: tokenExpiry.toISOString()
        }))
        setIsLoggedIn({isLoggedIn: true, id, username, token});
        setContent(<SideProfile />);
        // console.log( setIsLoggedIn([true, {id: id, username: username}]) );
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn({isLoggedIn: false});
        setTokenExpirationDate(null);
        localStorage.removeItem('user');
        displayAlertMsg('Logged out succesfully');
        displayContent(<FormLogin forSideBar/>);
    }, [])

    useEffect(() => {
    
        const storedUser = JSON.parse(localStorage.getItem('user') || null);

        // console.log('effec thit', new Date(storedUser.expires).getTime(), new Date().getTime());

        if (storedUser && storedUser.token && new Date(storedUser.expires).getTime() > new Date().getTime()) {
            login(storedUser.id, storedUser.username, storedUser.token, new Date(storedUser.expires))
        }

    }, [login])

    useEffect(() => {
        if (loginState.token && tokenExpirationDate) {
            const timeTillInvalid = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, timeTillInvalid)
        } else {
            clearTimeout(logoutTimer);
        }
    }, [loginState.token, logout, tokenExpirationDate])

    let routes;

    if (!!loginState.isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>

                <Route path="/board/:board/thread/:thread">
                    <SingleThreadAndPosts />
                </Route>

                <Route path="/board/:board/:index?">
                    <SingleBoardIndex />
                </Route>

                <Route path="/account/" exact>
                    <Users/>
                </Route>

                <Route path="/vip" exact>
                    <Vip/>
                </Route>

                <Redirect to="/"/>
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>

                <Route path="/board/:board/thread/:thread">
                    <SingleThreadAndPosts />
                </Route>

                <Route path="/board/:board/:index?">
                    <SingleBoardIndex />
                </Route>

                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider
                value={{
                loginState: loginState,
                login: login,
                logout: logout
            }}>
                <SideDrawerContext.Provider
                    value={{
                    isOpen: sideState.isOpen,
                    content: sideState.content,
                    alertMsg: sideState.alertMsg,
                    displayContent: displayContent,
                    setContent: setContent,
                    toggleOpen: toggleOpen,
                    displayAlertMsg: displayAlertMsg
                }}>

                    <Router>
                        <MainNavigation/>
                        <main className="p-4">
                            {routes}
                        </main>
                    </Router>
                </SideDrawerContext.Provider>

            </AuthContext.Provider>
        </QueryClientProvider>

    )
}

export default App;
