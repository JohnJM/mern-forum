import React, {useEffect, useContext} from 'react';
import Backdrop from '../ui/Backdrop';
import SideDrawer from '../ui/side-drawer/SideDrawer';
import NavLinks from '../nav/NavLinks';
import FormRegister from '../form/FormRegister';
import {SideDrawerContext} from '../../context/SideDrawerContext'
import {AuthContext} from '../../context/AuthContext'
import {CSSTransition} from 'react-transition-group';

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
            {side.isOpen && <CSSTransition
                in={side.isOpen}
                appear={true}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <Backdrop onClick={side.toggleOpen}/>
            </CSSTransition>
}

            <SideDrawer show={side.isOpen}>
                {side.content}
            </SideDrawer>

            <nav
                className="main-navigation__drawer-nav flex justify-between bg-primary px-4 items-center">
                {/* <span className="mr-auto" onClick={side.toggleOpen}>open sidebar</span> */}

                <div className={`tham tham-e-squeeze tham-w-4`} onClick={side.toggleOpen}>
                    <div className="tham-box">
                        <div className="tham-inner bg-white"/>
                    </div>
                </div>
                <NavLinks/>
            </nav>
        </React.Fragment>
    )
}

export default MainNavigation;