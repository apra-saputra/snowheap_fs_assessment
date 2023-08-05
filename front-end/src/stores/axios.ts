import axios, { isAxiosError } from "axios";

const URI = import.meta.env.VITE_API_URL;
const APIKEY = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  baseURL: URI,
  headers: { "x-app-key": APIKEY },
  withCredentials: true,
});

export { isAxiosError };

const redirectToLogin = () => {
  sessionStorage.removeItem("auth");
  window.location.href = "/login";
};

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (isAxiosError(error)) {
      if (error.response?.data.statusCode === 401) {
        redirectToLogin();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
