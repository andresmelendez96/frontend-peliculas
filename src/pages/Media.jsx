
import { useCallback, useEffect, useState } from 'react'
import {
  Film, Plus, RefreshCw, Pencil, Trash2, X, Save, ExternalLink
} from 'lucide-react'
import Swal from 'sweetalert2'
import api from '../services/api'

function Media() {
  // Datos principales y catálogos relacionados
  const [medias, setMedias] = useState([])
  const [catalogos, setCatalogos] = useState({
    generos: [],
    directores: [],
    productoras: [],
    tipos: []
  })

  // Estados de pantalla
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoId, setEditandoId] = useState(null)

  // Valores iniciales del formulario
  const formularioVacio = {
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    portada: '',
    anio_estreno: '',
    genero_id: '',
    director_id: '',
    productora_id: '',
    tipo_id: ''
  }

  const [formData, setFormData] = useState(formularioVacio)

  // Consultar producciones y catálogos
  const cargarDatos = useCallback(async () => {
    try {
      setCargando(true)
      setError('')

      const [
        respuestaMedia,
        respuestaGeneros,
        respuestaDirectores,
        respuestaProductoras,
        respuestaTipos
      ] = await Promise.all([
        api.get('/media'),
        api.get('/generos'),
        api.get('/directores'),
        api.get('/productoras'),
        api.get('/tipos')
      ])

      setMedias(respuestaMedia.data)

      setCatalogos({
  generos: respuestaGeneros.data,
  directores: respuestaDirectores.data,
  productoras: respuestaProductoras.data,
  tipos: respuestaTipos.data
})

    } catch (error) {
      console.error('Error al cargar Media y catálogos:', error)
      setError(
        'No fue posible cargar la información. Verifica que el Backend esté funcionando.'
      )
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  // Cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(anterior => ({
      ...anterior,
      [name]: value
    }))
  }

  // Preparar formulario nuevo
  const abrirNuevo = () => {
    setEditandoId(null)
    setFormData({ ...formularioVacio })
    setMostrarFormulario(true)
  }

  // Preparar formulario de edición
  const iniciarEdicion = (media) => {
    setEditandoId(media.id)

    setFormData({
      serial: media.serial || '',
      titulo: media.titulo || '',
      sinopsis: media.sinopsis || '',
      url: media.url || '',
      portada: media.portada || '',
      anio_estreno: String(media.anio_estreno || ''),
      genero_id: String(media.genero_id || ''),
      director_id: String(media.director_id || ''),
      productora_id: String(media.productora_id || ''),
      tipo_id: String(media.tipo_id || '')
    })

    setMostrarFormulario(true)
  }

  // Cerrar y limpiar formulario
  const cancelarFormulario = () => {
    setMostrarFormulario(false)
    setEditandoId(null)
    setFormData({ ...formularioVacio })
  }

  // Registrar o actualizar producción
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datosMedia = {
      serial: formData.serial.trim(),
      titulo: formData.titulo.trim(),
      sinopsis: formData.sinopsis.trim(),
      url: formData.url.trim(),
      portada: formData.portada.trim(),
      anio_estreno: Number(formData.anio_estreno),
      genero_id: Number(formData.genero_id),
      director_id: Number(formData.director_id),
      productora_id: Number(formData.productora_id),
      tipo_id: Number(formData.tipo_id)
    }

    try {
      setGuardando(true)

      if (editandoId) {
        await api.put(`/media/${editandoId}`, datosMedia)

        await Swal.fire({
          icon: 'success',
          title: '¡Producción actualizada!',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#e94b61'
        })
      } else {
        await api.post('/media', datosMedia)

        await Swal.fire({
          icon: 'success',
          title: '¡Producción registrada!',
          text: 'La producción se guardó correctamente.',
          confirmButtonColor: '#e94b61'
        })
      }

      cancelarFormulario()
      await cargarDatos()

    } catch (error) {
      console.error('Error al guardar producción:', error)

      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        'No fue posible guardar la producción.'

      await Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: mensaje,
        confirmButtonColor: '#e94b61'
      })

    } finally {
      setGuardando(false)
    }
  }

  // Eliminar producción
  const handleDelete = async (media) => {
    const confirmacion = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar producción?',
      text: `¿Estás seguro de eliminar "${media.titulo}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    })

    if (!confirmacion.isConfirmed) return

    try {
      await api.delete(`/media/${media.id}`)

      await Swal.fire({
        icon: 'success',
        title: '¡Producción eliminada!',
        text: 'El registro se eliminó correctamente.',
        confirmButtonColor: '#e94b61'
      })

      await cargarDatos()

    } catch (error) {
      console.error('Error al eliminar producción:', error)

      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        'No fue posible eliminar la producción.'

      await Swal.fire({
        icon: 'error',
        title: 'No se pudo eliminar',
        text: mensaje,
        confirmButtonColor: '#e94b61'
      })
    }
  }

  // Obtener el nombre de una relación usando su ID
  const obtenerNombre = (lista, id, propiedad) => {
    const encontrado = lista.find(
      elemento => Number(elemento.id) === Number(id)
    )

    return encontrado ? encontrado[propiedad] : `ID ${id}`
  }

  return (
    <section className="generos-page">

      {/* Encabezado */}
      <div className="generos-heading">
        <div>
          <span className="welcome-tag">GESTIÓN DEL CATÁLOGO</span>
          <h1>Películas y series</h1>
          <p>Administra las producciones audiovisuales.</p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={cargarDatos}
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
            {mostrarFormulario ? 'Cancelar' : 'Nueva producción'}
          </button>
        </div>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="generos-form-container">

          <div className="generos-form-heading">
            <div>
              <h3>
                {editandoId
                  ? 'Editar producción'
                  : 'Registrar nueva producción'}
              </h3>
              <p>Completa los datos y las relaciones de la producción.</p>
            </div>
            <Film size={25} />
          </div>

          {catalogos.generos.filter(item => item.estado === 'Activo').length === 0 ||
            catalogos.directores.filter(item => item.estado === 'Activo').length === 0 ||
            catalogos.productoras.filter(item => item.estado === 'Activo').length === 0 ||
            catalogos.tipos.length === 0? (
            <div className="alert alert-warning">
              Debes tener al menos un género, director, productora y tipo
              disponible para registrar una producción.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                <div className="col-md-4">
                  <label className="form-label">Serial *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="serial"
                    value={formData.serial}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Ejemplo: MED-002"
                    required
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Título *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Título de la producción"
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Año de estreno *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="anio_estreno"
                    value={formData.anio_estreno}
                    onChange={handleChange}
                    min="1888"
                    max="2100"
                    placeholder="2026"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Sinopsis</label>
                  <textarea
                    className="form-control"
                    name="sinopsis"
                    value={formData.sinopsis}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe la historia..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">URL de la producción *</label>
                  <input
                    type="url"
                    className="form-control"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/pelicula"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">URL de portada</label>
                  <input
                    type="url"
                    className="form-control"
                    name="portada"
                    value={formData.portada}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/portada.jpg"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Género principal *</label>
                  <select
                    className="form-select"
                    name="genero_id"
                    value={formData.genero_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un género</option>
                    {catalogos.generos
  .filter(item => item.estado === 'Activo')
  .map(item => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Director principal *</label>
                  <select
                    className="form-select"
                    name="director_id"
                    value={formData.director_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un director</option>
                    {catalogos.directores
                        .filter(item => item.estado === 'Activo')
                    .map(item => (
                      <option key={item.id} value={item.id}>
                        {item.nombres}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Productora *</label>
                  <select
                    className="form-select"
                    name="productora_id"
                    value={formData.productora_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una productora</option>
                    {catalogos.productoras.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Tipo *</label>
                  <select
                    className="form-select"
                    name="tipo_id"
                    value={formData.tipo_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un tipo</option>
                    {catalogos.tipos.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
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
                      ? 'Actualizar producción'
                      : 'Guardar producción'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Resumen */}
      <div className="generos-summary">
        <div className="generos-summary-icon">
          <Film size={25} />
        </div>

        <div>
          <span>Total de producciones</span>
          <h2>{medias.length}</h2>
        </div>
      </div>

      {/* Tabla */}
      <div className="generos-table-container">

        <div className="generos-table-heading">
          <h3>Listado de películas y series</h3>
          <span>{medias.length} registros</span>
        </div>

        {cargando ? (
          <p className="generos-message">Cargando producciones...</p>
        ) : error ? (
          <div className="alert alert-danger m-3">{error}</div>
        ) : medias.length === 0 ? (
          <p className="generos-message">
            No hay películas o series registradas.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Portada</th>
                  <th>Título</th>
                  <th>Año</th>
                  <th>Género</th>
                  <th>Director</th>
                  <th>Productora</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {medias.map(media => (
                  <tr key={media.id}>
                    <td>{media.serial}</td>

                    <td>
                      {media.portada ? (
                        <img
                          src={media.portada}
                          alt={`Portada de ${media.titulo}`}
                          className="media-cover"
                        />
                      ) : (
                        <span className="text-secondary">Sin portada</span>
                      )}
                    </td>

                    <td className="fw-semibold">{media.titulo}</td>
                    <td>{media.anio_estreno}</td>

                    <td>
                      {obtenerNombre(
                        catalogos.generos,
                        media.genero_id,
                        'nombre'
                      )}
                    </td>

                    <td>
                      {obtenerNombre(
                        catalogos.directores,
                        media.director_id,
                        'nombres'
                      )}
                    </td>

                    <td>
                      {obtenerNombre(
                        catalogos.productoras,
                        media.productora_id,
                        'nombre'
                      )}
                    </td>

                    <td>
                      {obtenerNombre(
                        catalogos.tipos,
                        media.tipo_id,
                        'nombre'
                      )}
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          title="Editar producción"
                          onClick={() => iniciarEdicion(media)}
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar producción"
                          onClick={() => handleDelete(media)}
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

export default Media
