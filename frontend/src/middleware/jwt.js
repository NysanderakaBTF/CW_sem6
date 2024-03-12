import axios from "axios";
import {store} from "../store/store.js";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const user = store.getState().user;
        console.log(user)
        const isLoggedIn = user?.token;
        if (user.token && isLoggedIn) {
            config.headers.Authorization = "Bearer " + user.token;
        }
        return config;
    },
    function (error) {
        console.log('!!!!!!' + error)
        return Promise.reject(error);
    }
);
