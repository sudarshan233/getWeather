import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/weather',
    method: "GET"
});

export default api;