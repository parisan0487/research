import axios from "axios";

const Fetch = axios.create({
  headers: { "Content-Type": "application/json" },
});

Fetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.token === true) {
      if (!token) {
        return new Promise(() => {});
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Fetch.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default Fetch;
