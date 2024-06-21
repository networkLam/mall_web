<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="商品日志" name="product">
        <div style="display: flex;justify-content: center">
          <div class="infinite-list">
            <div class="infinite-list-item" v-for="(data, index) in data_list" :key="index">
              <span>管理员：</span>
              <span>{{ data.name }}</span>
              <span>&nbsp;>> </span>
              <span> {{ '对' }}</span>
              <span>编号为:</span>
              <span> {{ data.target }}</span>
              <span>的商品</span>
              <span>发起了更新操作</span>
              <span>在</span>
              <span> {{ data.time }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="订单日志" name="order">
        <div style="display: flex;justify-content: center">
          <div class="infinite-list">
            <div class="infinite-list-item" v-for="(data, index) in data_list" :key="index">
              <span>管理员：</span>
              <span>{{ data.name }}</span>
              <span>&nbsp;>> </span>
              <span> {{ '对' }}</span>
              <span>编号为:</span>
              <span> {{ data.target }}</span>
              <span>的订单</span>
              <span>发起了更新操作</span>
              <span>在</span>
              <span> {{ data.time }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination background layout="prev, pager, next" :total="count"
      style="display: flex;justify-content: center;margin-top: 20px;margin-bottom: 40px;" :default-page-size="10"
      v-model:current-page="currentPage" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { LogInfoShow } from '@/typemanual/typemian';
import request from '@/utils/request';
import api from '@/utils/api';
import type { TabsPaneContext } from 'element-plus'
//show the data
const data_list = reactive<LogInfoShow[]>([]);
const currentPage = ref(1);
const count = ref(0)//总的页数
let offset = 0;
let activity_view = ref("product")
watch(currentPage, () => {
  // console.log(currentPage)
  if (currentPage.value <= 1) {
    offset = 0;
  } else {
    offset = (currentPage.value - 1) * 10;
  }
  if (activity_view.value == 'product') {
    //获取商品日志的总行数
    getProductData_count();
    request(api.LOGINFO + `?start=${offset}`).then(res => {
      // console.log(res.data)
      const { data } = res.data
      data_list.length = 0;//在請求到數據之前清零展示的列表
      data.forEach((item: any) => {
        request(api.MANAGEINFO + `?id=${item.m_id}`).then(res => {
          let { name } = res.data.data;
          const temp: LogInfoShow = {
            name: '',
            action: '',
            target: '',
            time: ''
          }
          temp.name = name;
          temp.action = item.actions;
          temp.target = item.pd_id;
          temp.time = item.time;
          data_list.push(temp)
        })
      })
    })

  } else {
    getOrderData_count();
    //  订单日志
    request(api.LOGORDER + `?start=${offset}`).then(res => {
      // console.log(res.data)
      const { data } = res.data
      // console.log(data)
      data_list.length = 0;//在請求到數據之前清零展示的列表
      data.forEach((item: any) => {
        request(api.MANAGEINFO + `?id=${item.m_id}`).then(res => {
          let { name } = res.data.data;
          const temp: LogInfoShow = {
            name: '',
            action: '',
            target: '',
            time: ''
          }
          temp.name = name;
          temp.action = item.actions;
          temp.target = item.order_number;
          temp.time = item.time;
          data_list.push(temp)
          // console.log(temp)
        })
      })
    })
  }
})


onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  tabClickInit('product');
})
//點擊切換頁時的初始化
const tabClickInit = (tabName: string) => {
  if (tabName == 'product') {
    getProductData_count();
    request(api.LOGINFO + "?start=0").then(res => {
      /** 
       * 申请数据
      */
      const data = res.data.data as any[];
      data.forEach(async (item, index) => {
        // let temp_name = '',temp_order_number = '';
        await request(api.MANAGEINFO + `?id=${item.m_id}`).then(res => {
          let { name } = res.data.data;
          const temp: LogInfoShow = {
            name: '',
            action: '',
            target: '',
            time: ''
          }
          temp.name = name;
          temp.action = item.actions;
          temp.target = item.pd_id;
          temp.time = item.time;
          data_list.push(temp)
        })
      })
    })
  }else{
    getOrderData_count();
    //  订单日志
    data_list.length = 0;//在請求到數據之前清零展示的列表
    request(api.LOGORDER + `?start=0`).then(res => {
      // console.log(res.data)
      const { data } = res.data
      // console.log(data)
      data.forEach( async (item: any) => {
        await  request(api.MANAGEINFO + `?id=${item.m_id}`).then(res => {
          let { name } = res.data.data;
          const temp: LogInfoShow = {
            name: '',
            action: '',
            target: '',
            time: ''
          }
          temp.name = name;
          temp.action = item.actions;
          temp.target = item.order_number;
          temp.time = item.time;
          data_list.push(temp)
          // console.log(temp)
        })
      })
    })

  }

}

const getProductData_count = () => {
  request(api.GETLOGTOTAL).then(res => {
    // console.log(res);
    const { data } = res.data;
    // console.log(data);
    //刷新总页数
    count.value = data;
  })
}

const getOrderData_count = () => {
  request(api.LOGORDERCOUNT).then(res => {
    // console.log(res);
    const { data } = res.data;
    // console.log(data);
    //刷新总页数
    count.value = data;
  })
}

//默认活动界面
const activeName = ref('product')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activity_view.value = tab.props.name as string;
  currentPage.value = 1;//刷新當前页码
  // console.log(activity_view.value);
  data_list.length = 0;
  tabClickInit(activity_view.value);
}

</script>
<style scoped lang='less'>
.wrapper {
  margin-left: 10px;
}


.demo-tabs>.el-tabs__content {
  padding: 30px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.infinite-list {
  width: 900px;
  /* 确保与模板中的style保持一致 */
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  /* 确保可滚动 */
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  background: var(--el-color-primary-light-9);
  margin: 5px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 6px;
}
</style>