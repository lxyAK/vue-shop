import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
// 导入菜单列表组件
import Users from '../components/user/Users.vue'
import Goodslist from '../components/goods/Goodslist.vue'
import Goodsclass from '../components/goods/Goodsclass.vue'
import Fenleicanshu from '../components/goods/Fenleicanshu.vue'
import Rights from '../components/Rightsmanagement/Rights.vue'
import Rolelist from '../components/Rightsmanagement/Rolelist.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/goodslist', component: Goodslist },
      { path: '/goodsclass', component: Goodsclass },
      { path: '/fenleicanshu', component: Fenleicanshu },
      { path: '/rights', component: Rights },
      { path: '/rolelist', component: Rolelist }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 拿到 sessionStorage 中的 token 做判断
  const tokenStr = sessionStorage.getItem('token')
  // console.log(tokenStr)
  // 判断 token 的值是否存在，不存在则表示用户没有登录
  if (!tokenStr) return next('/login')
  // 如果存在直接放行
  next()
})

export default router
