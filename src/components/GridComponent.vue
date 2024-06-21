<template>
  <div class="wrapper">
    <div class="image">
        <!-- 图片区域 -->
        <el-image style="width: 100px; height: 100px" :src="props.url" :fit="fits[0]" />
    </div>
    <div class="text">
       <div class="desc">{{ props.describe }}</div>
       <div class="amount"> <div class="left"><span> {{ "x"+props.amount  }}</span>&nbsp;&nbsp;&nbsp;<span>{{ "￥"+props.price }}</span> </div>  </div>
    </div>

  </div>
</template>

<script setup lang="ts" >
import { ref, reactive,onMounted, watchEffect, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ImageProps } from 'element-plus'
const props = defineProps({
    describe : String,
    amount :Number,
    url:{
        default:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        type:String
    },
    price:{
        required:true,
        type:String,
        default:"获取失败"
    }
})
const fits = [
  'fill',
  'contain',
  'cover',
  'none',
  'scale-down',
] as ImageProps['fit'][]
// const url =
//   'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
// defineExpose({
//   ...toRefs(data)
// })

</script>
<style scoped lang='less'>
.wrapper{
    display: flex;
    .text{
        margin-left: 10px;
        .left{
            float: right;
        }
    }
}
</style>