import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {AuthContext} from '../../context/AuthContext';
import {SideDrawerContext} from '../../context/SideDrawerContext';
import FormLogin from '../form/FormLogin';
import FormRegister from '../form/FormRegister';

//logic for what the nav links are will be in here.
const NavLinks = props => {
    const auth = useContext(AuthContext);
    const side = useContext(SideDrawerContext);

    return <ul className="nav-links flex divide-x divide-white">
        <li className="text-white px-4 pl-0">
            <NavLink to="/" exact>home</NavLink>
        </li>
        {auth.loginState.isLoggedIn && (
            <li className="text-white px-4">
                <NavLink to="/vip">vip</NavLink>
            </li>
        )}

        {auth.loginState.isLoggedIn && (
            <li className="text-white px-4">
                <NavLink to='/account/'> {auth.loginState.username}</NavLink>
            </li>
        )}
        {!auth.loginState.isLoggedIn && (
            <React.Fragment>
                <li className="px-4 pl-4" id="nav-login">
                    <button
                        onClick={() => {
                        side.displayContent(<FormLogin forSideDrawer/>)
                    }}
                        className="text-white">login</button>
                </li>
                <li className="px-4 pr-0" id="nav-register">
                    <button
                        onClick={() => {
                        side.displayContent(<FormRegister forSideDrawer/>)
                    }}
                        className="text-white">register</button>
                </li>
            </React.Fragment>
        )}

        {auth.loginState.isLoggedIn && (
            <li className="px-0 pl-4" id="nav-login">
                <button onClick={auth.logout} className="text-white">logout</button>
            </li>
        )}

    </ul>
}

export default NavLinks;