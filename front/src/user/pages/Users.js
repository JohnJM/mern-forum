import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../shared/context/AuthContext';
import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import FormChangePwd from '../../shared/components/form/FormChangePwd';
import ProfileSide from '../../shared/components/profile-side/ProfileSide';
import Input from '../../shared/components/form/form-elements/Input';
import axios from 'axios';
import {AppConfig} from '../../App.config';

const Users = () => {
    const auth = useContext(AuthContext);
    const side = useContext(SideDrawerContext);
    
    const [showColourChanged, setShowColourChanged] = useState(false);

    // let { uid } = useParams(); useEffect(()=>{     side.setContent(<ProfileSide
    // />) });

    const handleColourChange = async(e) => {
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

            console.log('return', submitData);

            setShowColourChanged(submitData.data.msg);

        } catch (err) {
            throw Error('Server Error on colour change.')
        }

    }

    return (
        <React.Fragment>
            <h2>
                Welcome to your profile {auth.loginState.username}
            </h2>
            <br/>
            <p className="text-lg underline decoration-color-primary">Change Password</p>
            <br/>
            <FormChangePwd/>
            <hr/>
            <br/>
            <form onSubmit={(e) => handleColourChange(e)}>
                <input type="color" name="colour"/>
                <input type="hidden" name="colour"/>
                <button
                    className="block btn cursor-pointer"
                    type="submit"
                    value="Change Colour">Change User Colour</button>
            </form>

            {showColourChanged && 'Success'}

        </React.Fragment>
    )

}

export default Users;
