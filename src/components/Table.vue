<template>
  <div class="card shadow-sm">
    <div class="card-body p-0">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2 text-muted">Cargando datos...</p>
      </div>

      <!-- Table content -->
      <div v-else>
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th 
                  v-for="column in columns" 
                  :key="column.key" 
                  class="px-3 py-3 text-start fw-semibold text-muted border-0"
                  scope="col"
                >
                  <i v-if="column.icon" :class="column.icon + ' me-1'"></i>
                  {{ column.label }}
                </th>
                <th class="px-3 py-3 text-center fw-semibold text-muted border-0" scope="col">
                  <i class="fas fa-cogs me-1"></i>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Empty state -->
              <tr v-if="!rows || rows.length === 0">
                <td :colspan="columns.length + 1" class="text-center py-5">
                  <div class="text-muted">
                    <i class="fas fa-inbox fa-2x mb-3 d-block"></i>
                    <p class="mb-0">No hay datos disponibles</p>
                    <small>Los datos aparecerán aquí cuando estén disponibles</small>
                  </div>
                </td>
              </tr>

              <!-- Data rows -->
              <tr 
                v-for="row in rows" 
                :key="row.id" 
                class="border-bottom"
              >
                <td 
                  v-for="column in columns" 
                  :key="column.key" 
                  class="px-3 py-3 align-middle"
                >
                  <!-- Status badge -->
                  <span 
                    v-if="column.type === 'status'" 
                    :class="getStatusClass(row[column.key])"
                    class="badge"
                  >
                    {{ row[column.key] }}
                  </span>
                  
                  <!-- Priority badge -->
                  <span 
                    v-else-if="column.type === 'priority'" 
                    :class="getPriorityClass(row[column.key])"
                    class="badge"
                  >
                    {{ row[column.key] }}
                  </span>
                  
                  <!-- Date formatting -->
                  <span v-else-if="column.type === 'date'">
                    {{ formatDate(row[column.key]) }}
                  </span>
                  
                  <!-- Default text -->
                  <span v-else class="text-body">
                    {{ row[column.key] }}
                  </span>
                </td>
                
                <!-- Actions column -->
                <td class="px-3 py-3 text-center align-middle">
                  <div class="btn-group btn-group-sm" role="group">
                    <button 
                      @click="$emit('edit', row)" 
                      class="btn btn-outline-primary btn-sm"
                      title="Editar"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      @click="$emit('remove', row)" 
                      class="btn btn-outline-danger btn-sm"
                      title="Eliminar"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Error message -->
        <div v-if="error" class="alert alert-danger m-3" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['edit', 'remove']);

const getStatusClass = (status) => {
  const statusClasses = {
    'active': 'bg-success text-white',
    'inactive': 'bg-secondary text-white',
    'pending': 'bg-warning text-dark',
    'pendiente': 'bg-warning text-dark',
    'en progreso': 'bg-info text-white',
    'hecho': 'bg-success text-white',
    'completed': 'bg-info text-white',
    'cancelled': 'bg-danger text-white'
  };
  return statusClasses[status?.toLowerCase()] || 'bg-secondary text-white';
};

const getPriorityClass = (priority) => {
  const priorityClasses = {
    'alta': 'bg-danger text-white',
    'media': 'bg-warning text-dark',
    'baja': 'bg-success text-white',
    'high': 'bg-danger text-white',
    'medium': 'bg-warning text-dark',
    'low': 'bg-success text-white'
  };
  return priorityClasses[priority?.toLowerCase()] || 'bg-secondary text-white';
};

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>

<style scoped>
.table th {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table td {
  font-size: 0.9rem;
}

.btn-group .btn {
  border-radius: 0.375rem;
  margin: 0 1px;
}

.btn-group .btn:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.badge {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .btn-group {
    flex-direction: column;
  }
  
  .btn-group .btn {
    margin: 1px 0;
  }
}
</style>