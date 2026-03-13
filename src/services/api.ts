import axios from "axios";

const api = axios.create({
  baseURL:"https://api.esadev.com.br"
});

export default api;