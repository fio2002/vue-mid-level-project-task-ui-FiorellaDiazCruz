<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isActive = computed(() => (path) => {
  return route.path === path;
});
</script>

<template>
  <!-- Navbar principal -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <!-- Logo/Brand -->
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="fas fa-project-diagram me-2"></i>
        Gestión de Proyectos
      </router-link>

      <!-- Botón hamburguesa para móviles -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarMain" 
        aria-controls="navbarMain" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Contenido del navbar -->
      <div class="collapse navbar-collapse" id="navbarMain">
        <!-- Navegación principal -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              :class="{ 'active': isActive('/') }"
              to="/"
            >
              <i class="fas fa-list me-1"></i>
              Proyectos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              :class="{ 'active': isActive('/tasks') }"
              to="/tasks"
            >
              <i class="fas fa-tasks me-1"></i>
              Tareas
            </router-link>
          </li>
        </ul>

        <!-- Menú de acciones -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i class="fas fa-plus me-1"></i>
              Crear Nuevo
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/new-project">
                  <i class="fas fa-folder-plus me-2"></i>
                  Nuevo Proyecto
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/new-task">
                  <i class="fas fa-plus-circle me-2"></i>
                  Nueva Tarea
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Contenido principal -->
  <main class="container-fluid py-4">
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.navbar-brand {
  font-size: 1.25rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.8) !important;
}

.nav-link.active {
  color: #fff !important;
  font-weight: 600;
}

.dropdown-item {
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .navbar-nav {
    margin-top: 1rem;
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: none;
  }
}
</style>
