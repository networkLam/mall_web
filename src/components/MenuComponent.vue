<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const router = useRouter();
const select = (e:number) => {
    //选择哪个面板就跳转到那个页面
    if(e ==1){
        router.push('/central')
    }else if(e == 2){
        console.log("value is ",e)
    }else if(e == 3){
        console.log("value is ",e)
    }else if(e == 4){
        console.log("value is ",e)
    }
   
}
</script>    

<template>
    <div class="warpper">
        <div class="menu"><el-col>
                <!-- <h5 class="mb-2" style="margin-top: 10px;"></h5> -->
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="select">
                    <el-menu-item index="1">
                        <el-icon><el-icon>
                                <PieChart />
                            </el-icon></el-icon>
                        <span>中控平台</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>客房详情</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>订单详情</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>更多内容</span>
                    </el-menu-item>
                </el-menu>
            </el-col> </div>
            <div class="showContent"><router-view></router-view></div>
             
    </div>
</template>   

<style scoped>
.warpper{
    margin-top: 10px;
    display: flex;
}
.menu{
width: 10%;
}

.showContent{
    width: 70%;
}
</style>