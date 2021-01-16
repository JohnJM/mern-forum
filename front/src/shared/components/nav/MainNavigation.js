import React, {useEffect, useContext} from 'react';
import Backdrop from '../ui/Backdrop';
import SideDrawer from '../ui/SideDrawer';
import NavLinks from '../nav/NavLinks';
import FormRegister from '../form-register/FormRegister';
import {SideDrawerContext} from '../../context/SideDrawerContext'
import {AuthContext} from '../../context/AuthContext'

const MainNavigation = props => {
    const side = useContext(SideDrawerContext);
    const auth = useContext(AuthContext);

    //btw I want to try using react query in this project.

    useEffect(() => {
        if (!side.content) {
            auth.isLoggedIn
                ? side.setContent(
                    <p>Profile will go here.</p>
                )
                : side.setContent(<FormRegister forSideDrawer/>)
        }
    }, [])

    return (
        <React.Fragment>
            {side.isOpen && <Backdrop onClick={side.toggleOpen}/>}

            <SideDrawer show={side.isOpen}>
                {side.content}
            </SideDrawer>

            <nav className="main-navigation__drawer-nav flex justify-between bg-green-500">
                <span className="mr-auto" onClick={side.toggleOpen}>open sidebar</span>
                <NavLinks/>
            </nav>
        </React.Fragment>
    )
}

export default MainNavigation;