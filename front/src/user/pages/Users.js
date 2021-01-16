import React from 'react';
import { useParams } from 'react-router-dom';

const Users = () => {

    let { uid } = useParams();

    return (<h2> User works with id = {uid} </h2>)
}

export default Users;

