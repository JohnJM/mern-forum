import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

import Backdrop from './Backdrop';
import './SideDrawer.css';

const SideDrawer = props => {
    const content = (
        <React.Fragment>
            <CSSTransition
                in={props.show}
                timeout={6000}
                classNames="alert"
                mountOnEnter
                unmountOnExit>
                <aside
                    onClick={props.onClick}
                    // i think instead of props.children I need to give it a state result. (with some jsx?)
                    className="side-drawer">{props.children}</aside>
            </CSSTransition>

        </React.Fragment>
    )

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;