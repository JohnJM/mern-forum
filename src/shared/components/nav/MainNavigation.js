import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop';
import SideDrawer from '../ui/SideDrawer';
import NavLinks from '../nav/NavLinks';

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


    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}

            <SideDrawer show={drawerIsOpen}>
                <p>side Drawer content</p>
            </SideDrawer>

            <nav className="main-navigation__drawer-nav flex justify-between bg-green-500">
                <span className="mr-auto" onClick={openDrawerHandler}>open sidebar</span>
                <NavLinks/>
            </nav>

        </React.Fragment>
    )

}

export default MainNavigation;