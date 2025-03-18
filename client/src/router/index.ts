import { createRouter, createWebHistory } from 'vue-router'
import { useUserSwitching } from '../models/useUserSwitching'
import AdminView from '../views/AdminView.vue'
import HomeView from '../views/HomeView.vue'
import MyActivity from '../views/MyActivity.vue'
import AboutView from '../views/AboutView.vue'
import FriendActivity from '../views/FriendActivity.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/my-activity', component: MyActivity },
  { path: '/about', component: AboutView },
  {
    path: '/admin',
    component: AdminView,
    beforeEnter: (to: any, from: any, next: (arg0: string | undefined) => void) => {
      const { hasPermission } = useUserSwitching()
      if (hasPermission('admin')) {
        next(undefined)
      } else {
        next('/')
      }
    },
  },
  { path: '/friend-activity', component: FriendActivity },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
