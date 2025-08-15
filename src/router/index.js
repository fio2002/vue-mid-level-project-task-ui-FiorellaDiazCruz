import PoyectoList from '../views/ProjectList.vue';
import TaskList from '../views/TaskList.vue';
import ProjectForm from '../components/ProjectForm.vue';
import TaskForm from '../components/TaskForm.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: PoyectoList },
  { path: '/tasks', component: TaskList },
  { path: '/new-project', component: ProjectForm },
  { path: '/new-task', component: TaskForm }
];

export default createRouter({
    history: createWebHistory(),    
    routes
});