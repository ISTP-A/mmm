import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.102.20:5000',
    withCredentials: true,
})




export { api }