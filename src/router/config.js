import axios from "axios";

export const apiProyects = axios.create({
    baseURL: import.meta.env.VITE_PROYECT_API_URL || 'https://681507e7225ff1af162aeb7e.mockapi.io/api/v1', 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: false, 
});