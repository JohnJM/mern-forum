import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom';

import Users from '../user/pages/Users';
import Home from '../home/pages/Home';
import SingleBoardIndex from '../home/pages/SingleBoardIndex';
import SingleThreadAndPosts from '../home/pages/SingleThreadAndPosts';
import Vip from '../vip/pages/Vip';

export const getRoutes = (isLoggedIn) => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
    
            <Route path="/board/:board/thread/:thread">
                <SingleThreadAndPosts/>
            </Route>
    
            <Route path="/board/:board/:index?">
                <SingleBoardIndex/>
            </Route>
            {!!isLoggedIn
                ? <React.Fragment>
                        <Route path="/account/" exact>
                            <Users/>
                        </Route>
    
                        <Route path="/vip" exact>
                            <Vip/>
                        </Route>
                    </React.Fragment>
                : null}
    
            <Redirect to="/"/>
        </Switch>
    );
}