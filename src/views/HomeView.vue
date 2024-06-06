<script setup lang="ts">
import HeadComponment from '../components/HeadComponment.vue'
import MenuComponent from '@/components/MenuComponent.vue';
import {useOnlogin} from '../stores/index'
import {useRouter} from "vue-router"

const userName = useOnlogin().getUserName;
const Link = useOnlogin().getSrc;
console.log(Link)
const route = useRouter();
route.push("/central")
console.log("%centry home page","color:red;")


</script>
<template>
  <!-- 这是根标签 -->
  <div>
    <HeadComponment :name="userName" :src="Link"></HeadComponment>
    <div  class="content-menu"><MenuComponent></MenuComponent> <div  class="content-right"> <router-view></router-view>  </div></div>
    
  </div>
</template>

<style scoped lang="less">
.content-menu{
  margin-top: 10px;
  display: flex;
}
.content-right{
  width: 100%;
  float: right;
}
</style>
