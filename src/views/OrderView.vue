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
              <el-tag >{{ state_compute(scope.row.state) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.order_number }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="价格(元)" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.money }}</el-tag>
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
      <el-tab-pane label="待签收" name="sign">
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
              <el-tag type="warning">{{ state_compute(scope.row.state) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.order_number }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="价格(元)" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.money }}</el-tag>
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
      <el-tab-pane label="退款退货" name="refund">
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
              <el-tag type="danger">{{ state_compute(scope.row.state) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.order_number }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="价格(元)" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.money }}</el-tag>
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
      <el-tab-pane label="交易完成" name="finish">
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
              <el-tag type="success">{{ state_compute(scope.row.state) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.order_number }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="价格(元)" width="180">
            <template #default="scope">
              <el-tag>{{ scope.row.money }}</el-tag>
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
    </el-tabs>
    <div class="pagin"><el-pagination background layout="prev, pager, next" :total="page_number" :default-page-size="10"
      v-model:current-page="currentPage" /></div>
    
    <el-dialog v-model="dialogVisible" title="编辑" width="500" :before-close="handleClose">
      <!-- 表单开始 -->
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="快递配送地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="待发货" value="wait" />
            <el-option label="待签收" value="sign" />
            <el-option label="退货退款" value="refund" />
            <el-option label="已完成" value="finish" />
          </el-select>
        </el-form-item>

        <el-form-item label="快递编号">
          <el-input v-model="form.exp_id" />
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="form.order_number"  disabled/>
        </el-form-item>
        <el-form-item label="总价格">
          <el-input v-model="form.money"  disabled/>
        </el-form-item>
        <el-form-item label="购买信息">
          <div v-for="(detail,index) in detail_arr" :key="index">
            <GridComponent :describe="detail.describe" :amount="detail.number" :price="detail.totals" :url="detail.url"></GridComponent>
          </div>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed, watch } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import type { OrderList, DetailList,OrderDetails,ProductList } from '@/typemanual/typemian';
import { Timer } from '@element-plus/icons-vue'
import request from "@/utils/request"
import api from "@/utils/api";
import GridComponent from '@/components/GridComponent.vue';
import {formatTime} from '@/utils/dateFormat'
const currentPageArr = reactive([1, 1, 1, 1]);//当前的页面(current page number)
const row_totalArr = reactive([0, 0, 0, 0]) //总行数(each page)
let point = 0;//定义一个指向（指向当前停留在那个页面
let page_number = ref(0)
let currentPage = ref(1)
const dialogVisible = ref(false)

const tableData: OrderList[] = reactive([

])

