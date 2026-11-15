
import { useCallback, useEffect, useState } from 'react'
import { RefreshCw, Tags, Plus, X, Save, Pencil, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import api from '../services/api'


function Generos() {
  // Estados de la pantalla
  const [generos, setGeneros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoId, setEditandoId] = useState(null)

  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  })

  // Consultar géneros
  const cargarGeneros = useCallback(async () => {
    try {
      setCargando(true)
      setError('')

      const respuesta = await api.get('/generos')
      setGeneros(respuesta.data)

    } catch (error) {
      console.error('Error al consultar géneros:', error)
      setError('No fue posible cargar los géneros.')
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargarGeneros()
  }, [cargarGeneros])

  // Actualizar los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }
  // Cargar los datos del género seleccionado
const iniciarEdicion = (genero) => {
  setEditandoId(genero.id)

  setFormData({
    nombre: genero.nombre || '',
    estado: genero.estado || 'Activo',
    descripcion: genero.descripcion || ''
  })

  setMostrarFormulario(true)
}

// Abrir un formulario limpio para un nuevo género
const abrirNuevoGenero = () => {
  setEditandoId(null)

  setFormData({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  })

  setMostrarFormulario(true)
}

// Cancelar y limpiar el formulario
const cancelarFormulario = () => {
  setMostrarFormulario(false)
  setEditandoId(null)

  setFormData({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  })
}

  // Registrar un género
  
  // Registrar o actualizar un género
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datosGenero = {
      nombre: formData.nombre.trim(),
      estado: formData.estado,
      descripcion: formData.descripcion.trim()
    }

    try {
      setGuardando(true)

      if (editandoId) {
        await api.put(`/generos/${editandoId}`, datosGenero)

        await Swal.fire({
          icon: 'success',
          title: '¡Género actualizado!',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#e94b61'
        })
      } else {
        await api.post('/generos', datosGenero)

        await Swal.fire({
          icon: 'success',
          title: '¡Género registrado!',
          text: 'El género se guardó correctamente.',
          confirmButtonColor: '#e94b61'
        })
      }

      cancelarFormulario()
      await cargarGeneros()

    } catch (error) {
      console.error('Error al guardar género:', error)

      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        'No fue posible guardar los cambios.'

      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: mensaje,
        confirmButtonColor: '#e94b61'
      })

    } finally {
      setGuardando(false)
    }
  }

  // Eliminar un género
  const handleDelete = async (genero) => {
    const confirmacion = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar género?',
      text: `¿Estás seguro de eliminar "${genero.nombre}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    })

    if (!confirmacion.isConfirmed) return

    try {
      await api.delete(`/generos/${genero.id}`)

      await Swal.fire({
        icon: 'success',
        title: '¡Género eliminado!',
        text: 'El registro se eliminó correctamente.',
        confirmButtonColor: '#e94b61'
      })

      await cargarGeneros()

    } catch (error) {
      console.error('Error al eliminar género:', error)

      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        'No fue posible eliminar el género.'

      Swal.fire({
        icon: 'error',
        title: 'No se pudo eliminar',
        text: mensaje,
        confirmButtonColor: '#e94b61'
      })
    }
  }


  return (
    <section className="generos-page">

      {/* Encabezado */}
      <div className="generos-heading">
        <div>
          <span className="welcome-tag">GESTIÓN DEL CATÁLOGO</span>
          <h1>Géneros</h1>
          <p>Administra los géneros de películas y series.</p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={cargarGeneros}
            disabled={cargando}
          >
            <RefreshCw size={17} />
            Actualizar
          </button>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() =>
  mostrarFormulario
    ? cancelarFormulario()
    : abrirNuevoGenero()
}
          >
            {mostrarFormulario ? <X size={17} /> : <Plus size={17} />}
            {mostrarFormulario ? 'Cancelar' : 'Nuevo género'}
          </button>
        </div>
      </div>

      {/* Formulario de registro */}
      {mostrarFormulario && (
        <div className="generos-form-container">

          <div className="generos-form-heading">
            <div>
              <h3>
             {editandoId ? 'Editar género' : 'Registrar nuevo género'}
            </h3>

            <p>
  {editandoId
    ? 'Modifica la información del género seleccionado.'
    : 'Completa la información del nuevo género.'}
</p>
            </div>
            <Tags size={24} />
          </div>

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Nombre del género *
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ejemplo: Comedia"
                  maxLength={100}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Estado *
                </label>

                <select
                  className="form-select"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">
                  Descripción
                </label>

                <textarea
                  className="form-control"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe el género..."
                  rows="3"
                />
              </div>

            </div>

            <div className="generos-form-actions">
              <button
              type="button"
               className="btn btn-outline-secondary"
                 onClick={cancelarFormulario}
                 disabled={guardando}
                  >
                      Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center gap-2"
                disabled={guardando}
              >
                <Save size={17} />
                {guardando
  ? 'Guardando...'
  : editandoId
    ? 'Actualizar género'
    : 'Guardar género'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Resumen */}
      <div className="generos-summary">
        <div className="generos-summary-icon">
          <Tags size={25} />
        </div>

        <div>
          <span>Total de géneros registrados</span>
          <h2>{generos.length}</h2>
        </div>
      </div>

      {/* Tabla */}
      <div className="generos-table-container">

        <div className="generos-table-heading">
          <h3>Listado de géneros</h3>
          <span>{generos.length} registros</span>
        </div>

        {cargando ? (
          <p className="generos-message">
            Cargando géneros...
          </p>
        ) : error ? (
          <div className="alert alert-danger m-3">
            {error}
          </div>
        ) : generos.length === 0 ? (
          <p className="generos-message">
            No hay géneros registrados.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fecha de creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {generos.map((genero) => (
                  <tr key={genero.id}>
                    <td>{genero.id}</td>

                    <td className="fw-semibold">
                      {genero.nombre}
                    </td>

                    <td>
                      {genero.descripcion || 'Sin descripción'}
                    </td>

                    <td>
                      <span
                        className={
                          genero.estado === 'Activo'
                            ? 'badge text-bg-success'
                            : 'badge text-bg-secondary'
                        }
                      >
                        {genero.estado}
                      </span>
                    </td>

                    <td>
                      {genero.created_at
                        ? new Date(genero.created_at).toLocaleDateString('es-CO')
                        : 'No disponible'}
                    </td>
                    <td>
  <div className="d-flex gap-2">

  <button
    type="button"
    className="btn btn-sm btn-outline-primary"
    title="Editar género"
    onClick={() => iniciarEdicion(genero)}
  >
    <Pencil size={15} />
  </button>

  <button
    type="button"
    className="btn btn-sm btn-outline-danger"
    title="Eliminar género"
    onClick={() => handleDelete(genero)}
  >
    <Trash2 size={15} />
  </button>

</div>
</td>
                  </tr>
                  
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </section>
  )
}

export default Generos
