// import { useQuery } from 'react-query'
import {useContext} from 'react';
import {AppConfig} from '../App.config';
import {AuthContext} from '../shared/context/AuthContext'

const axios = require('axios');

export const GetVipContent = async (jwt) => {

    //maybe import this
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "withCredentials": true
    }

    try {
        let content = await axios.get(`${AppConfig.apiUrl}/vip`, headers);
        return content;
    } catch (err) {
        throw err;
    }
}