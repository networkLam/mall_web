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
    //中控
    if(e ==1){
        router.push('/central')
        //商品管理
    }else if(e == 2){
       router.push("/product")
       //订单管理
    }else if(e == 3){
        router.push("/order")
        //个人信息
    }else if(e == 4){
        router.push("/profile")
        //日志
    }else if(e==5){
        router.push("/log")
    }else if(e == 6){
        router.push("/user")
    }
   
}
</script>    

<template>
    <div class="warpper">
        <div class="menu"><el-col>
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="select">
                    <el-menu-item index="1">
                        <el-icon><el-icon>
                                <PieChart />
                            </el-icon></el-icon>
                        <span>中控平台</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>订单管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                       
                            <el-icon><Postcard /></el-icon>
                        
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>操作日志</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <el-icon><EditPen /></el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col> </div>
           
    </div>
</template>   

<style scoped>
.warpper{
    margin-top: 10px;
}

</style>