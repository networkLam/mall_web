<script lang="ts" setup>
import {reactive,ref,onMounted,onBeforeMount} from "vue";
import request from "../utils/request"
import api from '../utils/api'
import type { InfoInf } from "../typemanual/typemian";
const info = reactive<InfoInf>({
  entry_time: "",
  gender: "",
  name: "",
  phone: ""
})
request(api.PROFILE).then(res=>{
      const {entry_time,gender,name,phone} =  res.data.data;
      // console.log(entry_time)
      info.entry_time = entry_time.split("T")[0];
      info.gender = gender;
      info.name = name;
      info.phone = phone;
  })
</script>
<template>
    <!-- 这是根标签 -->
    <div class="wrapper">   
       <div class="box">
        <!-- 标题 -->
        <div class="title"><span>个人信息</span></div>
        <!-- 头像 暂无 -->

          <!-- <div class="avatar"><img src="/src/assets/avatar.jpg" alt=""></div> -->
          <div class="avatar">
             <img src="/src/assets/avatar.jpg" alt="用户头像" class="user_avatar">
           </div>
          <div class="name layout">
            <div>姓名</div> <div> {{ info.name }} </div>
          </div>
          <!-- 手机号码 -->
          <div class="phone layout">
            <div>手机号码</div> <div>{{ info.phone }}</div>
          </div>
          <!-- 角色 -->
          <div class="role layout">
            <div>所属角色</div> <div>{{ "超级管理员" }}</div>
          </div>
          <!-- 入职入职 -->
          <div class="entry layout">
            <div>入职时间</div> <div>{{ info.entry_time }}</div>
          </div>
       </div>
    </div>
  </template>
<style scoped> 
.wrapper{
  margin-left: 10px;
}
.title{
  padding: 12px 0 12px 12px;
  color: black;
  font-size: 22px;
  font-weight: 700;

}
.box{
  width: 350px;
  background-color: #FFDB6D;
  border-radius: 16px;
  box-shadow: 5px 2px 6px #888;
  height: auto;
}
.layout{
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  border-top: 1px solid #FFA89B;
  font-size: 18px;
}


.avatar{
text-align: center;
border-top: 1px solid #FFA89B;
margin-top: 12px;
padding: 12px 0 12px 0;
}
.user_avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    
}
</style>