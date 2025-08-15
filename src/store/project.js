import { defineStore } from 'pinia';
import { apiProyects } from '../router/config.js';

export const useProjectStore = defineStore('project', {
    state: () => ({
        projects: [],
        loading: false,
        error: null
    }),
    
    getters: {
        getProjects: (state) => state.projects,
        isLoading: (state) => state.loading,
        getError: (state) => state.error
    },
    
    actions: {
        async obtenerProyectos() {
            try {
                this.loading = true;
                this.error = null;
                const { data } = await apiProyects.get('/projects');
                this.projects = data;
                return data;
            } catch (error) {
                this.error = error.message || 'Error al cargar proyectos';
                console.error('Error fetching projects:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async crearProyecto(payload) {
            try {
                this.loading = true;
                this.error = null;
                const { data } = await apiProyects.post('/project', payload);
                this.projects.unshift(data);
                return data;
            } catch (error) {
                this.error = error.message || 'Error al crear proyecto';
                console.error('Error creating project:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async actualizarProyecto(id, payload) {
            try {
                this.loading = true;
                this.error = null;
                const { data } = await apiProyects.put(`/project/${id}`, payload);
                const index = this.projects.findIndex(p => p.id === id);
                if (index !== -1) {
                    this.projects[index] = data;
                }
                return data;
            } catch (error) {
                this.error = error.message || 'Error al actualizar proyecto';
                console.error('Error updating project:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async eliminarProyecto(id) {
            try {
                this.loading = true;
                this.error = null;
                await apiProyects.delete(`/project/${id}`);
                this.projects = this.projects.filter(p => p.id !== id);
            } catch (error) {
                this.error = error.message || 'Error al eliminar proyecto';
                console.error('Error deleting project:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});