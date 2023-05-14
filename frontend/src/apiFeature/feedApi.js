import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const getFeedData = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${BASE_URL}/feed`);
    return response.data;
}
const getAllTopics = async()=>{
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/topic/all`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}
const feedService = { getFeedData, getAllTopics };

export default feedService;