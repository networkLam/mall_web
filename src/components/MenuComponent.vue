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
//got it all route information
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
    if (index != -1 && routerInfo[index]?.children) {
        const children = routerInfo[index].children;
        if (children) { // 这里确保了children不是undefined
            for (let i = 0; i < children.length; i++) {
                const show = children[i].meta!.show;
                if (show === true) {
                    res.value.push(children[i]);
                }
            }
        }
    }
    return res;
}
const childrenRouter = findChildren(routerInfoAll)

//路由导航
const routeChange = (toAnywhere: RouteRecordRaw) => {
    tabs.navigationTo(toAnywhere.path)
}
//默认展示控制面板的信息，且不可关闭 (因为0位不可关闭)
routeChange(childrenRouter.value[0]);
tabs.setActiveIndex(0);
</script>

<template>
    <div class="warpper">
        <div class="menu">
            <el-menu class="el-menu-vertical-demo">
                <el-menu-item v-for="(item, index) in childrenRouter" :index="String(index)" :key="index"
                    @click="routeChange(item)">
                    <el-icon>
                        <PieChart />
                    </el-icon>
                    <span>{{ item.meta.title + '|' + item.meta.show }}</span>
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