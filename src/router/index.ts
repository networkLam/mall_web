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
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/TestView.vue')
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
