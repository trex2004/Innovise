import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // replace with server's base URL
});

export default api;
