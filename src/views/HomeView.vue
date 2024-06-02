<script setup lang="ts">
import HeadComponment from '../components/HeadComponment.vue'
import MenuComponent from '@/components/MenuComponent.vue';
import {useOnlogin} from '../stores/index'
const userName = useOnlogin().getUserName;
console.log("%centry home page","color:red;")
</script>

<template>
  <!-- 这是根标签 -->
  <div>
    <HeadComponment :name="userName"></HeadComponment>
    <div style="width:100%;"><MenuComponent></MenuComponent></div>
  </div>
</template>
