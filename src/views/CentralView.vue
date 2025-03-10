<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from 'vue';
// import * as echarts from 'echarts';
import request from '@/utils/request';
import BlockComponent from '@/components/BlockComponent.vue';
import ChartOfLine from '@/components/ChartOfLine.vue';
import BlockPieComponent from '@/components/BlockPieComponent.vue';
import type { PanelData } from '@/typemanual/typemian';
interface ResponseBody {
  code: "0" | "1",
  data: PanelData,
  msg: string
}
let panelData = reactive<PanelData>({
  todaySale: 0,
  yesterdaySale: 0,
  todayOrder: 0,
  yesterdayOrder: 0,
  todayRefund: 0,
  yesterdayRefund: 0,
  todayNewUser: 0,
  yesterdayUser: 0,
  last7SalesVolume: {
    volume: [],
    dates: []
  },
  productState: {
    onSales: 0,
    NotSales: 0
  }
});
request({
  url: "/api/admin/panelData",
  method: "post"
}).then(res => {
  const data: ResponseBody = res.data;
  // panelData = ...data;
  Object.assign(panelData, data.data);
  console.log(panelData)
})
const percent = reactive({
  order: "",
  sale: "",
  refund: "",
  newUser: ""
})

const computeGrowthRate = (latestData: number, compare: number) => {
  if (compare != 0) {
    return ((latestData - compare) / compare * 100).toFixed(2);
  }
  return String(latestData);
}

console.log(computeGrowthRate(50, 25))

watch(panelData, (newVal, oldVal) => {
  console.log('被修改')
  percent.order = computeGrowthRate(panelData.todayOrder, panelData.yesterdayOrder);
  percent.sale = computeGrowthRate(panelData.todaySale, panelData.yesterdaySale);
  percent.refund = computeGrowthRate(panelData.todayRefund, panelData.yesterdayRefund);
  percent.newUser = computeGrowthRate(panelData.todayNewUser, panelData.yesterdayUser);

})

</script>
<template>
  <!-- 这是根标签 -->
  <div class="wrapper">
    <div class="head">
      <BlockComponent :title="'今日订单总数'" :now="String(panelData.todayOrder)"
        :yesterday="String(panelData.yesterdayOrder)" :percent="percent.order" />
      <BlockComponent :title="'今日销售总额'" :now="String(panelData.todaySale)" :yesterday="String(panelData.yesterdaySale)"
        :percent="percent.sale" />
      <BlockComponent :title="'今日退款笔数'" :now="String(panelData.todayRefund)"
        :yesterday="String(panelData.yesterdayRefund)" :percent="percent.refund" />
      <BlockComponent :title="'今日新增用户'" :now="String(panelData.todayNewUser)"
        :yesterday="String(panelData.yesterdayUser)" :percent="percent.newUser" />
    </div>
    <div class="center" style="display: flex;justify-content: space-between;">
      <el-card shadow="always" style="width: 62%;margin-left: 10px;border-radius: 12px;">
        <h2>销售总额</h2>
        <ChartOfLine :data="panelData.last7SalesVolume.volume" :date="panelData.last7SalesVolume.dates" />
      </el-card>
      <el-card shadow="always" style="width: 30%;margin-right: 10px;border-radius: 12px;">
        <h2>商品总览</h2>
        <BlockPieComponent :not-sales="panelData.productState.NotSales" :on-sales="panelData.productState.onSales"/>
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