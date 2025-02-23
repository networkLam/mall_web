import {useNavigationTab} from '../stores/navigation'
const navigation = useNavigationTab();

//路由导航
export function navigationTo(route:string){
    navigation.navigationTo(route);
}