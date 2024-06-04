<script lang="ts" setup>
import {defineProps} from "vue"
import { InfoFilled } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
//初始化路由
const router = useRouter();
const props = defineProps(['name',"src"]);
// 需要加一个退出按钮
const confirm = ()=>{
    //when exit  clear  storage  all data
    localStorage.clear();
    router.push("/login")
}
const cancel = ()=>{
    console.log("cancel");
}
</script>
<template>
    <div class="warpper">
        <div class="head">欢迎 <span style="font-style: italic;">  {{ props.name}}</span> <span style="font-style: italic;">  {{ props.src}}</span> 
            <div class="confirm"> <el-popconfirm
                width="220"
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                @confirm="confirm"
                @cancel = "cancel"
                icon-color="#626AEF"
                title="确定退出登录吗?" >
                        <template #reference>
                        <div style="font-weight: 500;">退出</div>
                        </template>
                </el-popconfirm>
                </div>
            </div>
            
    </div>
</template>

<style scoped>
.warpper{
    /* display: flex; */
    width: 100%;
    height: 45px;
    background: linear-gradient(to right, #9fe1fa, #f4edc9);
    box-shadow: 4px 3px 10px  #888888ad;
    display: flex;
    justify-content: right;
}
.head{
    /* background: rgba(#0023,#3520, blue); */
    /* width: 200px; */
    margin-top: 12px;
    padding-right: 5px;
    float: right;
    display: flex;
    color: rgb(39, 32, 32);
}

.confirm{
    margin-left: 10px;
}
</style>