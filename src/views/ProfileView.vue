<script lang="ts" setup>
import {reactive,ref,onMounted,onBeforeMount} from "vue";
import axios from "axios";
const text = ref("个人信息界面");
onBeforeMount(()=>{
  
})

</script>
<template>
    <!-- 这是根标签 -->
    <div class="wrapper">   
       <span>{{text}}</span>
    </div>
  </template>
<style scoped> 
.wrapper{
display: flex;
}
</style>