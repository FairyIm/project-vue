import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
Vue.config.productionTip = false
// 三级联动组件(全局组件)
import TypeNav from '@/components/TypeNav';
// 轮播图组件
import Swiper from '@/components/Swiper';
// 分页器组件
import Pagination from '@/components/pagination';
// elementUI
import {MessageBox } from 'element-ui';

/*第一个参数：全局组件的名字；第二个：哪一个组件 */
Vue.component(TypeNav.name,TypeNav);
Vue.component(Swiper.name,Swiper);
Vue.component(Pagination.name,Pagination);
Vue.component(MessageBox.name,MessageBox);

import store from './store';
import '@/mock/mockService';
import 'swiper/css/swiper.css';
// 引入api
import * as API from '@/api';


// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 图片懒加载默认图片
import logo from '@/assets/logo.png'
Vue.use(VueLazyload,{
  loading:logo,
})
import myPlunins from '@/plugins/myPlugins'

Vue.use(myPlunins,{
  name:'upper'
})

import validate from '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  // 注册路由,组件身上会有$router和$route属性
  router,
  //注册仓库：组件实例身上多出$store属性
  store
}).$mount('#app')
