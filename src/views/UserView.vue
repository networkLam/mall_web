<template>
    <div class="wrapper">
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="注册日期" prop="register_time" />
            <el-table-column label="姓名" prop="user_name" />
            <el-table-column label="手机号" prop="phone" />
            <el-table-column label="性别" prop="gender" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="输入搜索" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleRestPWD(scope.$index, scope.row)">
                        重置密码
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="display: flex;justify-content: center;margin-top: 20px;margin-bottom: 40px;" background
            layout="prev, pager, next" :total="page_number" :default-page-size="10"
            v-model:current-page="currentPage" />
        <el-dialog v-model="dialogFormVisible" title="编辑信息" width="500">
            <el-form :model="form">
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.user_name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" disabled />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.gender" autocomplete="off" disabled />
                </el-form-item>
                <el-form-item label="注册时间" :label-width="formLabelWidth">
                    <el-input v-model="form.register_time" autocomplete="off" disabled />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect, computed, watch } from 'vue';
import request from '@/utils/request';
import api from '@/utils/api';
import type { User } from "@/typemanual/typemian"
import { ElMessage, ElMessageBox } from 'element-plus'
let page_number = ref(0)
let currentPage = ref(1)
let offset = 0;
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//整个列表的数据
const tableData = reactive<User[]>([])
//表单的数据
const form = reactive<User>({
    uid: 0,
    phone: '',
    user_name: '',
    gender: '',
    register_time: ''
})
const init = () => {
    request(api.GETUSERTOTAL).then(res => {
        page_number.value = res.data.data as number;
    })
    request(api.GETUSERINFO + 0).then(res => {
        const { data } = res.data;
        data.forEach((item: User, index: number) => {
            // console.log(item);
            tableData.push(item);
        })
    })
}


onMounted(() => {
    init();
})
watch(currentPage, () => {
    // console.log(currentPage)
    if (currentPage.value <= 1) {
        offset = 0;
    } else {
        offset = (currentPage.value - 1) * 10;
    }
    request(api.GETUSERINFO + offset).then(res => {
        const { data } = res.data;
        tableData.length = 0;//清空列表中的数据
        data.forEach((item: User, index: number) => {
            tableData.push(item);
        })
    })
})
const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.user_name.toLowerCase().includes(search.value.toLowerCase())
    )
)
//编辑表单
const handleEdit = (index: number, row: User) => {
    // console.log(index, row)
    form.gender = tableData[index].gender;
    form.phone = tableData[index].phone;
    form.register_time = tableData[index].register_time;
    form.uid = tableData[index].uid;
    form.user_name = tableData[index].user_name;
    dialogFormVisible.value = true;
}
//仅能修改用户姓名信息
const onSubmit = () => {
    // console.log("提交表单")
    // console.log(form)
    const { uid } = form;
    const { user_name } = form;
    // console.log(uid, user_name)
    const user = { uid, user_name };
    request({
        method: "post",
        url: api.UPDATEUSERNAME,
        data: user
    }).then(res => {
        // console.log(res)
        //在本地更新用户信息
        tableData.forEach((item, index) => {
            if (item.uid == uid) {
                item.user_name = user_name;
                return;
            }
        })
        dialogFormVisible.value = false;
    })
}

const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm(
        '确定要删除该用户吗？',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        const uid = tableData[index].uid;
        console.log(uid);
        request('/api/user/hide?uid=' + uid).then(res => {
            // console.log(res)
            tableData.splice(index, 1);
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消删除操作',
        })
    })
}

const handleRestPWD = (index: number, row: User) => {
    ElMessageBox.confirm(
        '确定重置用户的密码吗？',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // console.log('重置用户密码')
            const uid = tableData[index].uid;
            request(api.RESTUSERPWD + uid).then(res => {
                console.log(res)
                if (res.data.code == 1) {
                    ElMessage({
                        type: 'success',
                        message: res.data.data,
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.data,
                    })
                }

            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消重置密码操作',
            })
        })


}
</script>
<style scoped lang='less'></style>