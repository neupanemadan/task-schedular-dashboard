import { createRouter, createWebHistory } from 'vue-router'
const AppLayout = () =>  import('@/components/AppLayout.vue')
const Home = () =>  import( '@/views/home/Index.vue')
const Login = () => import('@/views/login/index.vue')
const Signup = () => import('@/views/signup/index.vue')
const About = () => import('@/views/schedular/Index.vue')
const Users = () => import('@/views/users/Index.vue')

const routes = [
  {
    children: [
      {
        component: Home,
        name: 'home',
        path: '/home',
        meta: {
          requiresAuth: true,
          redirectOnExpire: true
        }
      },
      {
        component: Home,
        name: 'home',
        path: '/',
        meta: {
          requiresAuth: true,
          redirectOnExpire: true
        }
      },
      {
        component: Users,
        name: 'users',
        path: '/users',
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
          redirectOnExpire: true
        }
      },
      {
        component: About,
        name: 'schedular',
        path: '/schedular',
        meta: {
          requiresAuth: true,
          redirectOnExpire: true
        }
      },
    ],
    component: AppLayout,
    path: '/'
  },
  {
    component: Login,
    name: 'login',
    path: '/login'
  },
  {
    component: Signup,
    name: 'signup',
    path: '/signup'
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes: routes
})

export default router