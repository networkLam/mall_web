<template>
  <div class="wrapper1">
    <div class="head">
      <div>&nbsp;<el-button type="primary" plain round @click="addproduct">添加商品</el-button></div>
      <div class="search"><el-input v-model="keyword" style="width: 240px" placeholder="搜索" clearable /> &nbsp;
        <el-button :icon="Search" circle @click="searchFun" />
      </div>
    </div>
    <!-- 首页浏览商品信息 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="left" label="图片" width="180">
        <template #default="scope">
          <!-- style="width: 100px; height: 100px"  -->
          <el-image style="width: 100px; height: 100px" :src="scope.row.picture_name" :fit="fits[0]" />
        </template>
      </el-table-column>
      <el-table-column prop="time" label="入库日期" width="180" />
      <el-table-column prop="p_name" label="名称" width="180" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column prop="state" label="状态" width="180">
        <template #default="scope">
          <el-tag :type="scope.row.state === '上架' ? 'success' : 'danger'" disable-transitions>{{ scope.row.state
            }}</el-tag>
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
    <!-- 首页浏览商品信息 分页-->
    <div class="pagination"><el-pagination background layout="prev, pager, next" :total="page_number"
        :default-page-size="5" v-model:current-page="currentPage" /></div>
    <!-- 自定义弹框 -->
    <el-dialog v-model="search_dialog" title="搜索结果" width="800">
      <el-table :data="tableData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
    <!-- 点击弹框后的表单 需要复用 添加商品和编辑商品-->
    <el-dialog v-model="showTable" title="编辑信息" width="800" @close="big_dialog">
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

        <el-form-item label="图片">
          <el-upload v-model:file-list="single_file" action="/api/upload" name="myFile" :on-success="uploadSuccess"
            list-type="picture" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :width="500" :height="500" :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input v-model="form.p_describe" type="textarea" />
        </el-form-item>

        <el-form-item label="详情图片" v-show="updateOrInsert">
          <el-icon @click="detail_open">
            <!-- 点开详情图片的那个＋号 -->
            <Plus />
          </el-icon>
          <el-dialog v-model="detail_picture_flag" title="详情图片" width="500" @close="detail_close" center>
            <template #footer>
              <el-upload v-model:file-list="details_picture" accept=".jpg,.jpeg,.png,.avif" action="/api/uploads"
                name="files" list-type="picture-card" :multiple="true" :on-preview="detailPicturePreview"
                :on-remove="detailRemove" :on-success="uploadSuccess_detail">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
              <el-dialog v-model="detailsDialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" :width="500" :height="500" />
              </el-dialog>
              <el-button type="primary" class="confirm" @click="confirm_upload">确认</el-button>
            </template>
          </el-dialog>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>   
    <!-- 表单结束 -->
<!-- 确认删除的弹窗 -->
    <el-dialog
    v-model="confirm_dialog"
    title="警告"
    width="500"
  >
    <span>确认删除吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="confirm_dialog = false">取消</el-button>
        <el-button type="primary" @click="delete_func">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
 
  </div>
</template>

<script lang="ts" setup>
import type { ImageProps, UploadProps, UploadUserFile } from 'element-plus'
import type { ProductList, UserEditForm, PictureDetail } from "@/typemanual/typemian"
import { ElNotification } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, watch, onBeforeMount } from 'vue';
import request from '@/utils/request';
import api from "@/utils/api";
//判断是新增还是更新
let updateOrInsert = ref(false);

//搜索弹窗
const search_dialog = ref(false)
//是否展示详情图片对话框
let detail_picture_flag = ref(false);
const fits = [
  'fill',
  'cover',
] as ImageProps['fit'][]

//记录当前的页码 this hava bug
let currentPage = ref(1)

//大表单是否展示
const showTable = ref(false)

//总条数 / 5 向上取整的就是page number
let page_number = ref(0);

//record upload function status
let flag = ref(true)

//列表的数据 table data
let tableData = reactive<ProductList[]>([{
  time: '',
  p_name: '',
  p_describe: '',
  pd_id: '',
  pd_type: '',
  picture_name: '',
  price: '',
  state: ''
}]);


//表单内容
const form = reactive<UserEditForm>({
  pd_id: '',
  price: '',
  state: '',
  p_name: '',
  p_describe: '',
  picture_name: '',
  pd_type: '',
  time: ""
})

// 编辑框里面的图片
const single_file = ref<UploadUserFile[]>([
])
//预览图片的链接
const dialogImageUrl = ref('')
const dialogVisible = ref(false)


const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  //点击图片删除时
  console.log(uploadFile, uploadFiles)
  console.log(single_file)
  flag.value = false;
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}


