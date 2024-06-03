import axios from "axios";

const request = axios.create({
    // baseURL:"",
    timeout:3000,
    headers:{
        //每次访问都携带token
        token: localStorage.getItem("token") ,
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

export default request;