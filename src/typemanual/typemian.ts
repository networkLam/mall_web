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