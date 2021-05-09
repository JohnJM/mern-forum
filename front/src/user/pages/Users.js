import React, {useContext, useCallback, useEffect, useState, useRef} from 'react';
import {AuthContext} from '../../shared/context/AuthContext';
import FormChangePwd from '../../shared/components/form/FormChangePwd';
import axios from 'axios';

import {AppConfig} from '../../App.config';
import {hexToLightOrDark} from '../../shared/helper/hexToLightOrDark'

const Users = () => {
    const auth = useContext(AuthContext);
    const userP = useRef();
    const submitBtn = useRef();

    const [showColourChanged,
        setShowColourChanged] = useState(false);

    useEffect(() => {
        if (!auth.loginState.colour) {
            setShowColourChanged(false)
        } else {
            setShowColourChanged(auth.loginState.colour);
            userP.current.style.textDecorationColor = auth.loginState.colour;
            submitBtn.current.style.backgroundColor = auth.loginState.colour;
            submitBtn.current.style.color = hexToLightOrDark(auth.loginState.colour, '#ffffff', '#000000');
        }
    }, [auth.loginState.colour, showColourChanged])

    const handleColourChange = useCallback(async(e) => {
        try {
            e.preventDefault();
            let colour = e.target[0].value;
            const submitData = await axios.post(`${AppConfig.apiUrl}/user/updateColour`, {
                colour,
                user_id: auth.loginState.id
            }, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                withCredentials: true
            });

            if (submitData) {
                auth.setColour(colour);
                setShowColourChanged(colour);
            }

        } catch (err) {
            throw Error('Server Error on colour change.', err)
        }

    }, [auth])

    return (
        <React.Fragment>
            <h2>
                Welcome to your profile page
            </h2>
            <br/>
            <p ref={userP} className="text-lg underline decoration-color-primary">{auth.loginState.username}</p>
            <br/>
            <FormChangePwd/>
            <hr/>
            <br/>
            <form onSubmit={(e) => handleColourChange(e)}>
                <label htmlFor="colour">Set a new preferred colour:</label><br/>
                <input class="mb-4 block" type="color" name="colour"/>

                <button
                    ref={submitBtn}
                    className="block btn cursor-pointer"
                    type="submit"
                    value="Change Colour">Set</button>
            </form>

            {showColourChanged && 'Success'}

        </React.Fragment>
    )

}

export default Users;
