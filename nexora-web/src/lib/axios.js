import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    timeout: 9000, // 4 seconds
});

export default axiosInstance;