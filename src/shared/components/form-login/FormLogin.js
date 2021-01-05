import React/**,{ useState }**/
from 'react';
// import './FormLogin.css';
import Input from '../form-elements/Input';
import Button from '../form-elements/Button';

import {useForm} from '../../hooks/FormHook'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../components/util/Validators'

const FormLogin = props => {

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
    }

    return (

        <form onSubmit={loginSubmitHandler}>
            <Input
                element="input"
                id="username"
                type="text"
                
                label="username"
                placeholder="Username"
                validators={[VALIDATOR_REQUIRE()]}
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
    // props.show && <Modal show={loginIsOpen} onCancel={closeLoginHandler}
    // header={props.header}>     <h1>my login form</h1>         <input></input>
    // </Modal>

    )

};

export default FormLogin;