import { defineStore } from "pinia";
import { type Router } from "vue-router";
// const router = useRouter();

export const useNavigationTab = defineStore('navigation', {
  state: () => {
    return {
      navigationInfo: [] as { router: string, title: string }[],
      activeIndex:-1
    }
  },
  getters: {
    getNavigationInfo(state): { router: string, title: string }[] {
      return state.navigationInfo;
    },
    getActiveIndex(state){
      return state.activeIndex;
    }
  },
  actions: {
    //设置活动索引
    setActiveIndex(index:number){
      this.activeIndex = index;
    },
    //设置一个路由信息
    setNavigation(info: { router: string, title: string }) {
      // 检查这个路由是否已经存在
      const isExist = this.navigationInfo.some(item => item.router === info.router);
      if (!isExist) {
        // 如果不存在，则添加到navigationInfo数组中
        this.navigationInfo.push(info);
      } else {
        console.log('router is exist');
      }
    },
       //移除一个路由信息
    removeMeta(routeName: string, router: Router) {
        // 检查这个路由是否已经存在
      const index = this.navigationInfo.findIndex(item => item.router === routeName);
      if (index >= 0) {
        this.navigationInfo.splice(index, 1);
        //如果关闭的标签页索引等于当前活跃的标签页索引，那么当前活跃的标签页索引就往前推,并将页面导航到那个位置；
        if (index === this.activeIndex || this.activeIndex >= this.navigationInfo.length) {
          // 更新 activeIndex 到最后一个有效索引
          this.activeIndex = Math.max(0, this.navigationInfo.length - 1);
          if (this.navigationInfo.length > 0) {
            router.push(this.navigationInfo[this.activeIndex].router);
          } else {
            // 如果没有更多的路由项，你可以选择导航到一个默认路径或执行其他逻辑
            router.push('/home');
          }
        }
      } else {
        console.log('router not exist');
      }
    }
  }
});