import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop';
import SideDrawer from '../ui/SideDrawer';
import NavLinks from '../nav/NavLinks';
import FormLogin from '../form-login/FormLogin'
import FormRegister from '../form-register/FormRegister'

// 

const MainNavigation = props => {

    // use context for the drawer being open or closed!

    const [drawerIsOpen,
        setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    
    // state needs to be 
    // isOpen: bool
    // content: <jsx />
    // I need to use a reducr to figure out what to load inside sidrDrawer...
    ///btw I want to try using react query in this project.


    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}

            <SideDrawer show={drawerIsOpen}>
                <FormLogin/>
                <FormRegister/>
                
            </SideDrawer>

            <nav className="main-navigation__drawer-nav flex justify-between bg-green-500">
                <span className="mr-auto" onClick={openDrawerHandler}>open sidebar</span>
                <NavLinks/>
            </nav>

        </React.Fragment>
    )

}

export default MainNavigation;