#  CineAdmin – Frontend

Aplicación web administrativa para la gestión de películas y series, desarrollada con React y conectada a una API REST construida con Node.js, Express y MySQL.

Proyecto académico correspondiente a la Evidencia de Aprendizaje 2 de la asignatura Ingeniería Web II de la Institución Universitaria Digital de Antioquia.

##  Descripción del proyecto

CineAdmin es una aplicación web que permite administrar la información de un catálogo audiovisual desde una interfaz intuitiva y organizada.

Su propósito es facilitar la gestión de películas y series mediante operaciones CRUD (crear, consultar, actualizar y eliminar), conectándose con una API REST que procesa y almacena la información en una base de datos MySQL.

La aplicación está orientada al administrador del catálogo y no requiere, en esta etapa, un sistema de registro o autenticación de usuarios.

##  Módulos del sistema

La aplicación cuenta con cinco módulos principales:

| Módulo | Funcionalidad |
|---|---|
| Géneros | Registro, consulta, edición y eliminación de géneros cinematográficos. |
| Directores | Administración de nombres y estados de los directores. |
| Productoras | Gestión de productoras, estados, slogans y descripciones. |
| Tipos | Administración de los tipos de contenido, como películas y series. |
| Media | Gestión de películas y series, incluyendo sus datos y relaciones con los demás módulos. |

### Gestión de Media

El módulo Media permite administrar la siguiente información:

- Serial único de la producción.
- Título y sinopsis.
- URL de la producción.
- Imagen o portada.
- Año de estreno.
- Género principal.
- Director principal.
- Productora.
- Tipo de contenido.

Las relaciones se establecen mediante listas desplegables que consultan los datos de los módulos correspondientes.

Para registrar una producción, se deben seleccionar géneros, directores y productoras que se encuentren en estado activo. Los tipos corresponden a los registros disponibles en su respectivo módulo.

##  Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Desarrollo de la interfaz de usuario. |
| Vite | Entorno de desarrollo y compilación. |
| JavaScript | Lógica de la aplicación. |
| Axios | Comunicación con la API REST. |
| React Router DOM | Navegación entre módulos. |
| Bootstrap | Diseño y estilos de los componentes. |
| SweetAlert2 | Alertas, notificaciones y confirmaciones. |
| Lucide React | Iconografía de la aplicación. |
| Git y GitHub | Control de versiones y alojamiento del código. |

## Arquitectura del proyecto

La solución está organizada en dos proyectos independientes que se comunican mediante solicitudes HTTP:

**Frontend:** React + Vite.

**Backend:** Node.js + Express.

**Base de datos:** MySQL 8.

El Frontend se encarga de presentar la información y capturar las acciones del administrador. El Backend recibe las solicitudes, ejecuta las operaciones correspondientes y se comunica con la base de datos.

### Repositorios

- **Frontend:** https://github.com/andresmelendez96/frontend-peliculas
- **Backend:** https://github.com/andresmelendez96/api-peliculas

##  Estructura del proyecto

```text
frontend-peliculas/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── CatalogoCRUD.jsx
│   │   │
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Generos.jsx
│   │   ├── Directores.jsx
│   │   ├── Productoras.jsx
│   │   ├── Tipos.jsx
│   │   └── Media.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

### Organización de carpetas

- `components/common`: componentes reutilizables para la gestión de catálogos.
- `components/layout`: elementos generales de navegación y encabezado.
- `pages`: pantallas de los módulos administrativos.
- `services`: configuración de comunicación con el Backend mediante Axios.
- `assets`: recursos gráficos de la aplicación.

##  Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js.
- npm.
- Git.
- MySQL Server 8.
- El Backend de CineAdmin instalado y funcionando.

##  Instalación y ejecución

### 1. Clonar el repositorio Frontend

```bash
git clone https://github.com/andresmelendez96/frontend-peliculas.git
```

### 2. Ingresar al directorio

```bash
cd frontend-peliculas
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar la conexión con la API

El archivo `src/services/api.js` contiene la configuración de Axios.

Por defecto, la aplicación utiliza:

```javascript
baseURL: 'http://localhost:3000/api'
```

Esta dirección corresponde al servidor local del Backend.

Si se ejecuta el Backend en otra dirección o puerto, se debe actualizar esta configuración.

### 5. Iniciar el Backend

Clonar el repositorio correspondiente:

```bash
git clone https://github.com/andresmelendez96/api-peliculas.git
```

Seguir las instrucciones de instalación y configuración de variables de entorno descritas en el README del Backend.

Iniciar el servidor:

```bash
npm run dev
```

Por defecto, la API funciona en:

`http://localhost:3000`

### 6. Iniciar el Frontend

En una terminal independiente, ejecutar:

```bash
npm run dev
```

Vite iniciará la aplicación, normalmente en:

`http://localhost:5173`

Ambos servidores deben permanecer activos para permitir la comunicación entre el Frontend y el Backend.

##  Pruebas y funcionalidades

Durante el desarrollo se verificaron las operaciones CRUD de los cinco módulos:

- Creación de registros.
- Consulta de información.
- Actualización de registros existentes.
- Eliminación con confirmación.
- Comunicación entre React y la API REST.
- Consulta de relaciones entre los módulos de Media.
- Validación de disponibilidad de géneros, directores y productoras activos.

##  Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del proyecto. |
| `npm run dev` | Inicia el entorno de desarrollo. |
| `npm run build` | Genera la versión de producción. |
| `npm run preview` | Previsualiza la compilación de producción. |
| `npm run lint` | Ejecuta el análisis estático del código con ESLint. |

##  Desarrollo académico

Proyecto desarrollado en equipo para la asignatura Ingeniería Web II de la Institución Universitaria Digital de Antioquia.

**Nombre de la aplicación:** CineAdmin.

**Actividad:** Evidencia de Aprendizaje 2 – Front End ReactJs.

**Proyecto relacionado:** API REST para la gestión de películas y series.

---

**CineAdmin – Administración de películas y series.**