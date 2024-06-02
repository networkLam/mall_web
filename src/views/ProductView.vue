<template>
  <div class="wrapper"><span>商品管理模块</span></div>
</template>

<script setup>
import { ref, reactive,onMounted, watchEffect, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
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


</script>
<style scoped lang='less'>
</style>