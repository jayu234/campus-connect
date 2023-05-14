import axios from "axios"

const getNearbyEvents = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/nearbyEvents`);
    return response.data;
}

const createEvent = async (data) => {
    axios.defaults.withCredentials = true
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/event/create`, data);
    return response.data;
}

const getAllEvents = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/event/all`);
    return response.data;
}

const getEventDetails = async (id)=>{
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/event/${id}`);
    return response.data;
}
const eventService = { getNearbyEvents, createEvent, getAllEvents, getEventDetails };
export default eventService;