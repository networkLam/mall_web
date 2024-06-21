export default {
    LOGIN:"/api/administrator/login",//登录接口
    PROFILE:"/api/administrator/info",//获取管理员信息
    PRODUCTCOUNT:"/api/product/count",//获取商品的总个数
    PRODUCTQUERY:"/api/product/page/",//分页获取商品信息 start 是第几页
    GETPICTUREDETAIL:"/api/picture/detail", //获取详情页面的图片数据
    UPLOADSFILE:"/api/uploads/detail",//上传详情页图片
    DELETEDETAILPICTURE:"/api/delete/picture",//删除详情页图片数据
    UPDATEPRODUCTINFO:"/api/product/update",//更新商品信息
    ADDPRODUCTINFO:"/api/product/add",//添加商品信息
    ORDERLIST:"/api/order",//获取不同状态的订单数据
    ORDERCOUNT:"/api/order/count",//获取不同状态订单的数量（总数
    ORDERDETAIL:"/api/order/detail",//获取订单的详细信息
    ORDERUPDATE:"/api/order/update",//订单更行
    PRODUCTINFO:"/api/product/info",//根据商品id获取商品的信息
    LOGINFO:"/api/handle/msg",//查看商品的处理日志
    MANAGEINFO:"/api/administrator/action",//根据管理员的id返回个人信息
    ORDERINFO:"/api/order/info",//根据订单的ID返回订单的编号
    GETLOGTOTAL:"/api/handle/count",//处理商品日志的总数量
    PRODUCTLOG:"/api/Mange/show",//订单日志
    LOGORDERCOUNT:"/api/log/order/count",//商品日志的
    LOGORDER:"/api/log/product",
    GETUSERTOTAL:"/api/user/total",//获取用户总数
    GETUSERINFO:"/api/user/info?start=",//分页获取用户信息
    UPDATEUSERNAME:"/api/user/update/name",//更新用户名
    RESTUSERPWD:"/api/user/rest/pwd?uid=",//重置用户密码

}