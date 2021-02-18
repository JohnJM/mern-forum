
import React, { useContext } from 'react';

import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import {useForm} from '../../shared/hooks/FormHook';

import Input from '../../shared/components/form/form-elements/Input';
import Button from '../../shared/components/form/form-elements/Button';

import {useQuery} from 'react-query';



const CreateThread = props => {

    const side = useContext(SideDrawerContext)

    const createThreadSubmitHandler = () => {
        
    }

    return <form onSubmit={createThreadSubmitHandler}>
        Create a thread form here.
    </form>
}


export default CreateThread;