
import { useCallback, useEffect, useState } from 'react'
import { Plus, RefreshCw, Pencil, Trash2, X, Save } from 'lucide-react'
import Swal from 'sweetalert2'
import api from '../../services/api'

function CatalogoCRUD({ titulo, singular, endpoint, campos, descripcionModulo }) {

  // Estados generales
  const [registros, setRegistros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoId, setEditandoId] = useState(null)

  // Crear valores iniciales según los campos del módulo
  const crearFormularioInicial = () => {
    return campos.reduce((acumulador, campo) => {
      acumulador[campo.name] =
        campo.defaultValue ??
        (campo.type === 'select'
          ? campo.options?.[0]?.value ?? ''
          : '')

      return acumulador
    }, {})
  }

  const [formData, setFormData] = useState(crearFormularioInicial)

  // Consultar registros
  const cargarRegistros = useCallback(async () => {
    try {
      setCargando(true)
      setError('')

      const respuesta = await api.get(`/${endpoint}`)
      setRegistros(respuesta.data)

    } catch (error) {
      console.error(`Error al consultar ${titulo}:`, error)
      setError(`No fue posible cargar ${titulo.toLowerCase()}.`)
    } finally {
      setCargando(false)
    }
  }, [endpoint, titulo])

  useEffect(() => {
    cargarRegistros()
  }, [cargarRegistros])

  // Capturar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  // Abrir formulario para crear
  const abrirNuevo = () => {
    setEditandoId(null)
    setFormData(crearFormularioInicial())
    setMostrarFormulario(true)
  }

  // Cargar datos para editar
  const iniciarEdicion = (registro) => {
    setEditandoId(registro.id)

    const datos = campos.reduce((acumulador, campo) => {
      acumulador[campo.name] =
        registro[campo.name] ?? campo.defaultValue ?? ''
      return acumulador
    }, {})

    setFormData(datos)
    setMostrarFormulario(true)
  }

  // Cancelar formulario
  const cancelarFormulario = () => {
    setMostrarFormulario(false)
    setEditandoId(null)
    setFormData(crearFormularioInicial())
  }

  // Crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = campos.reduce((acumulador, campo) => {
      const valor = formData[campo.name]

      acumulador[campo.name] =
        typeof valor === 'string' ? valor.trim() : valor

      return acumulador
    }, {})

    try {
      setGuardando(true)

      if (editandoId) {
        await api.put(`/${endpoint}/${editandoId}`, datos)

        await Swal.fire({
          icon: 'success',
          title: '¡Registro actualizado!',
          text: `${singular} actualizado correctamente.`,
          confirmButtonColor: '#e94b61'
        })
      } else {
        await api.post(`/${endpoint}`, datos)

        await Swal.fire({
          icon: 'success',
          title: '¡Registro creado!',
          text: `${singular} registrado correctamente.`,
          confirmButtonColor: '#e94b61'
        })
      }

      cancelarFormulario()
      await cargarRegistros()

    } catch (error) {
      console.error(`Error al guardar ${singular}:`, error)

      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        `No fue posible guardar ${singular}.`

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

  // Eliminar registro
  const handleDelete = async (registro) => {
    const nombreRegistro =
      registro.nombre || registro.nombres || registro.id

    const confirmacion = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar registro?',
      text: `¿Estás seguro de eliminar "${nombreRegistro}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    })

    if (!confirmacion.isConfirmed) return

    try {
      await api.delete(`/${endpoint}/${registro.id}`)

      await Swal.fire({
        icon: 'success',
        title: '¡Registro eliminado!',
        text: `${singular} eliminado correctamente.`,
        confirmButtonColor: '#e94b61'
      })

      await cargarRegistros()

    } catch (error) {
      console.error(`Error al eliminar ${singular}:`, error)

      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        'No fue posible eliminar el registro.'

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
          <h1>{titulo}</h1>
          <p>{descripcionModulo}</p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={cargarRegistros}
            disabled={cargando}
          >
            <RefreshCw size={17} />
            Actualizar
          </button>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={mostrarFormulario ? cancelarFormulario : abrirNuevo}
          >
            {mostrarFormulario ? <X size={17} /> : <Plus size={17} />}
            {mostrarFormulario ? 'Cancelar' : `Nuevo ${singular.toLowerCase()}`}
          </button>
        </div>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="generos-form-container">

          <div className="generos-form-heading">
            <div>
              <h3>
                {editandoId ? `Editar ${singular}` : `Registrar ${singular}`}
              </h3>
              <p>Completa la información del registro.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {campos.map((campo) => (
                <div
                  className={campo.type === 'textarea' ? 'col-12' : 'col-md-6'}
                  key={campo.name}
                >
                  <label className="form-label">
                    {campo.label} {campo.required ? '*' : ''}
                  </label>

                  {campo.type === 'select' ? (
                    <select
                      className="form-select"
                      name={campo.name}
                      value={formData[campo.name]}
                      onChange={handleChange}
                      required={campo.required}
                    >
                      {campo.options.map((opcion) => (
                        <option key={opcion.value} value={opcion.value}>
                          {opcion.label}
                        </option>
                      ))}
                    </select>

                  ) : campo.type === 'textarea' ? (
                    <textarea
                      className="form-control"
                      name={campo.name}
                      value={formData[campo.name]}
                      onChange={handleChange}
                      placeholder={campo.placeholder || ''}
                      rows="3"
                      required={campo.required}
                    />

                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      name={campo.name}
                      value={formData[campo.name]}
                      onChange={handleChange}
                      placeholder={campo.placeholder || ''}
                      required={campo.required}
                      maxLength={campo.maxLength || 255}
                    />
                  )}
                </div>
              ))}

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
                    ? 'Actualizar'
                    : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resumen */}
      <div className="generos-summary">
        <div className="generos-summary-icon">
          <RefreshCw size={25} />
        </div>

        <div>
          <span>Total de registros</span>
          <h2>{registros.length}</h2>
        </div>
      </div>

      {/* Tabla */}
      <div className="generos-table-container">

        <div className="generos-table-heading">
          <h3>Listado de {titulo.toLowerCase()}</h3>
          <span>{registros.length} registros</span>
        </div>

        {cargando ? (
          <p className="generos-message">Cargando registros...</p>
        ) : error ? (
          <div className="alert alert-danger m-3">{error}</div>
        ) : registros.length === 0 ? (
          <p className="generos-message">No hay registros disponibles.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>

                  {campos.map((campo) => (
                    <th key={campo.name}>{campo.label}</th>
                  ))}

                  <th>Fecha de creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {registros.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.id}</td>

                    {campos.map((campo) => (
                      <td key={campo.name}>
                        {campo.name === 'estado' ? (
                          <span
                            className={
                              registro.estado === 'Activo'
                                ? 'badge text-bg-success'
                                : 'badge text-bg-secondary'
                            }
                          >
                            {registro.estado}
                          </span>
                        ) : (
                          registro[campo.name] || '—'
                        )}
                      </td>
                    ))}

                    <td>
                      {registro.created_at
                        ? new Date(registro.created_at).toLocaleDateString('es-CO')
                        : 'No disponible'}
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          title="Editar"
                          onClick={() => iniciarEdicion(registro)}
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar"
                          onClick={() => handleDelete(registro)}
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

export default CatalogoCRUD
