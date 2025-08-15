import { defineStore } from 'pinia';
import { apiProyects } from '../router/config.js';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [],
        loading: false,
        error: null
    }),
    
    getters: {
        getTasks: (state) => state.tasks,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
        
        // Filtros dinámicos
        getTasksByProject: (state) => (projectId) => {
            return state.tasks.filter(task => task.project_id === projectId);
        },
        
        getTasksByStatus: (state) => (status) => {
            return state.tasks.filter(task => task.status === status);
        },
        
        getTasksByPriority: (state) => (priority) => {
            return state.tasks.filter(task => task.priority === priority);
        }
    },
    
    actions: {
        async obtenerTareas() {
            try {
                this.loading = true;
                this.error = null;
                const { data } = await apiProyects.get('/tasks');
                this.tasks = data;
                return data;
            } catch (error) {
                this.error = error.message || 'Error al cargar tareas';
                console.error('Error fetching tasks:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async crearTarea(payload) {
            try {
                this.loading = true;
                this.error = null;
                const { data } = await apiProyects.post('/tasks', payload);
                this.tasks.unshift(data);
                return data;
            } catch (error) {
                this.error = error.message || 'Error al crear tarea';
                console.error('Error creating task:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async actualizarTarea(id, payload) {
            try {
                this.loading = true;
                this.error = null;
                const { data } = await apiProyects.put(`/tasks/${id}`, payload);
                const index = this.tasks.findIndex(t => t.id === id);
                if (index !== -1) {
                    this.tasks[index] = data;
                }
                return data;
            } catch (error) {
                this.error = error.message || 'Error al actualizar tarea';
                console.error('Error updating task:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async eliminarTarea(id) {
            try {
                this.loading = true;
                this.error = null;
                await apiProyects.delete(`/tasks/${id}`);
                this.tasks = this.tasks.filter(t => t.id !== id);
            } catch (error) {
                this.error = error.message || 'Error al eliminar tarea';
                console.error('Error deleting task:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});
