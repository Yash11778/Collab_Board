import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import { router } from './router'

// Configure axios globally
const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_URL;

console.log('🚀 App starting with API_URL:', API_URL);
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_SERVER_URL:', import.meta.env.VITE_SERVER_URL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
