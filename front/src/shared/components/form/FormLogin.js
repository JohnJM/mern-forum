import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {SideDrawerContext} from '../../context/SideDrawerContext';
import FormRegister from './FormRegister';
import Button from './form-elements/Button';

const FormLogin = props => {
    const auth = useContext(AuthContext);
    const side = useContext(SideDrawerContext);

    const loginSubmitHandler = e => {
        e.preventDefault();
        // console.log(formState.inputs);
        auth.login();
        side.setContent(
            <p>Welcome back api.username . Your profile will be displayed below. (Soon)</p>
        )
    }

    let toggleRegister;
    if (props.forSideDrawer) {
        toggleRegister = <div className="block">
            <span className="mr-2">
                Don't have an account?
            </span>
            <span
                onClick={() => {
                side.setContent(<FormRegister forSideDrawer/>)
            }}
                className="block underline decoration-color-primary cursor-pointer">Register
            </span>
        </div>
    }

    return (
        <React.Fragment>

            <span className="text-xl">Login</span>

            <form className="my-6" onSubmit={loginSubmitHandler}>
                <label className="block" htmlFor="username">Username</label>
                <input
                    required
                    element="input"
                    id="username"
                    type="text"
                    label="username"
                    placeholder="Username"
                    className="mb-3 border-2 border-black-500 w-full"></input>

                <label className="block" htmlFor="password">Password</label>
                <input
                    required
                    className="mb-3 border-2 border-black-500 block w-full"
                    element="input"
                    id="password"
                    type="password"
                    label="password"
                    placeholder="Password"></input>

                <Button type="submit" size="1">Login</Button>
            </form>
            {toggleRegister}

        </React.Fragment>
    )

};

export default FormLogin;