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
      
      <div class="card">
        <div class="card-body">
          <p class="text-muted mb-0">Aquí se mostrarán las tareas de los proyectos.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Lógica para cargar y mostrar tareas
</script>
