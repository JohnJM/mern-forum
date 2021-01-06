import React, {useState, useCallback} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainNavigation from './shared/components/nav/MainNavigation'
import Users from './user/pages/Users';
import Home from './home/pages/Home';
import Vip from './vip/pages/Vip';
import {AuthContext} from './shared/context/AuthContext';

function App() {
    const [isLoggedIn,
        setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, [])

    let routes;

    if (isLoggedIn) {
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
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout
        }}>
            <Router>
                <MainNavigation/>
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
