<template>
  <div class="wrapper1">
    <div class="head"> <div>&nbsp;<el-button type="primary" plain  round @click="addproduct"  >添加商品</el-button></div> 
      <div class="search"><el-input v-model="keyword" style="width: 240px" placeholder="搜索" clearable /> &nbsp; <el-button
          :icon="Search" circle @click="searchFun" /></div>
    </div>
    <!-- 首页浏览商品信息 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="left" label="图片" width="180">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.picture_name" :fit="fits[0]" />
        </template>
      </el-table-column>
      <el-table-column prop="time" label="入库日期" width="180" sortable />
      <el-table-column prop="p_name" label="名称" width="180" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column prop="state" label="状态" width="180" >
        <template #default="scope">
        <el-tag
          :type="scope.row.state === '1' ? 'success' : 'danger'"
          disable-transitions
          >{{ scope.row.state }}</el-tag
        >
      </template>
      </el-table-column>
      <el-table-column prop="p_describe" label="描述" width="280" />
      <el-table-column align="right" label="编辑" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 首页浏览商品信息 -->
    <div class="pagination"><el-pagination background layout="prev, pager, next" :total="page_number" :default-page-size="5"
        v-model:current-page="currentPage" /></div>
    <!-- 自定义弹框 -->
    <el-dialog v-model="dialogTableVisible" title="搜索结果" width="800">
      <el-table :data="tableData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
    <!-- 点击弹框后的表单 需要复用 添加商品和编辑商品--> 
    <el-dialog v-model="showTable" title="编辑信息" width="800">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="商品名称">
          <el-input v-model="form.p_name" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select v-model="form.state" placeholder="请选择商品的状态">
            <el-option label="上架" value="上架" />
            <el-option label="下架" value="下架" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.p_describe" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 表单结束 -->
  </div>
</template>

<script lang="ts" setup>
import type { ImageProps } from 'element-plus'
import type {ProductList} from "@/typemanual/typemian"
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, watchEffect, computed, watch,onBeforeMount,onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import request from '@/utils/request';
import api from "@/utils/api";
const dialogTableVisible = ref(false)
const fits = [
  'fill',
  'cover',
] as ImageProps['fit'][]

//记录当前的页码
let currentPage = ref(1)

//表达是否展示
const showTable = ref(false)
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();

//总条数 / 5 向上取整的就是page number
let page_number = ref(0);


onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')

})


//列表的数据 fake data
let tableData = reactive<ProductList[]>([{
  time: '',
  p_name: '',
  p_describe: '',
  pd_id: '',
  pd_type: '',
  picture_name: '',
  price: '',
  state: ''
}]) ;


//表单内容
const form = reactive({
  pd_id: '',
  price: '',
  state: '',
  p_name: '',
  p_describe:'',
  pictrue_name :'',
  pd_type:'',
  // delivery: false,
  // type: [],
  // resource: '',
  // desc: '',
})

watch(currentPage, (newVal, oldVal) => {
  console.log(newVal)
  request(api.PRODUCTQUERY+(currentPage.value*5)).then(res=>{
    const data:ProductList[] = res.data.data;
    data.forEach((item,index)=>{
      data[index].picture_name = "http://localhost:8080/upload/" + data[index].picture_name;
      tableData[index] = data[index];
    })
    console.log(data)
  })
})




//编辑函数
const handleEdit = (index: any, row:any) => {
  console.log(row.pd_id)
  console.log(index)
  showTable.value = true
  console.log(tableData[index])
  form.p_describe = tableData[index].p_describe; //描述
  form.p_name = tableData[index].p_name; //名称
  form.pd_type = tableData[index].pd_type; //类型
  form.price = tableData[index].price; //价格
  form.state = tableData[index].state;

}
//删除函数
const handleDelete = (index: any, row: any) => {
  console.log(index)
}

//搜索
let keyword = ref("");
//搜索函数
const searchFun = () => {
  // alert(keyword.value)
  dialogTableVisible.value = true;
}

//提交表单
const onSubmit = () => {
  console.log('submit!')
}
//添加
const addproduct = ()=>{
  showTable.value = true
}


//网络请求 在页面创建之间获取一次数据
onBeforeMount(async ()=>{

  await request(api.PRODUCTCOUNT).then(res=>{
    // console.log(res.data)
    page_number.value = Math.ceil( res.data.data) -5;
    console.log("page_number",page_number.value)
  })

  await request(api.PRODUCTQUERY+currentPage.value).then(res=>{
    const data:ProductList[] = res.data.data;
    data.forEach((item,index)=>{
      data[index].picture_name = "http://localhost:8080/upload/" + data[index].picture_name;
      tableData[index] = data[index];
    })
    console.log(data)
  })
})


</script>
<style scoped>
.wrapper1 {
  /* width:1000px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.search {
  margin-right: 10px;
}

.pagination {
  margin-top: 40px;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>