watch(currentPage, (newVal, oldVal) => {
  // console.log(newVal)
  //此处有bug 数据应该从0开始
  //let offset = newVal === 0 || oldVal === undefined ? 0 : newVal * 5;
  let offset;
  if (currentPage.value == 1) {
    offset = 0;
  } else {
    offset = (newVal - 1) * 5;
  }
  console.log("offset is ", offset)
  // (currentPage.value * 5)
  request(api.PRODUCTQUERY + offset).then(res => {
    const data: ProductList[] = res.data.data;
    //先把列表置空，免得出现诡异的事情
    tableData.length = 0;
    data.forEach((item, index) => {
      data[index].picture_name = "http://localhost:8080/upload/" + data[index].picture_name;
      tableData[index] = data[index];
    })
  })
})

//编辑函数
const handleEdit = (index: any, row: any) => {
  showTable.value = true
  form.p_describe = tableData[index].p_describe; //描述
  form.p_name = tableData[index].p_name; //名称
  form.pd_type = tableData[index].pd_type; //类型
  form.price = tableData[index].price; //价格
  form.state = tableData[index].state;//状态
  form.pd_id = tableData[index].pd_id//商品id
  form.picture_name = tableData[index].picture_name //图片链接
  form.time = tableData[index].time;//入库时间
  const obj = reactive({ name: tableData[index].pd_id, url: tableData[index].picture_name })
  single_file.value.push(obj)
  updateOrInsert.value = true; // 是更新
}
//详情页面图片的预览
const detailsDialogVisible = ref(false)

let delete_index = 0;
let delelte_pd_id:string = '';
let confirm_dialog = ref(false) //确认删除展示弹窗
//详情页面的图片对象
const details_picture = ref<UploadUserFile[]>([
  // {
  //   name: 'food1.jpeg',
  //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  // },
])
//上传成功后返回的新数据
const details_picture_new: Array<string> = [];

const delete_func = ()=>{
  //真正的删除函数
  request("/api/product/del?pd_id="+delelte_pd_id).then(res=>{
    console.log(res);
    tableData.splice(delete_index,1);
    confirm_dialog.value = false;

    ElNotification({
      title: '完成',
      message: '删除成功',
      type: 'success',
    })

  })
}

//删除函数从数据表格中
const handleDelete = (index: any, row: any) => {
  console.log(index)
  console.log("delete ?")
  const id = tableData[index].pd_id;
  delete_index  = index; //获取当前商品的在数组中索引位置
  delelte_pd_id = id; //获取删除的商品id
  confirm_dialog.value = true;
  console.log(delete_index,delelte_pd_id)
  // request("/api/product/del?pd_id="+id).then(res=>{
  //   console.log(res);
  //   tableData.splice(index,1);
  // })
  // console.log(tableData)
}

//搜索
let keyword = ref("");
//搜索函数
const searchFun = () => {
  // alert(keyword.value)
  search_dialog.value = true;
}

//更新页面(添加的成功的时候调用)
const updatePage = async () => {
  await request(api.PRODUCTCOUNT).then(res => {
    //设定页码
    page_number.value = Math.ceil(res.data.data);
    // console.log("page_number", page_number.value)
  })
  await request(api.PRODUCTQUERY + 0).then(res => {
    const data: ProductList[] = res.data.data;
    data.forEach((item, index) => {
      data[index].picture_name = "http://localhost:8080/upload/" + data[index].picture_name;
      tableData[index] = data[index];
    })
  })
}

//提交表单
const onSubmit = () => {
  if (updateOrInsert.value == false) {
    // console.log("是新增")
    if (single_file.value.length == 1) {
      // console.log('submit!')
      // console.log(form)
      const product = { ...form }
      product.picture_name = product.picture_name.split("/")[4];
      console.log(product);
      request({
        method: "post",
        data: product,
        url: api.ADDPRODUCTINFO
      }).then(res => {
        console.log("添加成功", res);
        showTable.value = false;
        ElNotification({
          title: '完成',
          message: '添加成功',
          type: 'success',
        })
        //更新成功后刷新一下页面
        updatePage();
      }).catch(err => {
        console.log("添加失败", err)
        ElNotification({
          title: '失败',
          message: '添加失败',
          type: 'error',
        })
      })
    } else {
      console.log("限制提交")
    }
  } else {
    // console.log("是更新")
    if (single_file.value.length == 1) {
      const product = { ...form }
      product.picture_name = product.picture_name.split("/")[4];
      const id = product.pd_id;

      request({
        method: "post",
        data: product,
        url: api.UPDATEPRODUCTINFO
      }).then(res => {
        console.log("更新成功", res);
        tableData.forEach((item, index) => {
          if (item.pd_id == id) {
            tableData[index] = { ...product }
            tableData[index].picture_name = "http://localhost:8080/upload/" + tableData[index].picture_name;
          }
        })
        showTable.value = false;
        ElNotification({
          title: '完成',
          message: '更新成功',
          type: 'success',
        })
      }).catch(err => {
        console.log("更新失败", err)

        ElNotification({
          title: '失败',
          message: '更新失败',
          type: 'error',
        })
      })
    } else {
      console.log("限制提交")
    }
  }


}
//添加
const addproduct = () => {
  showTable.value = true;
  (Object.keys(form) as (keyof typeof form)[]).forEach((key) => {
    form[key] = "";
  });
  updateOrInsert.value = false; //是新增
}


