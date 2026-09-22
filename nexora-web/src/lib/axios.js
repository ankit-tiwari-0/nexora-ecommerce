import axios from "axios"

const axioss = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true, // send cookies to the sever
});

export default axioss