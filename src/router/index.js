import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Itemize = () => import('views/itemize/Itemize')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/itemize',
    name: 'Itemize',
    component: Itemize
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/itemize',
    name: 'Itemize',
    component: Itemize
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
