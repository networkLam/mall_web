<script lang="ts" setup>
import PoleComponent from '@/components/PoleComponent.vue';
import GaugeComponent from '@/components/GaugeComponent.vue';
</script>
<template>
    <!-- 这是根标签 -->
    <div class="wrapper">   
        <div>
        <PoleComponent></PoleComponent>
            </div>
            <div>   
                <GaugeComponent></GaugeComponent>
            </div>

    </div>
  </template>
<style scoped> 
.wrapper{
display: flex;
}
</style>