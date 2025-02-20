<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
import { useNavigationTab } from "../stores/navigation"
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { ref, type Ref } from 'vue';
const router = useRouter();
const tabs = useNavigationTab();

// const routerInfo = router.getRoutes();
// console.log(routerInfo)
// console.log('router =',router)
const routerInfoAll = router.options.routes;
//返回home路由所在的索引位置
function matchHomePath(routerInfo: readonly RouteRecordRaw[]): number {
    for (let i = 0; i < routerInfo.length; i++) {
        if (routerInfo[i].path === '/home') {
            return i;
        }
    }
    return -1;
}

//找出找出home路由下面的子路由
function findChildren(routerInfo: readonly RouteRecordRaw[]): Ref<any[]> {
    const res = ref<any[]>([]);
    const index = matchHomePath(routerInfo);
    //确保存在children属性
    if (index != -1 && routerInfo[index].children) {
        for (let i = 0; i < routerInfo[index].children?.length; i++) {
            // console.log(routerInfo[index].children[i]);
            res.value.push(routerInfo[index].children[i])
        }
    }
    return res;
}
const childrenRouter = findChildren(routerInfoAll)
// console.log('test = ', childrenRouter)

//路由导航
const routeChange = (toAnywhere: RouteRecordRaw) => {
    console.log(toAnywhere)
    router.push(toAnywhere.path)
    //实现tab标签导航
    if (toAnywhere.meta) {
        const temp = {
            title: typeof toAnywhere.meta.title === 'string' ? toAnywhere.meta.title : '默认标题',
            router: toAnywhere.path
        };
        tabs.setNavigation(temp);
    }
}

</script>

<template>
    <div class="warpper">
        <div class="menu">
            <el-menu default-active="0" class="el-menu-vertical-demo">
                <el-menu-item v-for="(item, index) in childrenRouter" :index="String(index)" :key="index"
                    @click="routeChange(item)">
                    <el-icon><el-icon>
                            <PieChart />
                        </el-icon></el-icon>
                    <span>{{ item.meta.title }}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style scoped>
.warpper {
    margin-top: 10px;
}
</style>