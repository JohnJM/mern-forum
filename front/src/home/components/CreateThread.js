
import React, { useCallback, useContext, useEffect } from 'react';

import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import {useForm} from '../../shared/hooks/FormHook';

import Input from '../../shared/components/form/form-elements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../shared/components/util/Validators';
import Button from '../../shared/components/form/form-elements/Button';
import ImageUpload from '../../shared/components/form/form-elements/ImageUpload';

import {useQuery} from 'react-query';
import { AppConfig } from '../../App.config';
import axios from 'axios';
import {AuthContext} from '../../shared/context/AuthContext';

const CreateThread = props => {
    const side = useContext(SideDrawerContext);
    const auth = useContext(AuthContext);

    const [formState,
        inputHandler] = useForm({
        subject: {
            value: '',
            isValid: false
        },
        content: {
            value: '',
            isValid: true
        },
        image: {
            value: null,
            isValid: false
        }
    }, false)

    let { isLoading, data, error, isFetching, refetch } = useQuery('createThread',
  async () =>  { try {
    console.log("refetch-hit");
    const formData = new FormData();
    formData.append('subject', formState.inputs.subject.value);
    formData.append('content', formState.inputs.content.value);
    formData.append('image', formState.inputs.image.value);
    if(auth.loginState.id){
        formData.append('user_id', auth.loginState.id);
    }
    formData.append('board_id', props.board_id)

      const data = await axios.post(`${AppConfig.apiUrl}/thread/create`, formData, {'Content-Type': 'multipart/form-data;',
    "Access-Control-Allow-Origin": "*"}  
        );

    setTimeout(()=> {
        side.displayAlertMsg(false);
        side.toggleOpen();
        props.refresh();
    }, 1500)
    side.displayAlertMsg('upload success!');
    side.setContent('...');

        return data;
    } catch (err) {
        return err;
    }
  }, {manual: true, enabled: false})



if (isLoading) return 'Loading...'

if (error) return 'An error has occurred: ' + error.message;

    const createThreadSubmitHandler = (e) => {
        e.preventDefault();

        console.log(formState);

        refetch();
    }

    return <>
        <p className="">Start a new {props.board_title} thread</p>
        <br />
        <form onSubmit={createThreadSubmitHandler}>
            <Input
                element="input"
                id="subject"
                type="text"
                label="subject"
                placeholder="subject"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid subject (min 3 chars)"
                onInput={inputHandler}></Input>


            <Input
                element="input"
                id="content"
                type="text"
                label="content"
                placeholder="content"
                initialValid='true'
                validators=""
                onInput={inputHandler}></Input>

            <ImageUpload id="image" onInput={inputHandler}/>
            <br />
            <Button type="submit" disabled={!formState.isValid} >
                Create Thread
            </Button>
        </form>
    </>
}


export default CreateThread;