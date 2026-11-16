
import CatalogoCRUD from '../components/common/CatalogoCRUD'

const camposProductoras = [
  {
    name: 'nombre',
    label: 'Nombre de la productora',
    type: 'text',
    required: true,
    placeholder: 'Ejemplo: Warner Bros',
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
  },
  {
    name: 'slogan',
    label: 'Slogan',
    type: 'text',
    required: false,
    placeholder: 'Ejemplo: The stuff that dreams are made of'
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    type: 'textarea',
    required: false,
    placeholder: 'Describe la productora...'
  }
]

function Productoras() {
  return (
    <CatalogoCRUD
      titulo="Productoras"
      singular="Productora"
      endpoint="productoras"
      campos={camposProductoras}
      descripcionModulo="Administra las compañías productoras."
    />
  )
}

export default Productoras
