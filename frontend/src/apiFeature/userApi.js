import axios from "axios";


const BASE_URL = "http://localhost:5000/api/v1";

const signup = async (userData) => {
    axios.defaults.withCredentials = true
    const response = await axios.post(`${BASE_URL}/user/signup`, userData);
    return response.data;
}

const editUser = async (userData)=>{
    axios.defaults.withCredentials = true
    const response = await axios.put(`${BASE_URL}/user/profile/update`, userData);
    return response.data;
}
const login = async (userData) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${BASE_URL}/user/login`, userData);
    return response.data;
}

const logout = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${BASE_URL}/user/logout`);
    return response.data;
}

const loadUser = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${BASE_URL}/user/profile`);
    return response.data;
}

const authServise = { signup, login, logout, loadUser, editUser };

export default authServise;