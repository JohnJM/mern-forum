import React, {useCallback, useContext, useEffect} from 'react';
import {useForm} from '../../hooks/FormHook';
import {AuthContext} from '../../context/AuthContext';

import Button from '../../components/form/form-elements/Button';
import Input from '../../components/form/form-elements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../util/Validators';
import useAxios from 'axios-hooks';
import {AppConfig} from '../../../App.config';
import {SideDrawerContext} from '../../context/SideDrawerContext';

const FormChangePwd = props => {

    const auth = useContext(AuthContext);
    const side = useContext(SideDrawerContext);

    let successMsg, errorMsg;

    const [formState,
        inputHandler,
        setFormData] = useForm({
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
            error
        },
        postChangePwd] = useAxios({
        url: `${AppConfig.apiUrl}/changePwd`,
        method: 'post',
        headers: AppConfig.defaultHeaders,
        withCredentials: true
    }, {manual: true});

    const pwdSubmitHandler = e => {
        e.preventDefault();

        postChangePwd({
            data: {
                oldPwd: formState.inputs.oldPwd.value,
                newPwd: formState.inputs.newPwd.value,
                id: auth.loginState.id
            }
        }).catch(err => {
            console.log('error here-> ', err);
            errorMsg = <p>There was an error. Handle it later</p>
            successMsg = null;
        })

        //no errors after here. Update state?
        setFormData({
            oldPwd: {
                value: '',
                isValid: false
            },
            newPwd: {
                value: '',
                isValid: false
            }
        }, false);

    }
    // const onUpdated = useCallback(() => {     side.displayAlertMsg('Password
    // Changed');     setFormData({         oldPwd: {             value: '',
    //     isValid: false         },         newPwd: {             value: '',
    //      isValid: false         }     }, false); }, [])

    if (loading) {
        return <span>loading spinner</span>
    }

    if (error) {
        console.log(error);
        errorMsg = <p>There was an error. Handle it later</p>
        successMsg = null;
    } else if (data){
        successMsg = <p>Password Changed Successfully</p>
        errorMsg =  null;
    }

    // this one previously modified the sidebar state - triggers a re-render, data always hits
    // on re-render how to best fix? create a handleSuccess inside useEffect?
    if (data) {
        // side.displayAlertMsg('Password Changed');
        // setFormData({
        //     oldPwd: {
        //         value: '',
        //         isValid: false
        //     },
        //     newPwd: {
        //         value: '',
        //         isValid: false
        //     }
        // }, false);
    }

    return (
    <>
    <form className="w-6/12" onSubmit={pwdSubmitHandler}>
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
    <br />
    {successMsg}
    {errorMsg}

    </>
    )
}

export default FormChangePwd;