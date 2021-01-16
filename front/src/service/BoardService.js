// import { useQuery } from 'react-query'
const axios = require('axios');
import {AppConfig} from '../App.config';




export const listBoards = async () => {

    try {
        let boards =  await axios.get(`${AppConfig.apiUrl}/boards`);

        return boards;
    } catch (err) {
        throw err
    }
}