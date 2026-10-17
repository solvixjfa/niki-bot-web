import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '../views/landing/LandingView.vue'
import CallbackView from '../views/auth/CallbackView.vue'
import DashboardLayout from '../views/app/DashboardLayout.vue'
import HomeView from '../views/app/HomeView.vue'
import AccountView from '../views/app/AccountView.vue'
import ServerLayout from '../views/app/server/ServerLayout.vue'
import ServerHomeView from '../views/app/server/ServerHomeView.vue'
import WarView from '../views/app/server/WarView.vue'
import MembersView from '../views/app/server/MembersView.vue'
import CwlView from '../views/app/server/CwlView.vue'
import DonationsView from '../views/app/server/DonationsView.vue'
import InactiveView from '../views/app/server/InactiveView.vue'
import CapitalView from '../views/app/server/CapitalView.vue'
import LeaderboardView from '../views/app/server/LeaderboardView.vue'
import RaceWarView from '../views/app/server/RaceWarView.vue'

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
        { path: 'account', name: 'app-account', component: AccountView },
        {
          path: 'server/:guildId',
          component: ServerLayout,
          children: [
            { path: '', name: 'server-home', component: ServerHomeView },
            { path: 'war', name: 'server-war', component: WarView },
            { path: 'cwl', name: 'server-cwl', component: CwlView },
            { path: 'donations', name: 'server-donations', component: DonationsView },
            { path: 'inactive', name: 'server-inactive', component: InactiveView },
            { path: 'members', name: 'server-members', component: MembersView },
            { path: 'capital', name: 'server-capital', component: CapitalView },
            { path: 'leaderboard', name: 'server-leaderboard', component: LeaderboardView },
            { path: 'racewar', name: 'server-racewar', component: RaceWarView },
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
