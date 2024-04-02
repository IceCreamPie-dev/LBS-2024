import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/HomeView.vue'
import SideBarTestView from '../views/SideBarTestView.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: import('../views/RegisterView.vue')
  },
  {
    path: '/sidebartest',
    name: 'sidebartest',
    component: SideBarTestView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: import('../components/MyPage.vue') ,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
