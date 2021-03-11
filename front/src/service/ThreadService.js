// import { useQuery } from 'react-query'
import {useContext} from 'react';
import {AppConfig} from '../App.config';
import {AuthContext} from '../shared/context/AuthContext'
import User from '../'

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

        if(content.data.OP.user_id){
            content.data.OP.author = await axios.get(`${AppConfig.apiUrl}/user/${content.data.OP.user_id}`);

            content.data.OP.author = content.data.OP.author.data;
        } else {
            content.data.OP.author.username = 'Anonymous';
        }

        return content;
    } catch (err) {
        console.log(err);
        throw err;
    }
}