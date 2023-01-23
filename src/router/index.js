import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/Companies.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Users.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/department',
    name: 'department',
    component: () => import('../views/Departments.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import('../views/Employees.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('../views/Logs.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
