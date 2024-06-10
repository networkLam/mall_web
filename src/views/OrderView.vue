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
                  <el-tag>{{ scope.row.state }}</el-tag>
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
                  <el-tag>{{ scope.row.state }}</el-tag>
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
                  <el-tag>{{ scope.row.state }}</el-tag>
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
    <el-pagination background layout="prev, pager, next" :total="page_number"
    :default-page-size="10" v-model:current-page="currentPage" />
    <el-dialog
    v-model="dialogVisible"
    title="编辑"
    width="500"
    :before-close="handleClose">
    <!-- 表单开始 -->
    <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="快递配送地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="联系人">
      <el-input v-model="form.contacts" />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="form.state" placeholder="请选择状态">
        <el-option label="待发货" value="wait" />
        <el-option label="代签收" value="sign" />
        <el-option label="退货退款" value="refund" />
        <el-option label="已完成" value="finish" />
      </el-select>
    </el-form-item>
    
    <el-form-item label="快递编号">
      <el-input v-model="form.exp_id" />
    </el-form-item>
    <el-form-item label="订单编号">
      <el-input v-model="form.order_number" />
    </el-form-item>
    <el-form-item label="总价格">
      <el-input v-model="form.money" />
    </el-form-item>
    <!-- <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item> -->
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item> -->
    <el-form-item label="购买信息">
      <div>
        <GridComponent :describe="'假装这里有描述假装这里有描述假装这里有描述假装这里'" :amount="6" :price="'9999'"></GridComponent>
      </div>
    </el-form-item>

  </el-form>
    <!-- 表单结束 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed,watch } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import type { OrderList } from '@/typemanual/typemian';
import { Timer } from '@element-plus/icons-vue'
import request from "@/utils/request"
import api from "@/utils/api";
import GridComponent from '@/components/GridComponent.vue';
const currentPageArr = reactive([1,1,1,1]);//当前的页面(current page number)
const row_totalArr = reactive([0,0,0,0]) //总行数(each page)
let point = 0 ;//定义一个指向（指向当前停留在那个页面
let page_number = ref(0)
let currentPage =ref(1)
const dialogVisible = ref(false)
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
}


const handleEdit = (index: number, row: OrderList) => {
  console.log(index, row)
  dialogVisible.value = true;
  form.address = tableData[index].address;
  form.money = tableData[index].money;
  form.exp_id = tableData[index].exp_id;
  form.contacts = tableData[index].contacts;
  form.state = tableData[index].state;
  form.order_number = tableData[index].order_number;
}

const handleDelete = (index: number, row: OrderList) => {
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
let choose_status = "wait"
let offset = 0;
//获取一共有多少条数据
const getTotal = async (status:string)=>{
  await request(api.ORDERCOUNT+`?status=${status}`).then(res=>{
    const data = res.data.data as number;
    page_number.value = data;
  }).catch(err=>{
    console.log(err)
  })
}


const ViewInit = async (status:string,offset:number)=>{
  await getTotal(status);
  tableData.length = 0;//列表数据清零
  await request(api.ORDERLIST + `?status=${status}&offset=${offset}`).then(res => {
    const data = res.data.data as OrderList[];
    data.forEach((item,index)=>{
       tableData.push(item)
    })
  }).catch(res => {
    console.log(res);
  })
}


onMounted(() => {
  ViewInit("wait",0);
})

//活动的界面名称
const activeName = ref('wait')

watch(currentPage,()=>{
  if(currentPage.value <= 1){
    offset = 0;
  }else{
    offset = (currentPage.value-1) * 10;
  }
  request(api.ORDERLIST + `?status=${choose_status}&offset=${offset}`).then(res => {
    const data = res.data.data as OrderList[];
    tableData.length = 0;
    data.forEach((item,index)=>{
       tableData.push(item)
    })
    console.log(tableData)
  }).catch(res => {
    console.log(res);
  })
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  if(tab.props.name == "wait"){
   // getTotal("wait");
   //tableData.length = 0;
    currentPage.value = 1;
    ViewInit("wait",0);
    choose_status = "wait";
    console.log("choose wait")
  }else if(tab.props.name == "sign"){
    //getTotal("sign");
    currentPage.value = 1;
    ViewInit("sign",0);
    choose_status = "sign";
    console.log(tableData)
    console.log("choose sign")
  }else if(tab.props.name == "refund"){
    //getTotal("refund");
    currentPage.value = 1;
    ViewInit("refund",0);
    choose_status = "refund";
    console.log("choose refund")
  }else {
    //getTotal("finish");
    currentPage.value = 1;
    ViewInit("finish",0);
    choose_status = "finish";
    console.log("choose finish")
  }
  

}

</script>
<style scoped lang='less'>
.wrapper {
  margin-left: 10px;
}
</style>