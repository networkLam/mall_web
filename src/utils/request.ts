import axios from "axios";

const request = axios.create({
    // baseURL:"",
    timeout:3000,
    // headers:{
    //     "token": localStorage.getItem("token") == null ? ""  : localStorage.getItem("token") ,
    //     'Content-Type': 'application/json;charset=UTF-8'
    // }
})

export default request;