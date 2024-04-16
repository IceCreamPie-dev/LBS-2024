import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/HomeView.vue'
import SideBarTestView from '../views/SideBarTestView.vue'
import QnAPostDetail from '@/components/QnAPostDetail.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/sidebartest',
    name: 'sidebartest',
    component: SideBarTestView
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  },
  {
    path: '/qna/:postId',
    name: 'QnAPostDetail',
    component: QnAPostDetail,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
