import React, {useContext} from 'react';
import {useForm} from '../../hooks/FormHook';
import {AuthContext} from '../../context/AuthContext';
import {useSideDrawer} from '../../hooks/SideDrawerHook';
import {SideDrawerContext} from '../../context/SideDrawerContext';
import FormRegister from '../form-register/FormRegister';

import Input from '../form-elements/Input';
import Button from '../form-elements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../components/util/Validators'

const FormLogin = props => {
    const auth = useContext(AuthContext);
    const side = useContext(SideDrawerContext);

    const [formState,
        inputHandler] = useForm({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const loginSubmitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);
        auth.login();
        side.setContent(
            <p>Welcome back {formState.inputs.username.value}. Your profile will be displayed below. (Soon)</p>
        )
    }

    let toggleRegister;
    if (props.forSideDrawer) {
        toggleRegister = <Button
            className="btn"
            onClick={() => {
            side.setContent(<FormRegister forSideDrawer/>)
        }}>Go Register</Button>
    }

    return (
        <React.Fragment>

            <span className="text-xl">Login</span>

            <form onSubmit={loginSubmitHandler}>
                <Input
                    autoFocus
                    element="input"
                    id="username"
                    type="text"
                    label="username"
                    placeholder="Username"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
                    errorText="Please enter a valid username"
                    onInput={inputHandler}></Input>
                <Input
                    element="input"
                    id="password"
                    validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
                    type="password"
                    errorText="Please enter a valid password (min 5 chars)"
                    label="password"
                    placeholder="Password"
                    onInput={inputHandler}></Input>

                <Button type="submit" size="1" disabled={!formState.isValid}>Login</Button>
            </form>
            {toggleRegister}

        </React.Fragment>
    )

};

export default FormLogin;