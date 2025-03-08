import {useNavigationTab} from '../stores/navigation'
const navigation = useNavigationTab();

//路由导航
export function navigationTo(route:string,query:{}={}){
    navigation.navigationTo(route,query);
}
//关闭当前路由
export function closeCurrentRouter(){
    navigation.closeCurrentRoute()
}
