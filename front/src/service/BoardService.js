// import { useQuery } from 'react-query'
import {AppConfig} from '../App.config';
const axios = require('axios');


export const listBoards = async () => {
    try {
        let boards =  await axios.get(`${AppConfig.apiUrl}/boards`);
        return boards;
    } catch (err) {
        throw err
    }
}

export const getSingleBoardIndex = async (board, index) => {
    try {
        let content = await axios.get(`${AppConfig.apiUrl}/board/${board}/${index}`);
        return content.data || false;
    } catch (err) {
        throw err;
    }
}