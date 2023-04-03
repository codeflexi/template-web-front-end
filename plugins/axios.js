
import axios from "axios"


export default defineNuxtPlugin((NuxtApp) => {

    //axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:5000";

    //axios.defaults.baseURL = process.env.VUE_APP_API_URL;

    // Authorization: options.token ? `Bearer ${options.token}` : '',
   const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2YzMTc2MWRlYjQ3MzY0OWY3MDI3YiIsImlhdCI6MTY4MDE1NjM5MywiZXhwIjoxNjgyNzQ4MzkzfQ.Ca00uBL4kixKbgHrPCCOY3Nzqzd0QreSCylMK7fN1Ko'
   //getToken =  localStorage.getItem('token') ;
   if (getToken) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + getToken;
    } else {
        axios.defaults.headers.common.Authorization = 'Bearer ' + ''
    }

    return {
        provide: {
            axios: axios
        },
    }
})