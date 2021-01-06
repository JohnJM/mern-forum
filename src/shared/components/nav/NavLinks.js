import React, {useContext, useCallback} from 'react';
import {NavLink} from 'react-router-dom';

import {AuthContext} from '../../context/AuthContext';

// import './NavLinks.scss'; logic for what the nav links are will be in here.

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="nav-links flex">
        <li className="text-white mx-1 ml-0">
            <NavLink to="/" exact>home</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li className="text-white mx-1">
                <NavLink to="/vip">vip</NavLink>
            </li>
        )}

        {auth.isLoggedIn && (
            <li className="text-white mx-1">
                <NavLink to="/user/uidgoeshere">Account name</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <React.Fragment>
                <li className="mx-1 ml-9" id="nav-login">
                    <button className="text-white">Login</button>
                </li>
                <li className="mx-1 mr-0" id="nav-register">
                    <button className="text-white">Register</button>
                </li>
            </React.Fragment>
        )}

        {auth.isLoggedIn && (
            <li className="mx-1 ml-9" id="nav-login">
                <button onClick={auth.logout} className="text-white">Logout</button>
            </li>
        )}

    </ul>
}

export default NavLinks;