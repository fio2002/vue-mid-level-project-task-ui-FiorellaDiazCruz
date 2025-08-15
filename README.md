# Vue Project Management

Aplicación de gestión de proyectos y tareas construida con Vue.js 3.

## Tecnologías

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Axios
- Bootstrap 5
- Vuelidate
- Vite

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Funcionalidades

### Proyectos
- Lista de proyectos con filtros
- Crear nuevo proyecto
- Editar y eliminar proyectos
- Filtros por nombre y estado

### Tareas
- Lista de tareas con filtros dinámicos
- Crear nueva tarea
- Editar y eliminar tareas
- Filtros por estado, prioridad, proyecto y búsqueda

## API

La aplicación consume la API de MockAPI:
- Proyectos: `https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects`
- Tareas: `https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks`

## Estructura

```
src/
├── components/
│   ├── ProjectForm.vue
│   ├── TaskForm.vue
│   └── Table.vue
├── views/
│   ├── ProjectList.vue
│   └── TaskList.vue
├── store/
│   ├── project.js
│   └── task.js
├── router/
│   └── index.js
└── App.vue
```

## Rutas

- `/` - Lista de proyectos
- `/tasks` - Lista de tareas
- `/new-project` - Crear proyecto
- `/new-task` - Crear tarea

