<script setup lang="ts">
import HeadComponment from '../components/HeadComponment.vue'
import MenuComponent from '@/components/MenuComponent.vue';
// import tabsComponent from '@/components/tabsComponent.vue';
import tabsComponent from '@/components/TabsComponent.vue';
import { useOnlogin } from '../stores/index'
import { useRouter } from "vue-router"
import {ref, watch} from 'vue'
import { useNavigationTab } from '@/stores/navigation';
import router from '../router/index'
const userName = useOnlogin().getUserName;
const Link = useOnlogin().getSrc;
console.log(Link)
const route = useRouter();
route.push("/central")
console.log("%centry home page", "color:red;")
const tabs = useNavigationTab();

</script>
<template>
  <!-- 这是根标签 -->
  <div>
    <HeadComponment :name="userName" :src="Link"></HeadComponment>
    <div class="content-menu">
      <MenuComponent></MenuComponent>
      <div class="content-right"> 
        <tabsComponent :items="tabs.getNavigationInfo"></tabsComponent>
        <router-view></router-view> 
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
