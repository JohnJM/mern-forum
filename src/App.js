import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/Users';
import Home from './home/pages/Home';
import Vip from './vip/pages/Vip';

function App() {
    return (
        <Router>
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
        </Router>

    )
}

export default App;
