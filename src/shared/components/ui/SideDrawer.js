import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

// import Backdrop from './Backdrop';
import './SideDrawer.css';

const SideDrawer = props => {

    const nodeRef = React.useRef(null)
    const content = (
        // <React.Fragment>
            <CSSTransition 
                nodeRef={nodeRef}
                in={props.show}
                timeout={6000}
                classNames="alert"
                mountOnEnter
                unmountOnExit>
                <aside
                    ref={nodeRef}
                    onClick={props.onClick}
                    // i think instead of props.children I need to give it a state result. (with some jsx?)
                    className="side-drawer p-4 min-w-250">{props.children}</aside>
            </CSSTransition>

        // </React.Fragment>
    )

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;