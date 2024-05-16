import axios from "axios";


export const axiosApi = axios.create({
  baseURL: 'http://localhost:5059/api/',
  headers: { 
    'Content-Type': 'application/json'
  },
})