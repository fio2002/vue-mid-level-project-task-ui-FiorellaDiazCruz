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
      
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="taskTitle" class="form-label">Título de la Tarea</label>
              <input type="text" class="form-control" id="taskTitle" required>
            </div>
            
            <div class="mb-3">
              <label for="taskDescription" class="form-label">Descripción</label>
              <textarea class="form-control" id="taskDescription" rows="3"></textarea>
            </div>
            
            <div class="mb-3">
              <label for="taskProject" class="form-label">Proyecto</label>
              <select class="form-select" id="taskProject">
                <option value="">Seleccionar proyecto...</option>
              </select>
            </div>
            
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-save me-1"></i>
                Guardar Tarea
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
// Lógica para crear nueva tarea
</script>
