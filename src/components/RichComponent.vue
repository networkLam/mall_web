<template>
  <div>
    <div style="width: 600px;height: 400px;" ref="quill">
    </div>
  </div>
</template>

<script setup lang="ts">
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // 引入 Quill 样式
import { ref, reactive, onMounted, watchEffect, computed, watch,defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const quill = ref() as any;
const editor = ref();
const emits = defineEmits(['transmit'])
onMounted(() => {
  editor.value = new Quill(quill.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    }
  });

  // 添加 'text-change' 事件监听器
  editor.value.on('text-change', () => {
      if (editor.value) {
        const textContent = editor.value.getText(); // 获取纯文本内容
        const htmlContent = editor.value.root.innerHTML; // 获取HTML内容
        // console.log('纯文本内容:', textContent);
        // console.log('HTML内容:', htmlContent);
        // 更新响应式变量 currentContent
        // currentContent.value = textContent;
        emits('transmit',htmlContent)
      }
    });
},
)

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


</script>
<style scoped lang='less'></style>