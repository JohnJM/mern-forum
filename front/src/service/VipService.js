// import { useQuery } from 'react-query'
const axios = require('axios');

export const GetVipContent = async(jwt) => {

    //maybe import this
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${jwt}`,
        "withCredentials": true
    }

    try {
        let content = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vip`, headers);
        return content;
    } catch (err) {
        throw err;
    }
} 