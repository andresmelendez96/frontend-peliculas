
import axios from 'axios'

// Configuración central de comunicación con el Backend
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000/api',

  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
