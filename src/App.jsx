
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Generos from './pages/Generos'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Directores from './pages/Directores'
import Productoras from './pages/Productoras'
import Tipos from './pages/Tipos'
import './App.css'
import Media from './pages/Media'
function ModulePlaceholder({ title }) {
  return (
    <section className="placeholder-page">
      <span className="welcome-tag">MÓDULO DE ADMINISTRACIÓN</span>
      <h1>{title}</h1>

      <p>
        Aquí construiremos las funciones para consultar,
        registrar, editar y eliminar los registros.
      </p>

      <span className="placeholder-status">
        Módulo en construcción
      </span>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <div className="app-main">
          <Navbar />

          <main className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
  path="/generos"
  element={<Generos />}
                />

              <Route
  path="/directores"
  element={<Directores />}
/>

              <Route
  path="/productoras"
  element={<Productoras />}
/>

              <Route
  path="/tipos"
  element={<Tipos />}
/>

              <Route
  path="/media"
  element={<Media />}
/>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
