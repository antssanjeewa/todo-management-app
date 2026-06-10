import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;



// api.interceptors.request.use((config) => {
//   const user = localStorage.getItem("user");
//   const token = user ? JSON.parse(user).access_token : null

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem("user");
//             window.location.href = '/';
//         }

//         if (error.response?.data?.message) {
//             error.message = error.response.data.message;
//         }

//         return Promise.reject(error);
//     }
// );