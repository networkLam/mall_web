export interface TEST{
    name : string
    ID :string
    toString():string,
    setName(name:string):void,
    getID():string
}
//用户信息的接口
export interface UserInfo{
    name:string
    age:number
}

export interface InfoInf{
    entry_time: string,
    gender:string,
    name:string,
    phone:string
}

export interface Result{
    code : string,
    data:object | string 
    msg:string,
}
//分页查询商品的接口内容
export interface ProductList{
    p_describe : string, //描述
    p_name : string, //产品名
    pd_id : string, //产品id
    pd_type : string, //产品类型
    picture_name : string, //产品图片
    price : string, //产品价格
    state : string, //产品状态
    time? : string, //入库时间
}

export interface UserEditForm{
    pd_id: string,
  price: string,
  state: string,
  p_name: string,
  p_describe: string,
  picture_name: string,
  pd_type: string,
}