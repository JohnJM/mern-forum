import React, { useState, useCallback, useEffect, Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/nav/MainNavigation'
import Users from './user/pages/Users';
import Home from './home/pages/Home';
import SingleBoardIndex from './home/pages/SingleBoardIndex';
import SingleThreadAndPosts from './home/pages/SingleThreadAndPosts';
import Vip from './vip/pages/Vip';
import { AuthContext } from './shared/context/AuthContext';

import { SideDrawerContext } from './shared/context/SideDrawerContext';
import { useSideDrawer } from './shared/hooks/SideDrawerHook'

import { UserRepliesContext } from './home/context/UserRepliesContext';
import { useUserReplies } from './home/hooks/UserRepliesHook';

import FormLogin from './shared/components/form/FormLogin';
import SideProfile from './shared/components/profile-side/ProfileSide';

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

let logoutTimer;

function App() {

    // TO DO 
    //          add a context / custom hook for persisting user post content whilst they are browsing
    //          move let routes into its own file
    //          refector the auth below into a hook? 
    //          confirm password on register form and change password
    //          add isFetching / loading spinner as portal on btm right (with react query?)
    //          esc closes sidebar?

    const [sideState,
        toggleOpen,
        displayContent,
        setContent,
        displayAlertMsg] = useSideDrawer();

    // login / logout hook
    const [tokenExpirationDate,
        setTokenExpirationDate] = useState();

    const [loginState,
        setIsLoggedIn] = useState({ isLogged: false, id: 0, username: "", token: "" });

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
        setIsLoggedIn({ isLoggedIn: true, id, username, token });
        setContent(<SideProfile />);
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn({ isLoggedIn: false });
        setTokenExpirationDate(null);
        localStorage.removeItem('user');
        displayAlertMsg('Logged out succesfully');
        displayContent(<FormLogin forSideBar />);
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
    // /end of login / logout hook


    const [replyArr, addOrUpdateReply, removeReply] = useUserReplies();

    let routes = (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>

            <Route path="/board/:board/thread/:thread">
                <SingleThreadAndPosts />
            </Route>

            <Route path="/board/:board/:index?">
                <SingleBoardIndex />
            </Route>
            {!!loginState.isLoggedIn ? <>
                <Route path="/account/" exact>
                    <Users />
                </Route>

                <Route path="/vip" exact>
                    <Vip />
                </Route>
            </> : null}

            <Redirect to="/" />
        </Switch>
    );

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
                    {/* should really be in deeper nav component */}
                    <UserRepliesContext.Provider value={{
                        replyArr: replyArr,
                        addOrUpdateReply: addOrUpdateReply,
                        removeReply: removeReply
                    }}>
                        <Router>
                            <MainNavigation />
                            <main className="p-4">
                                {routes}
                            </main>
                        </Router>
                    </UserRepliesContext.Provider>
                </SideDrawerContext.Provider>

            </AuthContext.Provider>
        </QueryClientProvider>

    )
}

export default App;
