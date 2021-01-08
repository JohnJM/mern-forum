import React, { useState, useCallback } from 'react';
import Backdrop from '../ui/Backdrop';
import SideDrawer from '../ui/SideDrawer';
import NavLinks from '../nav/NavLinks';
import FormLogin from '../form-login/FormLogin';
import FormRegister from '../form-register/FormRegister';
import {useSideDrawer} from '../../hooks/SideDrawerHook';


const MainNavigation = props => {

    const [sideState, toggleOpen, displayOnSide] = useSideDrawer();

    const goReg = useCallback(()=>{
        displayOnSide(<FormRegister/>);
    }, [])

    
    // state needs to be 
    // isOpen: bool
    // content: <jsx />
    // I need to use a reducr to figure out what to load inside sidrDrawer...
    ///btw I want to try using react query in this project.


    return (
        <React.Fragment>
            {sideState.isOpen && <Backdrop onClick={toggleOpen}/>}

            <SideDrawer show={sideState.isOpen}>
                <span onClick={goReg}>Go reg</span>
                {sideState.content}
            </SideDrawer>

            <nav className="main-navigation__drawer-nav flex justify-between bg-green-500">
                <span className="mr-auto" onClick={toggleOpen}>open sidebar</span>
                <NavLinks/>
            </nav>

        </React.Fragment>
    )

}

export default MainNavigation;