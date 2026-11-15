
import { Link } from 'react-router-dom'
import {
  Tags,
  UserRound,
  Building2,
  Layers,
  Film,
  ArrowUpRight
} from 'lucide-react'

const modules = [
  {
    to: '/generos',
    title: 'Géneros',
    description: 'Administra las categorías de películas.',
    Icon: Tags
  },
  {
    to: '/directores',
    title: 'Directores',
    description: 'Gestiona los directores de las producciones.',
    Icon: UserRound
  },
  {
    to: '/productoras',
    title: 'Productoras',
    description: 'Administra las compañías productoras.',
    Icon: Building2
  },
  {
    to: '/tipos',
    title: 'Tipos',
    description: 'Gestiona películas, series y otros formatos.',
    Icon: Layers
  },
  {
    to: '/media',
    title: 'Películas y series',
    description: 'Gestiona las producciones del catálogo.',
    Icon: Film
  }
]

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="welcome-panel">
        <div>
          <span className="welcome-tag">CINEADMIN</span>
          <h1>Tu catálogo, bajo control.</h1>

          <p>
            Administra películas, series y toda la información
            relacionada con tus producciones desde un solo lugar.
          </p>
        </div>

        <Film size={75} strokeWidth={1.2} />
      </section>

      <section className="modules-section">
        <div className="section-heading">
          <div>
            <h2>Módulos de administración</h2>
            <p>Selecciona el módulo que deseas gestionar.</p>
          </div>
        </div>

        <div className="module-grid">
          {modules.map(({ to, title, description, Icon }) => (
            <Link to={to} className="module-card" key={to}>
              <div className="module-icon">
                <Icon size={24} />
              </div>

              <div className="module-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <ArrowUpRight size={19} className="module-arrow" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
