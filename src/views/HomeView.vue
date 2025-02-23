<script setup lang="ts">
import HeadComponment from '../components/HeadComponment.vue'
import MenuComponent from '@/components/MenuComponent.vue';
// import tabsComponent from '@/components/tabsComponent.vue';
import tabsComponent from '@/components/TabsComponent.vue';
import { useOnlogin } from '../stores/index'
import { useRouter, type RouteRecordRaw } from "vue-router"
import { ref, watch, type Ref } from 'vue'
import { useNavigationTab } from '@/stores/navigation';
import router from '../router/index'
const userName = useOnlogin().getUserName;
const Link = useOnlogin().getSrc;
console.log(Link)
const Router = useRouter();
// route.push("/central")
// console.log("%centry home page", "color:red;")
//将路由信息初始化
const tabs = useNavigationTab();

//got it all route information
const routerInfoAll = router.options.routes;
//返回home路由所在的索引位置
function matchHomePath(routerInfo: readonly RouteRecordRaw[]): number {
  for (let i = 0; i < routerInfo.length; i++) {
    if (routerInfo[i].path === '/home') {
      return i;
    }
  }
  return -1;
}

//找出找出home路由下面的子路由
function findChildren(routerInfo: readonly RouteRecordRaw[]): Ref<any[]> {
  const res = ref<any[]>([]);
  const index = matchHomePath(routerInfo);
  //确保存在children属性
  if (index != -1 && routerInfo[index]?.children) {
    const children = routerInfo[index].children;
    if (children) { // 这里确保了children不是undefined
      for (let i = 0; i < children.length; i++) {
        // const show = children[i].meta!.show;
        // if (show === true) {
        res.value.push(children[i]);
        // }
      }
    }
  }
  return res;
}

const childrenRouter = findChildren(routerInfoAll)

tabs.setRouterInfo(childrenRouter);
tabs.setRouter(Router);


</script>
<template>
  <!-- 这是根标签 -->
  <div>
    <HeadComponment :name="userName" :src="Link"></HeadComponment>
    <div class="content-menu">
      <MenuComponent></MenuComponent>
      <div class="content-right">
        <tabsComponent :items="tabs.getNavigationInfo"></tabsComponent>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
        <!-- <keep-alive>
          <router-view></router-view>
        </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content-menu {
  margin-top: 10px;
  display: flex;
}

.content-right {
  width: 100%;
  float: right;
}
</style>
