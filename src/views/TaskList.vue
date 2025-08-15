<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">
          <i class="fas fa-tasks me-2"></i>
          Lista de Tareas
        </h1>
        <router-link to="/new-task" class="btn btn-primary">
          <i class="fas fa-plus me-1"></i>
          Nueva Tarea
        </router-link>
      </div>
      
      <!-- Filtros dinámicos -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">
            <i class="fas fa-filter me-2"></i>
            Filtros
          </h5>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="statusFilter" class="form-label">Estado</label>
              <select 
                class="form-select" 
                id="statusFilter"
                v-model="filters.status"
                @change="applyFilters"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="hecho">Hecho</option>
              </select>
            </div>
            
            <div class="col-md-3 mb-3">
              <label for="priorityFilter" class="form-label">Prioridad</label>
              <select 
                class="form-select" 
                id="priorityFilter"
                v-model="filters.priority"
                @change="applyFilters"
              >
                <option value="">Todas las prioridades</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            
            <div class="col-md-3 mb-3">
              <label for="projectFilter" class="form-label">Proyecto</label>
              <select 
                class="form-select" 
                id="projectFilter"
                v-model="filters.project_id"
                @change="applyFilters"
              >
                <option value="">Todos los proyectos</option>
                <option v-for="project in projectStore.getProjects" :key="project.id" :value="project.id">
                  {{ project.name }}
                </option>
              </select>
            </div>
            
            <div class="col-md-3 mb-3">
              <label for="searchFilter" class="form-label">Buscar</label>
              <input 
                type="text" 
                class="form-control" 
                id="searchFilter"
                v-model="filters.search"
                placeholder="Buscar por título..."
                @input="applyFilters"
              >
            </div>
          </div>
          
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              {{ filteredTasks.length }} tarea{{ filteredTasks.length !== 1 ? 's' : '' }} encontrada{{ filteredTasks.length !== 1 ? 's' : '' }}
            </small>
            <button 
              @click="clearFilters" 
              class="btn btn-outline-secondary btn-sm"
              :disabled="!hasActiveFilters"
            >
              <i class="fas fa-times me-1"></i>
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      
      <!-- Tabla de tareas -->
      <Table 
        :columns="taskColumns"
        :rows="filteredTasks"
        :loading="taskStore.isLoading"
        :error="taskStore.getError"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../store/task.js';
import { useProjectStore } from '../store/project.js';
import Table from '../components/Table.vue';

const taskStore = useTaskStore();
const projectStore = useProjectStore();

const filters = ref({
  status: '',
  priority: '',
  project_id: '',
  search: ''
});

const taskColumns = [
  {
    key: 'title',
    label: 'Título',
    icon: 'fas fa-tasks'
  },
  {
    key: 'project_name',
    label: 'Proyecto',
    icon: 'fas fa-folder'
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'status',
    icon: 'fas fa-circle'
  },
  {
    key: 'priority',
    label: 'Prioridad',
    type: 'priority',
    icon: 'fas fa-exclamation-triangle'
  },
  {
    key: 'created_at',
    label: 'Fecha de Creación',
    type: 'date',
    icon: 'fas fa-calendar'
  }
];

const filteredTasks = computed(() => {
  let tasks = taskStore.getTasks;
  
  // Agregar nombre del proyecto a cada tarea
  tasks = tasks.map(task => ({
    ...task,
    project_name: getProjectName(task.project_id)
  }));
  
  // Aplicar filtros
  if (filters.value.status) {
    tasks = tasks.filter(task => task.status === filters.value.status);
  }
  
  if (filters.value.priority) {
    tasks = tasks.filter(task => task.priority === filters.value.priority);
  }
  
  if (filters.value.project_id) {
    tasks = tasks.filter(task => task.project_id === filters.value.project_id);
  }
  
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    tasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  }
  
  return tasks;
});

const hasActiveFilters = computed(() => {
  return filters.value.status || filters.value.priority || filters.value.project_id || filters.value.search;
});

const getProjectName = (projectId) => {
  const project = projectStore.getProjects.find(p => p.id === projectId);
  return project ? project.name : 'Proyecto no encontrado';
};

const applyFilters = () => {
  // Los filtros se aplican automáticamente por el computed
};

const clearFilters = () => {
  filters.value = {
    status: '',
    priority: '',
    project_id: '',
    search: ''
  };
};

const handleEdit = (task) => {
  console.log('Editar tarea:', task);
};

const handleRemove = async (task) => {
  if (confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`)) {
    try {
      await taskStore.eliminarTarea(task.id);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  }
};

onMounted(async () => {
  try {
    await Promise.all([
      taskStore.obtenerTareas(),
      projectStore.obtenerProyectos()
    ]);
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
});
</script>
