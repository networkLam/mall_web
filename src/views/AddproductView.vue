<template>
  <div class="wrapper">
    <el-card shadow="always">
      <el-form :model="form" label-width="120px" style="display: flex;">
        <div class="left" style="width: 500px;">
          <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="商品品牌">
            <!-- <el-switch v-model="form.delivery" /> -->
            <el-select v-model="form.delivery" placeholder="please select your zone">
              <el-option  value="shanghai"> 测试1</el-option>
              <el-option  value="beijing" > 测试2</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品介绍">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model="form.desc" />
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="form.desc" />
          </el-form-item>
          <el-form-item label="上架状态">
            <el-radio-group v-model="form.resource">
              <el-radio value="1" > 上架</el-radio>
              <el-radio value="0" >下架 </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 此处应该为多选 -->
          <el-form-item label="商品标签">
            <el-input v-model="form.desc" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="商品主图">
            <el-upload v-model:file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品轮播图">
            <el-upload v-model:file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RichText from '../components/RichComponent.vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}



const fileList = ref<UploadUserFile[]>([
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const getContent = (e:string)=>{
  console.log('father has got it')
  console.log(e)
}
</script>
<style scoped lang='less'>

</style>