
import React, { useContext } from 'react';

import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import {useForm} from '../../shared/hooks/FormHook';

import Input from '../../shared/components/form/form-elements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../shared/components/util/Validators';
import Button from '../../shared/components/form/form-elements/Button';
import ImageUpload from '../../shared/components/form/form-elements/ImageUpload';

import {useQuery} from 'react-query';
import { AppConfig } from '../../App.config';
import axios from 'axios';



const CreateThread = props => {

    const side = useContext(SideDrawerContext)

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

    const { isLoading, data, error, isFetching, refetch } = useQuery('createThread',
  async () =>  { try {
      const data = await axios.post(`${AppConfig.apiUrl}/thread/create`, {
        "subject":formState.inputs.subject,
        "content": formState.inputs.content,
        "image": formState.inputs.image
}, {'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "withCredentials": true}  
        );
    console.log('use Query triggered.');
    return data;
} catch (err) {
    return err;
}
  }, {manual: true, enabled: false})


if (isLoading) return 'Loading...'

if (error) return 'An error has occurred: ' + error.message


    const createThreadSubmitHandler = (e) => {
        e.preventDefault();

        console.log(formState);

        refetch();
    }


    return <>

        <p className="">Start a new {props.board} thread</p>
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