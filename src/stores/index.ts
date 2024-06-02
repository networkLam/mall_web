import { defineStore} from  "pinia"
export const useOnlogin = defineStore('login',{
    state:()=>{
      return{
        token : "",
        counter : 0,
        userName : ""
      }
    },
    getters : {
      getUserName(state):string{
       if(localStorage.getItem('username') != null ){
        state.userName = localStorage.getItem('username') as string;
       } 
       return state.userName == null ? 'undefined':state.userName;
      },
      getToken(state):string{
        return state.token;
      }
    },
    //可以做同步异步操作
    actions:{
        //可以在actions里面定义函数去修改state里面的值
        changeCounter(num:number){
            this.counter = num;
        },
        setToken(userToken:string):void{
          if(userToken !=null && typeof userToken == 'string'){
            localStorage.setItem('token',userToken);
            this.token  = userToken;
          }
        },
        setUserName(userName:string){
          if(userName !=null && typeof userName == 'string'){
            localStorage.setItem('username',userName)
            this.userName = userName;
          }
        },
        
    }
  })
  