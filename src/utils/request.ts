import axios, { type AxiosResponse } from "axios";
// import {useOnlogin} from "../stores/index"
// const loginInfo = useOnlogin();

const request = axios.create({
    // baseURL:"",
    timeout:3000,
    headers:{
        //每次访问都携带token
        // token: localStorage.getItem("token") ,
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
// 请求拦截器
request.interceptors.request.use(config => {
    // 从localStorage中获取token
    const token = localStorage.getItem("token");
    if (token) {
        // 如果存在token，则将其添加到请求头中
        config.headers['token'] = token;
    }
    return config;
}, error => {
    // 请求错误处理
    return Promise.reject(error);
});

//响应拦截器
// request.interceptors.response.use((res)=>{
//     if(res.config.url?.includes("login")){
//         localStorage.removeItem("token");
//     }
//     return res
// })

// 响应拦截 intercept 是拦截的意思 后面加 ors表示什么工具（器） 在计算机中
// request.interceptors.response.use((res:AxiosResponse)=>{
//     // console.log("this respones interceptors print data");
//     //     if(res.config.url?.includes("login")){
//     //             localStorage.removeItem("token");
//     //     }
//     if(res.code == "ERR_BAD_RESPONSE"){
//         alert("无网络连接")
//     }
//     return res;
// })
export default request;