<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">
          <i class="fas fa-project-diagram me-2"></i>
          Lista de Proyectos
        </h1>
        <router-link to="/new-project" class="btn btn-primary">
          <i class="fas fa-plus me-1"></i>
          Nuevo Proyecto
        </router-link>
      </div>
      
      <!-- Filtros -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">
            <i class="fas fa-filter me-2"></i>
            Filtros
          </h5>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="nameFilter" class="form-label">Nombre</label>
              <input 
                type="text" 
                class="form-control" 
                id="nameFilter"
                v-model="filters.name"
                placeholder="Buscar por nombre..."
                @input="applyFilters"
              >
            </div>
            
            <div class="col-md-4 mb-3">
              <label for="statusFilter" class="form-label">Estado</label>
              <select 
                class="form-select" 
                id="statusFilter"
                v-model="filters.status"
                @change="applyFilters"
              >
                <option value="">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
            
            <div class="col-md-4 mb-3 d-flex align-items-end">
              <button 
                @click="clearFilters" 
                class="btn btn-outline-secondary"
                :disabled="!hasActiveFilters"
              >
                <i class="fas fa-times me-1"></i>
                Limpiar filtros
              </button>
            </div>
          </div>
          
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              {{ filteredProjects.length }} proyecto{{ filteredProjects.length !== 1 ? 's' : '' }} encontrado{{ filteredProjects.length !== 1 ? 's' : '' }}
            </small>
          </div>
        </div>
      </div>
      
      <Table 
        :columns="projectColumns"
        :rows="filteredProjects"
        :loading="projectStore.isLoading"
        :error="projectStore.getError"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjectStore } from '../store/project.js';
import Table from '../components/Table.vue';

const projectStore = useProjectStore();

const filters = ref({
  name: '',
  status: ''
});

const projectColumns = [
  {
    key: 'name',
    label: 'Nombre del Proyecto',
    icon: 'fas fa-folder'
  },
  {
    key: 'description',
    label: 'Descripción',
    icon: 'fas fa-align-left'
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'status',
    icon: 'fas fa-circle'
  },
  {
    key: 'createdAt',
    label: 'Fecha de Creación',
    type: 'date',
    icon: 'fas fa-calendar'
  }
];

const filteredProjects = computed(() => {
  let projects = projectStore.getProjects;
  
  if (filters.value.name) {
    const searchTerm = filters.value.name.toLowerCase();
    projects = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.value.status) {
    projects = projects.filter(project => project.status === filters.value.status);
  }
  
  return projects;
});

const hasActiveFilters = computed(() => {
  return filters.value.name || filters.value.status;
});

const applyFilters = () => {
  // Los filtros se aplican automáticamente por el computed
};

const clearFilters = () => {
  filters.value = {
    name: '',
    status: ''
  };
};

const handleEdit = (project) => {
  console.log('Editar proyecto:', project);
};

const handleRemove = async (project) => {
  if (confirm(`¿Estás seguro de que quieres eliminar el proyecto "${project.name}"?`)) {
    try {
      await projectStore.eliminarProyecto(project.id);
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  }
};

onMounted(async () => {
  try {
    const projects = await projectStore.obtenerProyectos();
    console.log('Proyectos cargados:', projects);
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
  }
});
</script>