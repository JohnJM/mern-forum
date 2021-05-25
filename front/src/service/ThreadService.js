import {AppConfig} from '../App.config';

const axios = require('axios');

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "withCredentials": true
}

export const GetVipContent = async(jwt) => {
    try {
        let content = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vip`, headers);
        return content;
    } catch (err) {
        throw Error(err);
    }
}

export const getOPAndPosts = async(thread_id) => {

    try {
        let content = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/thread/${thread_id}`, headers);

        if (content.data.OP.user_id) {
            content.data.OP.author = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${content.data.OP.user_id}`);

            content.data.OP.author = content.data.OP.author.data;
        } else {
            content.data.OP.author = {};
            content.data.OP.author.usernane = 'not registered';
        }

        return content;
    } catch (err) {
        throw Error(err);
    }
}