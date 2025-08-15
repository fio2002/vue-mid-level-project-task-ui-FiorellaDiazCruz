<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">
          <i class="fas fa-plus-circle me-2"></i>
          Nueva Tarea
        </h1>
        <router-link to="/tasks" class="btn btn-outline-secondary">
          <i class="fas fa-arrow-left me-1"></i>
          Volver
        </router-link>
      </div>
      
      <div class="card shadow-sm">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="taskTitle" class="form-label fw-semibold">
                  <i class="fas fa-tasks me-1"></i>
                  Título de la Tarea
                </label>
                <input 
                  type="text" 
                  class="form-control" 
                  :class="{ 'is-invalid': v$.title.$error }"
                  id="taskTitle" 
                  v-model="taskData.title"
                  placeholder="Ingresa el título de la tarea"
                  required
                  :disabled="taskStore.isLoading"
                >
                <div v-if="v$.title.$error" class="invalid-feedback">
                  {{ v$.title.$errors[0].$message }}
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <label for="taskProject" class="form-label fw-semibold">
                  <i class="fas fa-folder me-1"></i>
                  Proyecto
                </label>
                <select 
                  class="form-select" 
                  :class="{ 'is-invalid': v$.project_id.$error }"
                  id="taskProject"
                  v-model="taskData.project_id"
                  required
                  :disabled="taskStore.isLoading"
                >
                  <option value="">Seleccionar proyecto...</option>
                  <option v-for="project in projectStore.getProjects" :key="project.id" :value="project.id">
                    {{ project.name }}
                  </option>
                </select>
                <div v-if="v$.project_id.$error" class="invalid-feedback">
                  {{ v$.project_id.$errors[0].$message }}
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="taskStatus" class="form-label fw-semibold">
                  <i class="fas fa-circle me-1"></i>
                  Estado
                </label>
                <select 
                  class="form-select" 
                  :class="{ 'is-invalid': v$.status.$error }"
                  id="taskStatus"
                  v-model="taskData.status"
                  required
                  :disabled="taskStore.isLoading"
                >
                  <option value="">Seleccionar estado...</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="hecho">Hecho</option>
                </select>
                <div v-if="v$.status.$error" class="invalid-feedback">
                  {{ v$.status.$errors[0].$message }}
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <label for="taskPriority" class="form-label fw-semibold">
                  <i class="fas fa-exclamation-triangle me-1"></i>
                  Prioridad
                </label>
                <select 
                  class="form-select" 
                  :class="{ 'is-invalid': v$.priority.$error }"
                  id="taskPriority"
                  v-model="taskData.priority"
                  required
                  :disabled="taskStore.isLoading"
                >
                  <option value="">Seleccionar prioridad...</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
                <div v-if="v$.priority.$error" class="invalid-feedback">
                  {{ v$.priority.$errors[0].$message }}
                </div>
              </div>
            </div>
            
            <div class="mb-3">
              <label for="taskDescription" class="form-label fw-semibold">
                <i class="fas fa-align-left me-1"></i>
                Descripción
              </label>
              <textarea 
                class="form-control" 
                :class="{ 'is-invalid': v$.description.$error }"
                id="taskDescription" 
                v-model="taskData.description"
                rows="4"
                placeholder="Describe la tarea..."
                required
                :disabled="taskStore.isLoading"
              ></textarea>
              <div v-if="v$.description.$error" class="invalid-feedback">
                {{ v$.description.$errors[0].$message }}
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="taskStore.isLoading || v$.$invalid"
              >
                <span v-if="taskStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="fas fa-save me-1"></i>
                {{ taskStore.isLoading ? 'Creando...' : 'Crear Tarea' }}
              </button>
              <router-link to="/tasks" class="btn btn-outline-secondary">
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/task.js';
import { useProjectStore } from '../store/project.js';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const router = useRouter();
const taskStore = useTaskStore();
const projectStore = useProjectStore();

const taskData = reactive({
  title: '',
  description: '',
  project_id: '',
  status: '',
  priority: ''
});

const rules = {
  title: { required, minLength: minLength(3) },
  description: { required, minLength: minLength(10) },
  project_id: { required },
  status: { required },
  priority: { required }
};

const v$ = useVuelidate(rules, taskData);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  
  try {
    const payload = {
      ...taskData,
      created_at: new Date().toISOString()
    };
    
    await taskStore.crearTarea(payload);
    router.push('/tasks');
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
};

onMounted(async () => {
  try {
    await projectStore.obtenerProyectos();
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
  }
});
</script>
