// import { useQuery } from 'react-query'
import {useContext} from 'react';
import {AppConfig} from '../App.config';
import {AuthContext} from '../shared/context/AuthContext'

const axios = require('axios');

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "withCredentials": true
}

export const GetVipContent = async (jwt) => {

    try {
        let content = await axios.get(`${AppConfig.apiUrl}/vip`, headers);
        return content;
    } catch (err) {
        throw err;
    }
}

export const getOPAndPosts = async (thread_id) => {
    
    try {
        let content = await axios.get(`${AppConfig.apiUrl}/thread/${thread_id}`, headers);
        return content;
    } catch (err) {
        console.log(err);
        throw err;
    }
}