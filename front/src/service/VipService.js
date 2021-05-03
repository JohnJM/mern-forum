// import { useQuery } from 'react-query'
import {AppConfig} from '../App.config';

const axios = require('axios');

export const GetVipContent = async (jwt) => {

    //maybe import this
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${jwt}`,
        "withCredentials": true
    }

    try {
        let content = await axios.get(`${AppConfig.apiUrl}/vip`, headers);
        return content;
    } catch (err) {
        throw err;
    }
}