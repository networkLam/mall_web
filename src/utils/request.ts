import axios, { type AxiosResponse } from "axios";



const request = axios.create({
    // baseURL:"",
    timeout:3000,
    headers:{
        //每次访问都携带token
        token: localStorage.getItem("token") ,
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
//
request.interceptors.response.use((res)=>{
    if(res.config.url?.includes("login")){
        localStorage.removeItem("token");
    }
    return res
})

// 响应拦截 intercept 是拦截的意思 后面加 ors表示什么工具（器） 在计算机中
// request.interceptors.response.use((res:AxiosResponse)=>{
//     console.log("this respones interceptors print data");
//         if(res.config.url?.includes("login")){
//                 localStorage.removeItem("token");
//         }
//     return res;
// })
export default request;