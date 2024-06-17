import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: () => import('../layouts/AppLayout.vue'),
      children: [
        {
          path: "/procrastination",
          name: "procrastination",
          component: () => import("../views/home/MainPage.vue")
        }
      ]
    },

    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/auth/UserRegister.vue')
        },

        {
          path: "/login",
          name: "login",
          component: () => import("../views/auth/UserLogin.vue")
        }
      ]
    }

  ]
})

export default router