//点击编辑后的表单数据
const form = reactive<OrderList>({
  add_id: '',
  address: '',
  amount: '',
  contacts: '',
  exp_id: '',
  money: '',
  order_id: '',
  order_number: '',
  phone: '',
  state: '',
  time: ''
})
//提交表单
const onSubmit = () => {
  console.log('submit!')
  // console.log(form)
  const order = {...form};
  console.log(order)
  request({
    method:"post",
    data:order,
    url:api.ORDERUPDATE
  }).then(res=>{
    dialogVisible.value = false;
    //在页面更新
   tableData.forEach((item,index)=>{
    if(tableData[index].order_id == form.order_id){
      tableData[index].contacts = form.contacts;//联系人
      tableData[index].phone = form.phone; //手机
      tableData[index].address = form.address;//地址
      tableData[index].exp_id = form.exp_id;//快递号
      tableData[index].state = form.state; //状态
    }
   })

    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
}
//详细的列表清单
const detail_arr = reactive<DetailList[]>([]);


//点击编辑按钮
const handleEdit = (index: number, row: OrderList) => {
  console.log(index, row)
  detail_arr.length = 0;
  dialogVisible.value = true;
  form.address = tableData[index].address;
  form.money = tableData[index].money;
  form.exp_id = tableData[index].exp_id;
  form.contacts = tableData[index].contacts;
  form.state = tableData[index].state;
  form.order_number = tableData[index].order_number;
  form.phone = tableData[index].phone;
  form.order_id = tableData[index].order_id;
  //get order_id ,to go find details goods list;
  const id = row.order_id;
  // console.log(id)
  request(api.ORDERDETAIL + `?orderID=${id}`).then(res => {
    // console.log(res)
    //获取请求返回的数据
    const data = res.data.data as OrderDetails[];
    data.forEach((item,index)=>{
      const detail_obj = reactive<DetailList>({
      number: 0,
      totals: '',
      url: '',
      describe: '',
      pd_id: 0
    })
      detail_obj.number = data[index].number; //数量
      detail_obj.totals = data[index].totals; //价格
      detail_obj.pd_id = data[index].pd_id; //商品id
      detail_arr.push(detail_obj);
    })
    // console.log("组件要使用的数据")
    // console.log(detail_arr)
    detail_arr.forEach(async (item,index)=>{
     await request(api.PRODUCTINFO+`?pdId=${ detail_arr[index].pd_id}`).then(res=>{
      // console.log(res)
      const data = res.data.data as ProductList;
      detail_arr[index].url = "http://localhost:8080/upload/"+data.picture_name; //url地址
      detail_arr[index].describe = data.p_describe;
     })

    })
  }).catch(err => {
    console.log(err);
  })


}

const state_compute = (state:string):string=>{
  let res = ''
  switch(state){
    case 'wait':res = '待发货';break;
    case 'sign':res = '待签收';break;
    case 'refund':res = '退货退款';break;
    case 'finish':res = '完成交易';break;
  }
  return res;
}
//退单
const handleDelete = (index: number, row: OrderList) => {
  console.log("orderDel");
  console.log(index, row)
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}


/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
let choose_status = "wait"
let offset = 0;
//获取一共有多少条数据
const getTotal = async (status: string) => {
  await request(api.ORDERCOUNT + `?status=${status}`).then(res => {
    const data = res.data.data as number;
    page_number.value = data;
  }).catch(err => {
    console.log(err)
  })
}


const ViewInit = async (status: string, offset: number) => {
  await getTotal(status);
  tableData.length = 0;//列表数据清零
  await request(api.ORDERLIST + `?status=${status}&offset=${offset}`).then(res => {
    const data = res.data.data as OrderList[];
    data.forEach((item, index) => {
      item.time = formatTime(new Date(item.time));
      tableData.push(item)
    })
  }).catch(res => {
    console.log(res);
  })
}


onMounted(() => {
  ViewInit("wait", 0);
})

//活动的界面名称
const activeName = ref('wait')
//监听换页
watch(currentPage, () => {
  if (currentPage.value <= 1) {
    offset = 0;
  } else {
    offset = (currentPage.value - 1) * 10;
  }
  request(api.ORDERLIST + `?status=${choose_status}&offset=${offset}`).then(res => {
    const data = res.data.data as OrderList[];
    tableData.length = 0;
    data.forEach((item, index) => {
      tableData.push(item)
    })
    console.log(tableData)
  }).catch(err => {
    console.log("出错了",err);
  })
})
//切换标签页
const handleClick = (tab: TabsPaneContext, event: Event) => {
  tableData.length = 0;
  if (tab.props.name == "wait") {
    currentPage.value = 1;
    ViewInit("wait", 0);
    choose_status = "wait";
    console.log("choose wait")
  } else if (tab.props.name == "sign") {
    currentPage.value = 1;
    ViewInit("sign", 0);
    choose_status = "sign";
    console.log(tableData)
    console.log("choose sign")
  } else if (tab.props.name == "refund") {
    currentPage.value = 1;
    ViewInit("refund", 0);
    choose_status = "refund";
    console.log("choose refund")
  } else {
    currentPage.value = 1;
    ViewInit("finish", 0);
    choose_status = "finish";
    console.log("choose finish")
  }


}

</script>
<style scoped lang='less'>
.wrapper {
  margin-left: 10px;
}
.pagin{
  margin-top: 20px;
  margin-bottom: 40px;
 display: flex;
 justify-content: center;
}
</style>