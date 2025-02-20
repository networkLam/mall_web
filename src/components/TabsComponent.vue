<template>
  <div class="wrapper">
    <div style="width: 180px;height: 30px;background:green;margin: 4px;;" v-for="(item, index) in props.items"
      :key="index" @click="getRoute(item.router, index)">
      <div style="display: flex;">
        <div>{{ item.title }}</div>
        <div @click.stop="closeRouter(item.router)" style="margin-left: 5px;;">X</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavigationTab } from "../stores/navigation"
interface RouterStr {
  title: string;
  router: string;
}

// 定义一个接口，用于描述传入的 props 结构
interface ComponentProps {
  items: RouterStr[];
}
const tabs = useNavigationTab();
// 使用 defineProps 来接收符合上面接口定义的 props
const props = defineProps<ComponentProps>();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();

const getRoute = (e: string, index: number) => {
  console.log(e)
  tabs.setActiveIndex(index)
  // console.log(index)
  router.push(e)
}

const closeRouter = (e: string) => {
  // console.log('test1', e)
  tabs.removeMeta(e,router)
}

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})

</script>
<style scoped lang='less'>
.wrapper {
  display: flex;
}
</style>