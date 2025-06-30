import axios from 'axios';

const API_URL = 'https://aviasales-test-api.kata.academy';

const baseApi= axios.create({
    baseURL: API_URL,
    
})


export const fetchTicketId = async () => {
    const {data} = await baseApi.get('/search');
    return data.searchId
}
export const fetchTicket = async (searchId) => {
    const {data} = await baseApi.get(`/tickets?searchId=${searchId}`)
    return data
}
