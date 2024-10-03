import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // replace with server's base URL
});

export default api;

//import this file to send requests to backend and just write api.get() to send request