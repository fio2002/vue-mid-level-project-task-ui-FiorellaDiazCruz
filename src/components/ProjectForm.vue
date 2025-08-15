<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">
          <i class="fas fa-folder-plus me-2"></i>
          Nuevo Proyecto
        </h1>
        <router-link to="/" class="btn btn-outline-secondary">
          <i class="fas fa-arrow-left me-1"></i>
          Volver
        </router-link>
      </div>
      
      <div class="card shadow-sm">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="projectName" class="form-label fw-semibold">
                <i class="fas fa-folder me-1"></i>
                Nombre del Proyecto
              </label>
              <input 
                type="text" 
                class="form-control" 
                id="projectName" 
                v-model="projectName"
                placeholder="Ingresa el nombre del proyecto"
                required
                :disabled="projectStore.isLoading"
              >
            </div>

            <div class="mb-3">
              <label for="description" class="form-label fw-semibold">
                <i class="fas fa-align-left me-1"></i>
                Descripción
              </label>
              <textarea 
                class="form-control" 
                id="description" 
                v-model="description"
                rows="4"
                placeholder="Describe el proyecto..."
                required
                :disabled="projectStore.isLoading"
              ></textarea>
            </div>
            
            <div class="d-flex gap-2">
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="projectStore.isLoading"
              >
                <span v-if="projectStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="fas fa-save me-1"></i>
                {{ projectStore.isLoading ? 'Creando...' : 'Crear Proyecto' }}
              </button>
              <router-link to="/" class="btn btn-outline-secondary">
                Cancelar
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '../store/project.js';

const router = useRouter();
const projectStore = useProjectStore();
const projectName = ref('');
const description = ref('');

const handleSubmit = async () => {
  try {
    const payload = {
      name: projectName.value,
      description: description.value,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    await projectStore.crearProyecto(payload);
    router.push('/');
  } catch (error) {
    console.error('Error al crear proyecto:', error);
  }
};
</script>