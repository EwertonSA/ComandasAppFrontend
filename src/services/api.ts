import axios from "axios";
console.log("BASE URL:", process.env.NEXT_PUBLIC_BASEURL)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
 
});

export default api;