<template>
  <div class="wrapper">
    <el-card>
      <div v-show="newOrders"
        style="width: 100%; height: 28px; color: #00aeec; font-size: 16px; text-align: center; line-height: 28px; border: 1px solid #e6e6e6; border-radius: 10px; box-shadow: rgba(50, 50, 93, 0.11) 4px 3px 6px, rgba(0, 0, 0, 0.08) 0px 1px 3px;; background-color: rgb(255 255 255);">
        <span style="cursor: pointer;" @click="getlatestOrder">有新订单,点击刷新</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 一共有四种状态 待发货 待签收 退款-->
        <el-tab-pane label="待发货" name="wait">
          <el-table :data="tableData">
            <el-table-column label="下单日期" width="280">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-icon>
                    <timer />
                  </el-icon>
                  <span style="margin-left: 10px">{{ dayjs(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
              <template #default="scope">
                <el-tag>{{ state_compute(scope.row.state) }}</el-tag>
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
            <el-table-column label="操作" width="190">
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
            <el-table-column label="操作" width="190">
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
            <el-table-column label="操作" width="190">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                  编辑
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
            <el-table-column label="操作" width="190">
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
        <el-tab-pane label="查找" name="search">
          <h2>wait development</h2>
          <!-- <el-table :data="tableData" style="width: 100%">
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
            <el-table-column label="操作" width="190">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                  编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  退单
                </el-button>
              </template>
            </el-table-column>
          </el-table> -->
        </el-tab-pane>
      </el-tabs>

      <div class="pagin"><el-pagination background layout="prev, pager, next" :total="page_number"
          :default-page-size="10" v-model:current-page="currentPage" /></div>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑" width="500">
      <!-- 表单开始 -->
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="快递配送地址">
          <el-input v-model="form.address" :disabled="choose_status==='finish'?true:false" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" :disabled="choose_status==='finish'?true:false" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" :disabled="choose_status==='finish'?true:false"  />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="待发货" value="wait" />
            <el-option label="待签收" value="sign" />
            <el-option label="退货退款" value="refund" />
            <el-option label="已完成" value="finish" />
          </el-select>
        </el-form-item> -->

        <el-form-item label="快递编号">
          <el-input v-model="form.exp_id" :disabled="choose_status==='finish'?true:false" />
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="form.order_number" disabled />
        </el-form-item>
        <el-form-item label="总价格">
          <el-input v-model="form.money" disabled />
        </el-form-item>
        <el-form-item label="购买信息">
          <div v-for="(detail, index) in detail_arr" :key="index">
            <GridComponent :describe="detail.describe" :amount="detail.number" :price="detail.totals" :url="detail.url">
            </GridComponent>
          </div>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="choose_status==='finish'">
            {{ choose_status === 'wait' ? '发货' : '确认' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed, watch, onUnmounted } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import type { OrderList, DetailList, OrderDetails, ProductList } from '@/typemanual/typemian';
import { Timer } from '@element-plus/icons-vue'
import request from "@/utils/request"
import api from "@/utils/api";
import GridComponent from '@/components/GridComponent.vue';
import { formatTime } from '@/utils/dateFormat'
import { useOnlogin } from '@/stores';
import dayjs from 'dayjs';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
const myToken = useOnlogin();
let token1 = localStorage.getItem('token')
// console.log(token1)//存在token
//if a client building 3 socket communication,how to do difference they is a not the same ?
//需要判断一下socket是否存活，如果存活就不重新连接
// const socket = new WebSocket("ws://localhost:8080/ws");
let socket: any;
onMounted(() => {
  socket = new WebSocket("ws://localhost:8080/chat?token=" + token1);
  // socket = new WebSocket("ws://localhost:8080/chat")
  socket.onopen = () => {
    console.log("WebSocket is open now.");
  };
  //接收消息的管道
  socket.onmessage = (event: any) => {
    console.log(JSON.parse(event.data))
    console.log("Message from server: " + event.data);
    const updateInfo: { system: boolean, code: string, message: string } = JSON.parse(event.data);
    if (updateInfo.system == true && updateInfo.message == 'update') {
      newOrders.value = true;
    }
  };
  socket.onclose = () => {
    //socket关闭时调用
    console.log("WebSocket is closed now.");
  };
})

onUnmounted(()=>{
  console.log("order 被销毁")
})

function sendMessage() {
  //发送消息的方法
  // socket.send("Hello from the client!");
  if (socket.readyState === WebSocket.OPEN) {
    socket.send("Hello from the client!");
  } else {
    console.log("WebSocket is not ready. Current state: " + socket.readyState);
  }
}

/***
 * 
 * 新订单提示
 * 
 */
//控制是否显示刷新bar control the bar is show or not
const newOrders = ref(false);
// get latest order information 
const getlatestOrder = () => {
  newOrders.value = false;
  //get order information via application program interface(API) 
  ViewInit("wait", 0); //获取待发货的订单
  activeName.value = 'wait' //跳转到待发货的页面
}


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
  const order = { ...form };
  console.log(order)
  //if status is wait ,we only doing change status to the sign 
  if (choose_status.value === 'wait') {
    order.state = 'sign';
    request({
      method: "post",
      data: order,
      url: api.ORDERUPDATE
    }).then(res => {
      dialogVisible.value = false;
      //在页面更新
      tableData.forEach((item, index) => {
        if (tableData[index].order_id == form.order_id) {
          tableData[index].contacts = form.contacts;//联系人
          tableData[index].phone = form.phone; //手机
          tableData[index].address = form.address;//地址
          tableData[index].exp_id = form.exp_id;//快递号
          tableData[index].state = form.state; //状态
        }
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }else if(choose_status.value === 'sign' || choose_status.value === 'refund'){
    //if status is the sign ,we only modified user information,don't to do more;
    request({
      method: "post",
      data: order,
      url: api.ORDERUPDATE
    }).then(res => {
      dialogVisible.value = false;
      //在页面更新
      tableData.forEach((item, index) => {
        if (tableData[index].order_id == form.order_id) {
          tableData[index].contacts = form.contacts;//联系人
          tableData[index].phone = form.phone; //手机
          tableData[index].address = form.address;//地址
          tableData[index].exp_id = form.exp_id;//快递号
          tableData[index].state = form.state; //状态
        }
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

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
    data.forEach((item, index) => {
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
    detail_arr.forEach(async (item, index) => {
      await request(api.PRODUCTINFO + `?pdId=${detail_arr[index].pd_id}`).then(res => {
        console.log('i am is ', res)
        const data = res.data.data.product as ProductList;
        detail_arr[index].url = "http://localhost:8080/upload/" + data.picture_name; //url地址
        detail_arr[index].describe = data.p_describe;
      })

    })
  }).catch(err => {
    console.log(err);
  })


}

const state_compute = (state: string): string => {
  let res = ''
  switch (state) {
    case 'wait': res = '待发货'; break;
    case 'sign': res = '待签收'; break;
    case 'refund': res = '退货退款'; break;
    case 'finish': res = '完成交易'; break;
  }
  return res;
}
//退单
const handleDelete = (index: number, row: OrderList) => {
  console.log("orderDel");
  console.log(index, row)
}

// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('Are you sure to close this dialog?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }


/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
let choose_status = ref("wait")
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
  request(api.ORDERLIST + `?status=${choose_status.value}&offset=${offset}`).then(res => {
    const data = res.data.data as OrderList[];
    tableData.length = 0;
    data.forEach((item, index) => {
      tableData.push(item)
    })
    console.log(tableData)
  }).catch(err => {
    console.log("出错了", err);
  })
})
//切换标签页
const handleClick = (tab: TabsPaneContext, event: Event) => {
  tableData.length = 0;
  if (tab.props.name == "wait") {
    currentPage.value = 1;
    ViewInit("wait", 0);
    choose_status.value = "wait";
    console.log("choose wait")
  } else if (tab.props.name == "sign") {
    currentPage.value = 1;
    ViewInit("sign", 0);
    choose_status.value = "sign";
    console.log(tableData)
    console.log("choose sign")
  } else if (tab.props.name == "refund") {
    currentPage.value = 1;
    ViewInit("refund", 0);
    choose_status.value = "refund";
    console.log("choose refund")
  } else {
    currentPage.value = 1;
    ViewInit("finish", 0);
    choose_status.value = "finish";
    console.log("choose finish")
  }


}

</script>
<style scoped lang='less'>
.wrapper {
  margin-left: 10px;
}

.pagin {
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}
</style>