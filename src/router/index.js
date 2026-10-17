import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '../views/landing/LandingView.vue'
import CallbackView from '../views/auth/CallbackView.vue'
import DashboardLayout from '../views/app/DashboardLayout.vue'
import HomeView from '../views/app/HomeView.vue'
import ServerLayout from '../views/app/server/ServerLayout.vue'
import ServerHomeView from '../views/app/server/ServerHomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/auth/callback', name: 'auth-callback', component: CallbackView },
    {
      path: '/app',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'app-home', component: HomeView },
        {
          path: 'server/:guildId',
          component: ServerLayout,
          children: [
            { path: '', name: 'server-home', component: ServerHomeView },
            // Nanti tambahkan rute /war, /members, dll di sini
          ]
        }
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('niki_token')
    if (!token) {
      next({ name: 'landing', query: { login: '1' } })
      return
    }
  }
  next()
})

export default router
