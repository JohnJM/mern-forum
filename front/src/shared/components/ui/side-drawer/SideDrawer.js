import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

import {SideDrawerContext} from '../../../context/SideDrawerContext';
import SideDrawerAlertBox from './SideDrawerAlertBox';

// import Backdrop from './Backdrop';
import './SideDrawer.css';

const SideDrawer = props => {

    const side = useContext(SideDrawerContext);

    const nodeRef = React.useRef(null);
    const content = (
        <CSSTransition
            nodeRef={nodeRef}
            in={props.show}
            timeout={600}
            classNames="alert"
            mountOnEnter
            unmountOnExit>
            <aside
                ref={nodeRef}
                onClick={props.onClick}
                className="absolute side-drawer min-w-250">

                <React.Fragment>
                    {side.alertMsg && <SideDrawerAlertBox colour={side.alertMsg.colour}>
                        {side.alertMsg.msg}
                    </SideDrawerAlertBox>
}
                    <div className="p-4 side-drawer-inner">
                        {props.children}
                    </div>
                </React.Fragment>
            </aside>
        </CSSTransition>
    )

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;