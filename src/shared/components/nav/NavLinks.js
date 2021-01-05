import React from 'react';

import { NavLink } from 'react-router-dom';

// import './NavLinks.scss';
// logic for what the nav links are will be in here.

const NavLinks = props => {
    return <ul className="nav-links flex">
        <li className="text-white mx-1 ml-0">
            <NavLink to="/" exact>home</NavLink>
        </li>

        <li className="text-white mx-1">
            <NavLink to="/vip">vip</NavLink>
        </li>

        <li className="text-white mx-1">
            <NavLink to="/user/uidgoeshere">Account name</NavLink>
        </li>

        <li className="mx-1 ml-9" id="nav-login"><button className="text-white">Login</button></li>
        <li className="mx-1 mr-0" id="nav-register"><button className="text-white">Register</button></li>

    </ul>
}

export default NavLinks;