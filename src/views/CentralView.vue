<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import * as echarts from 'echarts';
import request from '@/utils/request';
import BlockComponent from '@/components/BlockComponent.vue';
import ChartOfLine from '@/components/ChartOfLine.vue';
import BlockPieComponent from '@/components/BlockPieComponent.vue';
</script>
<template>
  <!-- 这是根标签 -->
  <div class="wrapper">
    <div class="head">
      <BlockComponent :title="'今日订单总数'" :now="'2654'" :yesterday="'6542'" :percent="'-50%'"></BlockComponent>
      <BlockComponent :title="'今日销售总额'" :now="'2654'" :yesterday="'6542'" :percent="'-50%'"></BlockComponent>
      <BlockComponent :title="'今日退款笔数'" :now="'2654'" :yesterday="'6542'" :percent="'-50%'"></BlockComponent>
      <BlockComponent :title="'今日新增用户'" :now="'2654'" :yesterday="'6542'" :percent="'-50%'"></BlockComponent>
    </div>
    <div class="center" style="display: flex;justify-content: space-between;">
      <el-card shadow="always" style="width: 60%;margin-left: 10px;border-radius: 12px;">
        <h2>销售总额</h2>
        <ChartOfLine></ChartOfLine>
      </el-card>
      <el-card shadow="always" style="width: 30%;margin-right: 10px;border-radius: 12px;">
        <h2>商品总览</h2>
        <BlockPieComponent></BlockPieComponent>
      </el-card>
    </div>




  </div>
</template>
<style scoped>
.wrapper {

  width: 100%;


}

.head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>