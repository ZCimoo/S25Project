import { isAdmin } from '@/models/session'
import { createRouter, createWebHistory } from 'vue-router'

import AdminView from '../views/AdminView.vue'
import HomeView from '../views/HomeView.vue'
import MyActivity from '../views/MyActivity.vue'
import AboutView from '../views/AboutView.vue'
import FriendActivity from '../views/FriendActivity.vue'

const routes = [
  { path: '/api/v1/home', component: HomeView },
  { path: '/api/v1/my-activity', component: MyActivity },
  { path: '/api/v1/about', component: AboutView },
  {
    path: '/admin',
    component: AdminView,
    beforeEnter: (to: any, from: any, next: (arg0: string | undefined) => void) => {
      if (isAdmin()) {
        next(undefined)
      } else {
        next('/')
      }
    },
  },
  { path: '/api/v1/friend-activity', component: FriendActivity },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
