import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Games from '../views/Games.vue'
import Register from '../views/Register.vue'
import SingleGameView from '../views/SingleGameView.vue';
import SinglePublisherView from '../views/SinglePublisherView.vue';
import SingleCategoryView from '../views/SingleCategoryView.vue';
import CartView from '../views/CartView.vue';
import WishlistView from '../views/WishlistView.vue';
import SearchView from '../views/SearchView.vue';
import ReceiptsView from '../views/ReceiptsView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/games/:id',
    name: 'Game info',
    component: SingleGameView
  },
  {
    path: '/publishers/:id',
    name: 'Publisher games',
    component: SinglePublisherView
  },
  {
    path: '/categories/:id',
    name: 'Category games',
    component: SingleCategoryView
  },
  {
    path: '/cart',
    name: 'Your cart',
    component: CartView
  },
  {
    path: '/wishlist',
    name: 'Your wishlist',
    component: WishlistView
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/receipts',
    name: 'Receipts',
    component: ReceiptsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
