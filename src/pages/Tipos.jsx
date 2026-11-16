
import CatalogoCRUD from '../components/common/CatalogoCRUD'

const camposTipos = [
  {
    name: 'nombre',
    label: 'Nombre del tipo',
    type: 'text',
    required: true,
    placeholder: 'Ejemplo: Película',
    maxLength: 150
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    type: 'textarea',
    required: false,
    placeholder: 'Describe el tipo de contenido...'
  }
]

function Tipos() {
  return (
    <CatalogoCRUD
      titulo="Tipos"
      singular="Tipo"
      endpoint="tipos"
      campos={camposTipos}
      descripcionModulo="Administra los tipos de contenido multimedia."
    />
  )
}

export default Tipos
