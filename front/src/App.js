import React, {useState, useCallback} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainNavigation from './shared/components/nav/MainNavigation'
import Users from './user/pages/Users';
import Home from './home/pages/Home';
import Vip from './vip/pages/Vip';
import {AuthContext, GetAuthFunc} from './shared/context/AuthContext';
import {SideDrawerContext} from './shared/context/SideDrawerContext';
import {useSideDrawer} from './shared/hooks/SideDrawerHook'
import FormLogin from './shared/components/form/FormLogin';

function App() {

    const [sideState,
        toggleOpen,
        displayContent, setContent, displayAlertMsg, hideAlertMsg] = useSideDrawer();


    const [loginState,
        setIsLoggedIn] = useState({isLogged: false, id: 0, username: "", token: ""});

    const login = useCallback((user) => {
        const {id, username} = user;

        console.log('id is -> ', id);
        console.log('un is -> ', username);


        console.log('check below this one btw');
        setIsLoggedIn({isLoggedIn: true, id, username});
        // console.log( setIsLoggedIn([true, {id: id, username: username}]) ); 
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn({isLoggedIn: false});
        displayAlertMsg('Logged out succesfully');
        displayContent(<FormLogin forSideBar/>)
    }, [])


    
    // const [loginState, setIsLoggedIn, login, logout] = GetAuthFunc();



    let routes;

    if (loginState.isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>

                <Route path="/user/:uid" exact>
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
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <AuthContext.Provider
            value={{
            loginState: loginState,
            login: login,
            logout: logout
        }}>
            <SideDrawerContext.Provider value={{
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
    )
}

export default App;
