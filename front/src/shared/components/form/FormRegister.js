import React, {useContext, useState} from 'react';
import FormLogin from './FormLogin';
import {useForm} from '../../hooks/FormHook';
import {SideDrawerContext} from '../../context/SideDrawerContext';
// import {AuthContext} from '../../context/AuthContext';

import Input from './form-elements/Input';
import Button from './form-elements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../util/Validators';
import {AppConfig} from '../../../App.config';

const axios = require('axios');

const FormRegister = props => {

    const side = useContext(SideDrawerContext);

    const [registerLoading,
        setIsRegisterLoading] = useState(false);

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

    const registerSubmitHandler = e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "withCredentials": true
        };

        const username = formState.inputs.username.value;
        const password = formState.inputs.password.value;

        const data = {
            "username": username,
            "password": password
        }

        setIsRegisterLoading(true);
        side.displayAlertMsg(false);
        axios
            .post(`${AppConfig.apiUrl}/signup`, data, headers)
            .then((res) => {
                console.log(res);
                side.displayAlertMsg('Account created. you can now sign in with it')
                setIsRegisterLoading(false);
            })
            .catch((err) => {
                setIsRegisterLoading(false);

                if (err.response) {
                    if (err.response.data.errors.username === 'Username already exists') {
                        side.displayAlertMsg('username already exists', 'danger');
                    }
                } else {
                    side.displayAlertMsg('Server error - please try again later', 'danger');
                }
            })
    }

    let toggleLogin;

    if (props.forSideDrawer) {
        toggleLogin = <div className="block">
            <span className="mr-2">
                Already have an account?
            </span>
            <span
                onClick={() => {
                side.setContent(<FormLogin forSideDrawer/>)
            }}
                className="block underline decoration-color-primary cursor-pointer">Login
            </span>
        </div>
    }

    if (registerLoading) {
        return <span>
            loading spinner
        </span>
    }

    return (
        <React.Fragment>
            <span className="text-xl">Register</span>

            <form onSubmit={registerSubmitHandler} className="my-6">
                <Input
                    element="input"
                    id="username"
                    type="text"
                    label="username"
                    placeholder="username"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(10)]}
                    errorText="Please enter a username (min 2 chars)"
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

                <Button type="submit" size="1" disabled={!formState.isValid}>Register</Button>

            </form>
            {toggleLogin}
        </React.Fragment>
    )

}

export default FormRegister;