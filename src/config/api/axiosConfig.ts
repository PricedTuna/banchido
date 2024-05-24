import axios from "axios";


export const axiosApi = axios.create({
  baseURL: 'http://localhost:3000',  // Local
  // baseURL: 'https://banchidoback-production.up.railway.app',    // Produccion
  headers: { 
    'Content-Type': 'application/json'
  },
})