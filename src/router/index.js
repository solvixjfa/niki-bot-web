import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '../views/landing/LandingView.vue'
import CallbackView from '../views/auth/CallbackView.vue'
import DashboardLayout from '../views/app/DashboardLayout.vue'
import HomeView from '../views/app/HomeView.vue'
import SettingsView from '../views/app/SettingsView.vue'

import ServerLayout from '../views/app/server/ServerLayout.vue'
import ServerHomeView from '../views/app/server/ServerHomeView.vue'

// War Group
import WarLayout from '../views/app/server/WarLayout.vue'
import WarView from '../views/app/server/WarView.vue'
import CwlView from '../views/app/server/CwlView.vue'
import RaceWarView from '../views/app/server/RaceWarView.vue'
import RaceCwlView from '../views/app/server/RaceCwlView.vue'
import ThCompositionView from '../views/app/server/ThCompositionView.vue'
import RecapWarView from '../views/app/server/RecapWarView.vue'
import RecapCwlView from '../views/app/server/RecapCwlView.vue'

// Members Group
import MembersLayout from '../views/app/server/MembersLayout.vue'
import MembersView from '../views/app/server/MembersView.vue'
import DonationsView from '../views/app/server/DonationsView.vue'
import InactiveView from '../views/app/server/InactiveView.vue'
import LeaderboardView from '../views/app/server/LeaderboardView.vue'
import CompareView from '../views/app/server/CompareView.vue'

// Capital
import CapitalView from '../views/app/server/CapitalView.vue'

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
        { path: 'settings', name: 'app-settings', component: SettingsView },
        {
          path: 'server/:guildId',
          component: ServerLayout,
          children: [
            { path: '', name: 'server-home', component: ServerHomeView },
            
            // WAR GROUP
            {
              path: 'war',
              component: WarLayout,
              children: [
                { path: '', redirect: to => `/app/server/${to.params.guildId}/war/status` },
                { path: 'status', name: 'server-war', component: WarView },
                { path: 'cwl', name: 'server-cwl', component: CwlView },
                { path: 'race', name: 'server-racewar', component: RaceWarView },
                { path: 'racecwl', name: 'server-racecwl', component: RaceCwlView },
                { path: 'thcomp', name: 'server-thcomp', component: ThCompositionView },
                { path: 'recap', name: 'server-recapwar', component: RecapWarView },
                { path: 'recap-cwl', name: 'server-recacpwl', component: RecapCwlView },
              ]
            },

            // MEMBERS GROUP
            {
              path: 'members',
              component: MembersLayout,
              children: [
                { path: '', redirect: to => `/app/server/${to.params.guildId}/members/list` },
                { path: 'list', name: 'server-members', component: MembersView },
                { path: 'donations', name: 'server-donations', component: DonationsView },
                { path: 'inactive', name: 'server-inactive', component: InactiveView },
                { path: 'leaderboard', name: 'server-leaderboard', component: LeaderboardView },
                { path: 'compare', name: 'server-compare', component: CompareView },
              ]
            },

            // CAPITAL
            { path: 'capital', name: 'server-capital', component: CapitalView },
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
