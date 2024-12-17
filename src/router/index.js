// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Portfolio from '../views/Portfolio.vue';

const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: Portfolio,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
