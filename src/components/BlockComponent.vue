<template>
    <div class="wrapper">
        <div style="margin-right: 85px;">
            <div class="title">{{ title }}</div>
            <div class="number">{{ now }}</div>
            <div class="yesterday">昨天&nbsp;&nbsp;<span>{{ yesterday }}</span>&nbsp;<span>{{ percent +'%'}}</span> </div>
        </div>
        <div class="icon">
            <div>
                <img src="../assets/bookmark.svg" alt="" srcset=""
                    style="width: 50px;height: 50px;border: 1px solid white;border-radius: 50%;">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
interface Props{
    title:string,
    now:string,
    yesterday:string,
    percent:string
}

defineProps<Props>()

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
<style scoped lang='less'>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #eaf9ff, #faffff);
    height: 112px;
    margin: 10px;
    border-radius: 12px;
    border: 1xp solid black;
    .number{
        font-size: 28px;
        font-weight: 600;
        color: black;
    }
}
</style>