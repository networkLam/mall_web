export interface TEST {
  name: string
  ID: string
  toString(): string
  setName(name: string): void
  getID(): string
}
//用户信息的接口
export interface UserInfo {
  name: string
  age: number
}

export interface InfoInf {
  entry_time: string
  gender: string
  name: string
  phone: string
}

export interface Result {
  code: string
  data: object | string
  msg: string
}
//分页查询商品的接口内容
export interface ProductList {
  p_describe: string //描述
  p_name: string //产品名
  pd_id: string //产品id
  pd_type: string //产品类型
  picture_name: string //产品图片
  price: string //产品价格
  state: string //产品状态
  time: string //入库时间
}

export interface UserEditForm {
  pd_id: string
  price: string
  state: string
  p_name: string
  p_describe: string
  picture_name: string
  pd_type: string
  time: string
}

//详情图片返回的数据
export interface PictureDetail {
  pt_id: string //详情图片数据库的主键
  pt_path: string //图片路径
  pd_id: string //绑定的商品id
}

export interface OrderList {
  add_id: string //地址id
  address: string//地址
  amount: string //数量
  contacts: string //联系人
  exp_id: string //快递编号
  money: string //总钱数
  order_id: string //订单id（数据主键）
  order_number: string //订单编号
  phone: string //联系人手机
  state: string //订单状态
  time: string //时间
  uid?: string //用户id（即是那位用户购买的）
}
