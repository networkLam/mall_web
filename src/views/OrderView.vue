<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <!-- 一共有四种状态 待发货 待签收 退款-->
      <el-tab-pane label="待发货" name="wait">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="下单日期" width="280">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon>
                  <timer />
                </el-icon>
                <span style="margin-left: 10px">{{ scope.row.time }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="180">
            <template #default="scope">
                  <el-tag>{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" width="180">
            <template #default="scope">
                  <el-tag>{{ scope.row.order_number }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                退单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待签收" name="sign">待签收</el-tab-pane>
      <el-tab-pane label="退款退货" name="refund">退款退货</el-tab-pane>
      <el-tab-pane label="Task" name="Task">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import type { OrderList } from '@/typemanual/typemian';
import { Timer } from '@element-plus/icons-vue'
import request from "@/utils/request"
import api from "@/utils/api";

const handleEdit = (index: number, row: OrderList) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: OrderList) => {
  console.log(index, row)
}

const tableData: OrderList[] =reactive([

]) 

/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
let status = "wait"
let offset = 30;

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  request(api.ORDERLIST + `?status=${status}&offset=${offset}`).then(res => {
    // console.log(res);
    const data = res.data.data as OrderList[];
    data.forEach((item,index)=>{
       tableData.push(item)
     
    })
    console.log(tableData)
    console.log(data)
  }).catch(res => {
    console.log(res);
  })
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 


const activeName = ref('wait')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  console.log(tab.props.name)

}

</script>
<style scoped lang='less'>
.wrapper {
  margin-left: 10px;
}
</style>