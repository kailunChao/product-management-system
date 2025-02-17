import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/Main/Main.vue'),
      children: [
        {
          path: '/main/overview/productOverview',
          component: () =>
            import('../views/Main/overview/ProductOverview/ProductOverview.vue')
        },
        {
          path: '/main/overview/systemOverview',
          component: () =>
            import('../views/Main/overview/SystemOverview/SystemOverview.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('../views/Main/system/User/User.vue')
        },
        {
          path: '/main/system/menu',
          component: () => import('../views/Main/system/Menu/Menu.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('../views/Main/system/Role/Role.vue')
        },

        {
          path: '/main/product/category',
          component: () =>
            import('../views/Main/product/ProductCategory/ProductCategory.vue')
        },
        {
          path: '/main/product/information',
          component: () =>
            import(
              '../views/Main/product/ProductInformation/ProductInformation.vue'
            )
        },
        {
          path: '/main/personal/userInfo',
          component: () =>
            import('../views/Main/personal/UserInfo/UserInfo.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFound/NotFound.vue')
    }
  ]
})

// /main页面守卫
router.beforeEach((to, _) => {
  const token = localStorage.getItem('token')
  if (to.path === '/main' && !token) return '/login'
  // 只有登录成功才能进入main页面
})

export default router
