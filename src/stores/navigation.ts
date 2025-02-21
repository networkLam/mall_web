import { defineStore } from 'pinia'
import { type Router, type RouteRecordRaw } from 'vue-router'

export const useNavigationTab = defineStore('navigation', {
  state: () => {
    return {
      navigationInfo: [] as { router: string; title: string }[],
      activeIndex: -1,
      //一开始就初始化这个路由，并将路由信息一起初始化进来，后面的所有关于路由的操作都通过storage的方式调用；
      router: null as any,
      allRouterInfo:null as any, //本次登录的全部路由信息；
    }
  },
  getters: {
    getNavigationInfo(state): { router: string; title: string }[] {
      return state.navigationInfo
    },
    getActiveIndex(state) {
      return state.activeIndex
    }
  },
  actions: {
    //设置活动索引
    setActiveIndex(index: number) {
      this.activeIndex = index
    },
    //设置一个路由信息
    setNavigation(info: { router: string; title: string }) {
      // 检查这个路由是否已经存在
      const isExist = this.navigationInfo.some((item) => item.router === info.router)
      if (!isExist) {
        // 如果不存在，则添加到navigationInfo数组中
        this.navigationInfo.push(info)
        // this.activeIndex = this.navigationInfo.length-1;
      } else {
        console.log('router is exist')
      }
      //找到这个路由在数组中的位置
      const routeLocal = this.navigationInfo.findIndex((item) => item.router === info.router)
      if (routeLocal !== -1) {
        // 如果找到了匹配的路由
        this.activeIndex = routeLocal
      }
    },
    //移除一个路由信息
    removeMeta(routeName: string, router: Router) {
      // 检查这个路由是否已经存在
      const index = this.navigationInfo.findIndex((item) => item.router === routeName)
      if (index >= 0) {
        this.navigationInfo.splice(index, 1)
        //如果关闭的标签页索引等于当前活跃的标签页索引，那么当前活跃的标签页索引就往前推,并将页面导航到那个位置；
        if (index === this.activeIndex || this.activeIndex >= this.navigationInfo.length) {
          // 更新 activeIndex 到最后一个有效索引
          this.activeIndex = Math.max(0, this.navigationInfo.length - 1)
          if (this.navigationInfo.length > 0) {
            router.push(this.navigationInfo[this.activeIndex].router)
          } else {
            // 如果没有更多的路由项，你可以选择导航到一个默认路径或执行其他逻辑
            router.push('/home')
          }
        }
      } else {
        console.log('router not exist')
      }
    },
    //将路由初始化
    setRouter(router:any){
      this.router = router;
    },
    //设置全部的路由信息；
    setRouterInfo(routerInfo:any){
      this.allRouterInfo = routerInfo;
      console.log("allRouterInfo",this.allRouterInfo)
    },
    //路由导航
    navigationTo(destination:string){
      const routeLocal = this.allRouterInfo.findIndex((item:any) => item.path === destination);
      //先把内容的组装
      this.routeChange(this.allRouterInfo[routeLocal])
      // console.log('要导航的路由在-->',routeLocal)
    },
    routeChange(toAnywhere: RouteRecordRaw){
      console.log(toAnywhere)
      //先跳转路由再generating tab
      if(this.router!=null){
        this.router.push(toAnywhere.path)
      }
      //实现tab标签导航
      if (toAnywhere.meta) {
          const temp = {
              title: typeof toAnywhere.meta.title === 'string' ? toAnywhere.meta.title : '暂无标题',
              router: toAnywhere.path
          };
          this.setNavigation(temp);
      }
  }
  }
})