import axios from "axios";

const signup = async (userData) => {
    axios.defaults.withCredentials = true
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, userData);
    return response.data;
}

const editUser = async (userData)=>{
    axios.defaults.withCredentials = true
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/profile/update`, userData);
    return response.data;
}
const login = async (userData) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, userData);
    return response.data;
}

const logout = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/logout`);
    return response.data;
}

const loadUser = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`);
    return response.data;
}

const authServise = { signup, login, logout, loadUser, editUser };

export default authServise;