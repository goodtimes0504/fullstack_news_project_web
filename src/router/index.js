import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Product from '../views/Product.vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NewsDetail from '@/views/NewsDetail.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: NewsDetail
  }



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  nProgress.start()
  next()

})
router.afterEach(() => {
  nProgress.done()
  // next()

})

export default router
