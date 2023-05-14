import axios from "axios"


const getTopicDetails = async(id)=>{
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/topic/${id}`);
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

const getFollowing = async(id) => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/topic/following?user_id=${id}`)
    return response.data;
}
const topicService = { getFollowing, getAllTopics, getTopicDetails };

export default topicService