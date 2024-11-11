import axios from "axios";

const api = axios.create({
  baseURL: "https://innovise-backend.vercel.app/", // replace with server's base URL
});

export default api;

//import this file to send requests to backend and just write api.get() to send request