
import { Bell, CircleUserRound } from 'lucide-react'

function Navbar() {
  return (
    <header className="topbar">
      <div>
        <span className="topbar-label">PLATAFORMA DE ADMINISTRACIÓN</span>
        <h2>Panel de control</h2>
      </div>

      <div className="topbar-user">
        <Bell size={20} />

        <div className="user-info">
          <CircleUserRound size={32} />

          <div>
            <strong>Administrador</strong>
            <span>Gestión del catálogo</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
