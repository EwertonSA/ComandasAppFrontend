import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? (typeof window === "undefined" ? "http://localhost" : "")
    : process.env.NEXT_PUBLIC_BASEURL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
