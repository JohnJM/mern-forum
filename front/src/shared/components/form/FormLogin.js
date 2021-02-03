import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {SideDrawerContext} from '../../context/SideDrawerContext';
import FormRegister from './FormRegister';
import Button from './form-elements/Button';
import {AppConfig} from '../../../App.config';
import SideDrawer from '../ui/side-drawer/SideDrawer';
import ProfileSide from '../profile-side/ProfileSide';

const axios = require('axios');

//should refactor all of this with use axios hook really.

const FormLogin = props => {
    const auth = useContext(AuthContext);
    const side = useContext(SideDrawerContext);

    //redo with useAxios
    const [loginLoading,
        setIsLoginLoading] = useState(false);

    const form = useRef(null);

    const loginSubmitHandler = async e => {
        e.preventDefault();

        const loginData = new FormData(form.current)

        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            withCredentials: true
        }

        const data = {
            "username": loginData.get('username'),
            "password": loginData.get('password')
        }

        setIsLoginLoading(true);

        try {
            side.displayAlertMsg(false);
            const res = await axios.post(`${AppConfig.apiUrl}/login`, data, headers);
            setIsLoginLoading(false);

            console.log(res.data.token);

            auth.login(res.data.id, res.data.username, res.data.token);

            side.displayAlertMsg(
                <p>Welcome back,{res.data.username}</p>, 'green-500')

            side.setContent(<ProfileSide />);

        } catch (err) {
            setIsLoginLoading(false);
            //need a helper "handle error" for this

            console.log(err);

            if (err.response) {
                let error = err.response.data.errors;

                console.log(error.password);

                if (error.password === 'incorrect password') {
                    side.displayAlertMsg('Incorrect username or password', 'danger');
                }
            } else {
                side.displayAlertMsg('Server error - please try again later', 'danger');
            }

   
        }
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

    if (loginLoading) {
        return (
            <span>loading spinner</span>
        )
    }

    return (
        <React.Fragment>

            <span className="text-xl">Login</span>

            <form ref={form} className="my-6" onSubmit={loginSubmitHandler}>
                <label className="block" htmlFor="username">Username</label>
                <input
                    required
                    element="inpu#t"
                    id="username"
                    type="text"
                    label="username"
                    name="username"
                    placeholder="Username"
                    className="mb-3 border-2 border-black-500 w-full"></input>

                <label className="block" htmlFor="password">Password</label>
                <input
                    required
                    className="mb-3 border-2 border-black-500 block w-full"
                    element="input"
                    name="password"
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