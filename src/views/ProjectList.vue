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
      
      <Table 
        :columns="projectColumns"
        :rows="projectStore.getProjects"
        :loading="projectStore.isLoading"
        :error="projectStore.getError"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '../store/project.js';
import Table from '../components/Table.vue';

const projectStore = useProjectStore();

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