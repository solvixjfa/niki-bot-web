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
import RewardsView from '../views/app/server/RewardsView.vue'
import AiAuditView from '../views/app/server/AiAuditView.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminServersView from '../views/admin/AdminServersView.vue'
import AdminOverviewView from '../views/admin/AdminOverviewView.vue'
import AdminBroadcastView from '../views/admin/AdminBroadcastView.vue'
import AdminRequestsView from '../views/admin/AdminRequestsView.vue'
import AiWarRoomView from '../views/app/server/AiWarRoomView.vue'
import CwlRosterView from '../views/app/server/CwlRosterView.vue'
import AiWarReportView from '../views/app/server/AiWarReportView.vue'
import AiReportView from '../views/app/server/AiReportView.vue'
import AiHistoryView from '../views/app/server/AiHistoryView.vue'

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
                { path: 'rewards', name: 'server-rewards', component: RewardsView },
              ]
            },

            // CAPITAL
            { path: 'capital', name: 'server-capital', component: CapitalView },
            { path: 'ai-audit', name: 'server-ai-audit', component: AiAuditView },
            
            { path: 'ai-war-room', name: 'server-ai-war-room', component: AiWarRoomView },
            { path: 'cwl-roster', name: 'server-cwl-roster', component: CwlRosterView },
            { path: 'ai-war-report', name: 'server-ai-war-report', component: AiWarReportView },
            { path: 'ai-report/:id', name: 'server-ai-report', component: AiReportView },
            { path: 'ai-history', name: 'server-ai-history', component: AiHistoryView },
          ]
        }
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', name: 'admin-dashboard', component: AdminOverviewView },
        { path: 'servers', name: 'admin-servers', component: AdminServersView },
        { path: 'requests', name: 'admin-requests', component: AdminRequestsView },
        { path: 'broadcast', name: 'admin-broadcast', component: AdminBroadcastView }
      ]
    }
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

router.afterEach((to, from) => {
  // Cuma track halaman /app/* dan /admin/*
  if (to.path.startsWith('/app') || to.path.startsWith('/admin')) {
    const token = localStorage.getItem('niki_token')
    const guildId = to.params.guildId || localStorage.getItem('niki_active_guild')
    
    fetch(`${import.meta.env.VITE_API_URL || 'https://clashofclansbot-production.up.railway.app'}/admin/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ path: to.path, guild_id: guildId })
    }).catch(() => {}) // Silent fail
  }
})
