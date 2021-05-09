import React, {useState, useCallback, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

import MainNavigation from './shared/components/nav/MainNavigation'
import {getRoutes} from './shared/routes';

import {AuthContext} from './shared/context/AuthContext';
import {SideDrawerContext} from './shared/context/SideDrawerContext';
import {UserRepliesContext} from './home/context/UserRepliesContext';

import {useAuth} from './shared/hooks/AuthHook';
import {useSideDrawer} from './shared/hooks/SideDrawerHook'
import {useUserReplies} from './home/hooks/UserRepliesHook';

import {handleLogin} from './shared/helper/handleLogin';
import {handleLogout} from './shared/helper/handleLogout';

const queryClient = new QueryClient();

let logoutTimer;

function App() {

    const [sideState,
        toggleOpen,
        displayContent,
        setContent,
        displayAlertMsg] = useSideDrawer();

    const [replyArr,
        addOrUpdateReply,
        removeReply,
        appendQuoteToReply] = useUserReplies();

    const [tokenExpirationDate,
        setTokenExpirationDate] = useState();

    const [loginState,
        setLoginState,
        setLogoutState,
        setColour] = useAuth();

    const login = useCallback((id, username, token, expirationDate, colour) => {
        handleLogin({
            id,
            username,
            token,
            expirationDate,
            colour
        }, setTokenExpirationDate, setLoginState, setContent);
    }, [setContent, setLoginState])

    const logout = useCallback(() => {
        handleLogout(setLogoutState, setTokenExpirationDate, displayAlertMsg, displayContent);
    }, [displayAlertMsg, displayContent, setLogoutState])

    //auto login if user exists in localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || null);
        if (storedUser && storedUser.token && new Date(storedUser.expires).getTime() > new Date().getTime()) {
            login(storedUser.id, storedUser.username, storedUser.token, new Date(storedUser.expires), storedUser.colour || false);
        }
    }, [login])

    //if we are loggedin set a timer before logout.
    useEffect(() => {
        if (loginState.token && tokenExpirationDate) {
            const timeTillInvalid = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, timeTillInvalid);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [loginState.token, logout, tokenExpirationDate])

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider
                value={{
                loginState,
                login,
                logout,
                setColour
            }}>
                <SideDrawerContext.Provider
                    value={{
                    isOpen: sideState.isOpen,
                    content: sideState.content,
                    alertMsg: sideState.alertMsg,
                    displayContent,
                    setContent,
                    toggleOpen,
                    displayAlertMsg
                }}>
                    <UserRepliesContext.Provider
                        value={{
                        replyArr,
                        addOrUpdateReply,
                        appendQuoteToReply,
                        removeReply
                    }}>
                        <Router>
                            <MainNavigation/>
                            <main className="p-4">
                                {getRoutes(!!loginState.isLoggedIn)}
                            </main>
                        </Router>
                    </UserRepliesContext.Provider>
                </SideDrawerContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}

export default App;
