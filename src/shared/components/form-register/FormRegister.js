import React, {useContext} from 'react';
// import {FormLogin} from '../form-login/FormLogin';
import Button from '../form-elements/Button';
import FormLogin from '../form-login/FormLogin';
import {SideDrawerContext} from '../../context/SideDrawerContext';

const FormRegister = (props) => {
    const side = useContext(SideDrawerContext);

    let toggleLogin;

    if (props.forSideDrawer) {
        toggleLogin = <Button
            className="btn"
            onClick={() => {
            side.setContent(<FormLogin forSideDrawer/>)
        }}>Go Login</Button>
    }

    return (
        <div>
            <p>form register works</p>
            {toggleLogin}
        </div>
    )

}

export default FormRegister;