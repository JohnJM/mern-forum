// import { useQuery } from 'react-query'
import {AppConfig} from '../App.config';
const axios = require('axios');

export const getPublicDataById = async (uid) => {
    try {
        let user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${uid}`);
        return user;
    } catch (err) {
        throw Error(err);
    }
}