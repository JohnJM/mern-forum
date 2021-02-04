import React, {useContext} from 'react';
import {useForm} from '../../hooks/FormHook';
import {AuthContext} from '../../context/AuthContext';

import Button from '../../components/form/form-elements/Button';
import Input from '../../components/form/form-elements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../util/Validators';
import useAxios from 'axios-hooks';
import {AppConfig} from '../../../App.config';

const FormChangePwd = props => {

    const auth = useContext(AuthContext);

    const [formState,
        inputHandler] = useForm({
        oldPwd: {
            value: '',
            isValid: false
        },
        newPwd: {
            value: '',
            isValid: false
        }
    }, false)
    
    const [
        {
            data,
            loading,
            error,
            response
        },
        postChangePwd] = useAxios({
        url: `${AppConfig.apiUrl}/changePwd`,
        method: 'post',
        headers: AppConfig.defaultHeaders,
        withCredentials: true
    }, {manual: true});


    const pwdSubmitHandler = e => {
        e.preventDefault();

        postChangePwd({data: {
            oldPwd: formState.inputs.oldPwd.value,
            newPwd: formState.inputs.newPwd.value,
            id: auth.loginState.id
        }}).catch(err => {
            console.log('error here-> ', err);
        })



    }


    if(loading) {
        return <span>loading spinner</span>
    }
    
    if (response){
        <span> passworcd changed! </span>
    }

   if(error){
       console.log(error);
       return <span>error</span>
   }


   data && console.log(data);



    return <form className="w-6/12" onSubmit={pwdSubmitHandler}>
        <Input
            type="password"
            id="oldPwd"
            element="input"
            label="Current Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}></Input>
        <Input
            type="password"
            id="newPwd"
            element="input"
            label="New Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}></Input>
        <Button>Change Password</Button>
    </form>
}

export default FormChangePwd;