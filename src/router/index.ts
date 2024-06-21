import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //路由重定向
      path: '/',
      redirect:"/login"
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        title:"登录"
      }
    },
    {
      path:"/home",
      name : "home",
      component : HomeView,
      meta:{
        title:"主页"
      },
      children:[
        {
          path: '/central',
          name: 'central',
          meta:{
            title:"控制面板"
          },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/CentralView.vue')
        },
        {
          //
          path: '/profile',
          name: 'profile',
          meta:{
            title:"个人信息"
          },
          
          component: () => import('../views/ProfileView.vue')
        },
        {
          //
          path: '/log',
          name: 'log',
          meta:{
            title:"操作日志"
          },
          component: () => import('../views/LogView.vue')
        },
        {
          //
          path: '/product',
          name: 'product',
          meta:{
            title:"商品管理"
          },
          component: () => import('../views/ProductView.vue')
        },
        {
          //
          path: '/order',
          name: 'order',
          meta:{
            title:"订单管理"
          },
          component: () => import('../views/OrderView.vue')
        },
        {
          //
          path: '/user',
          name: 'user',
          meta:{
            title:"用户管理"
          },
          component: () => import('../views/UserView.vue')
        },
      ]
    },
  
  ]
})

router.beforeEach(async (to,from,next)=>{
  if(to.meta.title){
    //修改标题
    document.title = to.meta.title as string;
  }

  if(to.path == '/login' ){
    next();
  }else{
    const token = localStorage.getItem('token') == null ? null : localStorage.getItem('token') ;
    if(token == null){
      alert("你还未登录，即将返回登录界面");
      next('/login');
    }else{
      next();
    }
    
  }
})

export default router
