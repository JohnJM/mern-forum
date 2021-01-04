import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainNavigation from './shared/components/nav/MainNavigation'
import Users from './user/pages/Users';
import Home from './home/pages/Home';
import Vip from './vip/pages/Vip';


function App() {
    return (

        <Router>
            <MainNavigation/>
            <main>
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
            </main>
        </Router>
    )
}

export default App;
