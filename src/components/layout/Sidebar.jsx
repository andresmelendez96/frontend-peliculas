
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Tags,
  UserRound,
  Building2,
  Layers,
  Film
} from 'lucide-react'

const menuItems = [
  { to: '/', label: 'Inicio', Icon: LayoutDashboard },
  { to: '/generos', label: 'Géneros', Icon: Tags },
  { to: '/directores', label: 'Directores', Icon: UserRound },
  { to: '/productoras', label: 'Productoras', Icon: Building2 },
  { to: '/tipos', label: 'Tipos', Icon: Layers },
  { to: '/media', label: 'Películas y series', Icon: Film }
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Film size={25} />
        </div>

        <div>
          <h2>CineAdmin</h2>
          <span>Gestión audiovisual</span>
        </div>
      </div>

      <p className="sidebar-label">MENÚ PRINCIPAL</p>

      <nav className="sidebar-nav">
        {menuItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>EA2 · Ingeniería Web II</span>
        <small>Frontend React</small>
      </div>
    </aside>
  )
}

export default Sidebar
