import axios from "axios";

const getMyPosts = async(id)=>{
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/all?user_id=${id}`);
    return response.data;
}
const createPost = async(data)=>{
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/post/create`, data);
    return response.data;
}
const postService = {getMyPosts, createPost};

export default postService