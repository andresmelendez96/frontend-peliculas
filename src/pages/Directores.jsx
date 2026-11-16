
import CatalogoCRUD from '../components/common/CatalogoCRUD'

const camposDirectores = [
  {
    name: 'nombres',
    label: 'Nombres del director',
    type: 'text',
    required: true,
    placeholder: 'Ejemplo: Christopher Nolan',
    maxLength: 150
  },
  {
    name: 'estado',
    label: 'Estado',
    type: 'select',
    required: true,
    defaultValue: 'Activo',
    options: [
      { value: 'Activo', label: 'Activo' },
      { value: 'Inactivo', label: 'Inactivo' }
    ]
  }
]

function Directores() {
  return (
    <CatalogoCRUD
      titulo="Directores"
      singular="Director"
      endpoint="directores"
      campos={camposDirectores}
      descripcionModulo="Administra los directores de las producciones."
    />
  )
}

export default Directores
