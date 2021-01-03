import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import {CSSTransition} from 'react-transition-group';


// import Backdrop from './Backdrop';
import Modal from '../ui/Modal';

import './LoginModal.css';

const LoginModal = props => {
    const [loginIsOpen,
        setLoginIsOpen] = useState(props.show);

    const closeLoginHandler = () => setLoginIsOpen(false);

    return (
        // props.show &&
        <Modal show={loginIsOpen} onCancel={closeLoginHandler} header={props.header}>

            <h1>my login form</h1>

 
                <input></input>


        </Modal>
        
    )

};

export default LoginModal;