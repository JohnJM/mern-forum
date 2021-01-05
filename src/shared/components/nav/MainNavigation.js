import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop';
import SideDrawer from '../ui/SideDrawer';
import NavLinks from '../nav/NavLinks';
import FormLogin from '../form-login/FormLogin'

// 

const MainNavigation = props => {

    const [drawerIsOpen,
        setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }




    // I think the next step is to 
    //have global state decide whats going in the side drawer...
    ///btw I want to try using react query in this project.

    // I need to use a reducr to figure out what to load inside sidrDrawer...

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}

            <SideDrawer show={drawerIsOpen}>
                <FormLogin/>
            </SideDrawer>

            <nav className="main-navigation__drawer-nav flex justify-between bg-green-500">
                <span className="mr-auto" onClick={openDrawerHandler}>open sidebar</span>
                <NavLinks/>
            </nav>

        </React.Fragment>
    )

}

export default MainNavigation;