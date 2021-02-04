import React, { useContext } from 'react';
import {AuthContext} from '../../shared/context/AuthContext';
import FormChangePwd from '../../shared/components/form/FormChangePwd';




const Users = () => {
    const auth = useContext(AuthContext);

    // let { uid } = useParams();

    return (
        <>
        <h2> User works with id = {auth.loginState.username} </h2>
        <br />
        <p className="text-lg underline decoration-color-primary">Change Password</p>
        <br />
        <FormChangePwd />
        </>
    )




}

export default Users;

