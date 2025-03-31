<template>
  <div class="wrapper">
    <el-card shadow="always">
      <el-form :model="addForm" label-width="120px" style="display: flex;">
        <div class="left" style="width: 500px;">
          <el-form-item label="商品分类">
            <el-select v-model="addForm.pd_type" placeholder="请选择分类">
              <el-option label="3C数码" value="3C数码" />
              <el-option label="美妆服饰" value="美妆服饰" />
              <el-option label="生鲜" value="生鲜" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="addForm.p_name" />
          </el-form-item>
          <!-- <el-form-item label="商品品牌">
            <el-select v-model="addForm.delivery" placeholder="please select your zone">
              <el-option value="shanghai"> 测试1</el-option>
              <el-option value="beijing"> 测试2</el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="商品介绍">
            <el-input v-model="addForm.p_describe" type="textarea" />
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model="addForm.price" />
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="addForm.number" />
          </el-form-item>
          <el-form-item label="上架状态">
            <el-radio-group v-model="addForm.state">
              <el-radio value="上架"> 上架</el-radio>
              <el-radio value="下架">下架 </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 此处应该为多选 -->
          <!-- <el-form-item label="商品标签">
            <el-input v-model="addForm.desc" />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="商品主图">
            <el-upload v-model:file-list="fileListMain" action="/api/upload" name="myFile" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品轮播图">
            <el-upload v-model:file-list="fileListLoopPicture" action="/api/upload" name="myFile"
              list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图">
            <RichText @transmit="getContent"></RichText>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, onUnmounted, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RichText from '../components/RichComponent.vue'
import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'
import request from '@/utils/request';
import { closeCurrentRouter } from '@/utils/navigation';
import type { AddProduct } from "@/typemanual/typemian";
//想要组件被keep-alive就必须声明名称
defineOptions({
  name: 'addproductView'
})
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
// onMounted(() => {
//   //according to Id determine added

// })
// onUnmounted(() => {
//   console.log("addproduct 被销毁")
// })
//当组件从新活跃时
onActivated(() => {
  console.log(route.query)
  if (Object.keys(route.query).includes("entry")) {
    console.log("点击新增进来")
    resetDataForm();
  } else {
    console.log("点击tab进来")
  }
})

const onSubmit = () => {
  console.log('submit!')
  if (fileListMain.value.length && typeof fileListMain.value[0].response === 'string') {
    const fileName = fileListMain.value[0].response.split("/");
    addForm.picture_name = fileName[fileName.length - 1];
  }
  const arr: string[] = [];
  console.log("fileListLoopPicture", fileListLoopPicture.value)
  for (const item of fileListLoopPicture.value) {
    if (typeof item.response === 'string') {
      const fileName = item.response.split("/")
      arr.push(fileName[fileName.length - 1])
    }
  }
  addForm.picture_detail = arr;
  console.log("提交的表单", addForm)
  closeCurrentRouter();
  request({
    url: "/api/admin/addProduct",
    method: "post",
    data: addForm
  }).then(res => {
    if (res.data.code === '1') {
      ElMessage({
        message: '添加成功！',
        type: 'success',
      })
      //关闭当前页面
      closeCurrentRouter();
    } else {
      ElMessage.error(res.data.data)
    }
    console.log("reponse", res)
  })
}

//添加商品
const addForm = reactive<AddProduct>({
  pd_id: null,//商品ID
  price: "",//商品价格
  state: "",//商品状态
  p_name: "",//商品名称
  p_describe: "",//商品描述
  picture_name: "", //商品首页展示的图片名
  pd_type: "",//产品的类型
  time: "", //修改or添加的时间
  number: "",//商品的数量
  picture_detail: [] as string[]
})
//重置数据
const resetDataForm = () => {
  fileListMain.value.length = 0;
  fileListLoopPicture.value.length = 0;
  addForm.pd_id = null;
  addForm.price = "";
  addForm.state = "";
  addForm.p_name = "";
  addForm.p_describe = "";
  addForm.picture_name = "";
  addForm.pd_type = "";
  addForm.number = "";
  addForm.picture_detail = [];
}


//商品主图
const fileListMain = ref<UploadUserFile[]>([
])
//商品轮播图
const fileListLoopPicture = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const getContent = (e: string) => {
  console.log('father has got it')
  console.log(e)
}
</script>
<style scoped lang='less'></style>