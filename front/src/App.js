import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainNavigation from './shared/components/nav/MainNavigation'
import Users from './user/pages/Users';
import Home from './home/pages/Home';
import Vip from './vip/pages/Vip';
import {AuthContext, GetAuthFunc} from './shared/context/AuthContext';
import {SideDrawerContext} from './shared/context/SideDrawerContext';
import {useSideDrawer} from './shared/hooks/SideDrawerHook'

function App() {
    
    const authFunc = GetAuthFunc();

    const [sideState,
        toggleOpen,
        displayContent, setContent, displayAlertMsg] = useSideDrawer();

    let routes;

    if (authFunc.isLoggedIn) {
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
            isLoggedIn: authFunc.isLoggedIn,
            login: authFunc.login,
            logout: authFunc.logout
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
