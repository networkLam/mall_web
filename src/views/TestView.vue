<template>
  <div class="wrapper">
    <div class="file">
      <input type="file" name="test" id="" @change="getFile">

    </div>

    <div class="containerOutside">
      <div class="container1" v-for="(item, index) in tempData" :key="index" style="">
        <span>{{ item.link }}</span>
        <span>{{ item.deviceID }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.producer }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//分片上传
const getFile = (event: Event)=>{
  const target = event.target as HTMLInputElement;
      if (!target.files) return;
      const file: File = target.files[0];
      //bytes 
      const chunkSize: number = 1024 * 1024; // 每个分片大小为1MB
      const chunks: Blob[] = [];
      let start: number = 0;

      while (start < file.size) {
        const end: number = Math.min(start + chunkSize, file.size);
        const chunk: Blob = file.slice(start, end);
        chunks.push(chunk);
        start = end;
      }

      console.log(chunks); // 现在chunks数组包含了所有的文件分片
      //进行分片的并发上传
}

interface TestData {
  name: string,
  link: string,
  deviceID: string
  producer: string
}

const tempData: TestData[] = reactive([
  {
    name: "jay",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "大疆"
  },
  {
    name: "tom",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "小米"
  },
  {
    name: "lam",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "iPhone"
  },
  {
    name: "andy",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "华为"
  },
  {
    name: "andy",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "华为"
  },
  {
    name: "andy",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "华为"
  },
  {
    name: "andy",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "华为"
  },
  {
    name: "andy",
    link: "//src/12.flv",
    deviceID: "12138",
    producer: "华为"
  },
])

console.log(tempData)



onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
// defineExpose({
//   ...toRefs(data)
// })

</script>
<style scoped lang='less'>
.containerOutside{
  display: grid;
  // justify-content: flex-start;
  justify-content: center;
  align-items: center;
  grid-template-columns: 22% 22% 22% 22%;
  flex-wrap: wrap;
}
.container1 {
  width: 300px;
  height: 300px;
  margin: 20px;
  background-color: yellow;
  text-align: center;
  line-height: 200px;
}
</style>