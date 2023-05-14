import axios from "axios";

const getMyAnswers = async(id)=>{
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/answer/all?user_id=${id}`);
    return response.data;
}

const createAnswer = async(data)=>{
    axios.defaults.withCredentials = true
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/answer/create`, data);
    return response.data;
}

const answerService = { getMyAnswers, createAnswer };

export default answerService