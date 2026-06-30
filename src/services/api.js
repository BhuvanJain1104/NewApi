import axios from "axios";

const API = axios.create({
  baseURL: "https://newsmonkey-1xh6.onrender.com/api",
});

export default API;