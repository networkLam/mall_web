<script lang="ts" setup>
// 这是登录界面
import request from '@/utils/request'
import API from "@/utils/api";
import { reactive } from 'vue'
import { useRouter } from "vue-router"
import { useOnlogin } from "../stores/index"
import { ElMessage } from 'element-plus'
import type { LoginInfo, Result } from '@/typemanual/typemian';
import type { AxiosResponse } from 'axios';
const account_msg = reactive({
    phone: "",
    m_pwd: ""
})
const OnLogin = useOnlogin();
const router = useRouter();
//初始化的时候将localstorage的token赋给storage
const determineToken = localStorage.getItem("token")
if(determineToken){
    OnLogin.setToken(determineToken)
} 

function onSubmit() {
    const data = {
        phone: account_msg.phone,
        user_pwd: account_msg.m_pwd
    }
    request({
        method: 'post',
        url: "/api/login",
        data
    }).then((res: AxiosResponse<LoginInfo>) => {
        // console.log(res.code)
        console.log(res.data);
        if (res.data.code == "1") {
            OnLogin.setToken(res.data.data.token as string)
            OnLogin.setUserInfo(res.data.data.user)
            //take userInfo to localStorage
            localStorage.setItem("userInfo",JSON.stringify(res.data.data.user))
            if(res.data.data.user.roles.includes("admin")){
                router.push("/home")
            }else{
                ElMessage.error("该账号无法登录该系统")
            }
        } else {
            //this tips login error information 
            if (res.data.msg != null) {
                ElMessage.error(res.data.msg)
            } else {
                ElMessage.error(res.data.msg)
            }
        }
    })
}

function forget() {
    ElMessage.error("功能尚未开发！")
}
</script>

<template>
    <div class="warpper">
        <!-- 这是中间的block -->
        <div class="content">
            <!-- 内容区 -->
            <div class="title">
                <span class="text">后台管理系统</span>
            </div>
            <div class="login">
                <div class="img"><img src="../assets/login_img.jpg" alt="" width="100%"></div>
                <div class="form">
                    <span class="text">Welcome Back :)</span>
                    <div class="descript"><span>让每个人都享受科技带来的便利🎈</span></div>
                    <div>
                        <!-- 这是表单区 -->
                        <div class="" style="border-radius: 12px;">
                            <!-- 账号 -->
                            <form action="" enctype="application/x-www-form-urlencoded">
                                <div class="account" style="border-radius: 12px 12px 0 0;">
                                    <div style="margin-left: 10px;margin-top: 5px;"><el-icon :size="24">
                                            <Message color="#dcdfe7" />
                                        </el-icon></div>
                                    <div style="margin-left: 10px;margin-left: 20px;">
                                        <div style="margin-top: 1px;margin-bottom: 1px;"><span
                                                style="color: #cbcfda;font-size: 16px;">账号</span></div>
                                        <input type="text"
                                            style="border: 0;width: 170px;height: 30px;font-size: 16px;outline: none;"
                                            v-model="account_msg.phone">
                                    </div>
                                </div>

                                <div>
                                    <!--   密码 -->
                                    <div class="account" style="border-radius: 0 0  12px 12px ;">
                                        <div style="margin-left: 10px;margin-top: 5px;">
                                            <el-icon :size="24">
                                                <Lock color="#dcdfe7" />
                                            </el-icon>
                                        </div>
                                        <div style="margin-left: 10px;margin-left: 20px;">
                                            <div style="margin-top: 1px;margin-bottom: 1px;"><span
                                                    style="color: #cbcfda;font-size: 16px;">密码</span></div>
                                            <input type="password"
                                                style="border: 0;width: 170px;height: 30px;font-size: 18px; outline: none;"
                                                v-model="account_msg.m_pwd">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div style="margin-top: 40px;margin-left: 20px;">
                            <el-row class="mb-4">
                                <el-button type="primary" round @click="onSubmit">登录</el-button>
                                <span style="margin-left: 22px;"> <el-button round @click="forget">忘记密码</el-button>
                                </span>
                            </el-row>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.warpper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100vh;
    background: #f5f6f6;

}

.content {
    top: 12%;
    background: #f8fafb;
    width: 850px;
    height: 450px;
    box-shadow: 4px 3px 10px 1px #888888ad;
    border-radius: 12px;
}

.title {
    position: relative;
    top: 10px;
    left: 19px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #1a96ee;
}

.title .text {
    font-size: 18px;
}

.bottom {
    display: block;
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img {
    /* width: 50%; */
    /* background: green; */
    width: 60%;
}

.form {
    /* background: yellow; */
    width: 40%;
}

.form .text {
    font-weight: 500;
    font-size: 30px;
    ;
    /* font-family: 'Times New Roman', Times, serif; */
    color: #0b1c33;
}

.form .descript {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 13px;
    color: #a6adbb;
}

.login .account {
    display: flex;
    background: white;
    width: 85%;
}
</style>