
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Estilos de las librerías
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

// Estilos generales de nuestra aplicación
import './index.css'

// Componente principal
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