//网络请求 在页面创建之间获取一次数据
onBeforeMount(async () => {
  await request(api.PRODUCTCOUNT).then(res => {
    //设定页码
    page_number.value = Math.ceil(res.data.data);
    // console.log("page_number", page_number.value)
  })
  await request(api.PRODUCTQUERY + 0).then(res => {
    const data: ProductList[] = res.data.data;
    data.forEach((item, index) => {
      data[index].picture_name = "http://localhost:8080/upload/" + data[index].picture_name;
      tableData[index] = data[index];
    })
  })
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')

})


//关闭弹窗的函数(关闭弹窗时把图片数组中的数据清空)
const big_dialog = () => {
  single_file.value.pop();
}

//文件上传成功的回调
const uploadSuccess = (res: any) => {
  //获取后端返回的数据 http://localhost:8080/upload/139fc4f6-13e6-4cec-b6a2-8b421e07c916.png
  console.log(res)
  single_file.value.length = 0;
  const obj = { name: "temp", url: res };
  single_file.value.push(obj)
  console.log(single_file)
  form.picture_name = res;
}

//点击详情图片的按个加号
const detail_open = () => {
  detail_picture_flag.value = true;
  //get way picture of detail
  request(api.GETPICTUREDETAIL + "?pd_id=" + form.pd_id).then(res => {
    // console.log(res)
    //check if the data returned by the server is empty
    const data: Array<PictureDetail> = res.data.data;
    if (data.length == 0) {
      console.log("无数据");
    } else {
      console.log(data)
      data.forEach((item, index) => {
        console.log(data[index].pt_id)
        console.log(data[index].pt_path)
        let url = "http://localhost:8080/upload/" + data[index].pt_path;
        const obj = reactive({ name: data[index].pt_id, url })
        details_picture.value.push(obj)
      })
    }
  })
}

//详情图片的触发函数关闭函数
const detail_close = () => {
  detail_picture_flag.value = false;
  //清空新上传的文件数据
  details_picture_new.length = 0;
  //让预览的链接置空
  details_picture.value.length = 0;
}

//详情图片页面的预览
const detailPicturePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  detailsDialogVisible.value = true;
}

//详情图片页面的删除（图片）函数
const detailRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // console.log("下列是产品详细图片的删除数据（由detailRemove触发）")
  // console.log(uploadFile, uploadFiles)
  console.log(uploadFile.name + "be deleted")
  request(api.DELETEDETAILPICTURE + "?pt_id=" + uploadFile.name).then(res => {
    console.log("删除成功", res)
    //删除详情图片成功的提示
    ElNotification({
      title: '完成',
      message: '删除成功',
      type: 'success',
    })

  }).catch(err => {
    console.log("删除失败", err)
  })
}

//图片详情页面-上传图片成功后的回调函数
const uploadSuccess_detail = (res: any) => {
  console.log("picture uploaded success")
  //每上传成功一张就调用一次（each uploaded success one picture be callback once
  console.log(res);
  details_picture_new.push(res.data[0])
  console.log(details_picture_new);
}

const confirm_upload = () => {
  // 确定上传 将数据打包发往服务器
  const pictures = {
    pd_id: "",
    pictures: ['']
  }
  pictures.pictures = details_picture_new;
  pictures.pd_id = form.pd_id;
  console.log(pictures)
  if(!(pictures.pictures.length >= 1)){
    //详情图片的长度为0
    ElNotification({
      title: '失败',
      message: '无新数据上传',
      type: 'error',
    })
    return;
  }
  request({
    method: "post",
    url: api.UPLOADSFILE,
    data: pictures
  }).then(res => {
    console.log(res);
    ElNotification({
      title: '完成',
      message: '上传成功',
      type: 'success',
    })
    detail_picture_flag.value = false;
  }).catch(err => {
    console.log(err);
  })
}


</script>
<style scoped>
.wrapper1 {
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
  margin-bottom: 40px;
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

.confirm {
  margin-top: 10px;
}
</style>