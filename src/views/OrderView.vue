<template>
  <div ><span>订单管理模块</span></div>
</template>

<script setup>
import { ref, reactive,onMounted, watchEffect, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 


</script>
<style scoped lang='less'>
</style>