// import { useQuery } from 'react-query'
import {AppConfig} from '../App.config';
const axios = require('axios');


export const listBoards = async () => {
    try {
        let boards =  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`);
        return boards;
    } catch (err) {
        throw Error(err);
    }
}

export const getSingleBoardIndex = async (board, index) => {
    try {
        let content = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/board/${board}/${index}`);
        return content.data || false;
    } catch (err) {
        throw Error(err);
    }
}