import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/main.min.css"
import './plugins/element.js'//加载elementUi插件

import 'element-ui/lib/theme-chalk/display.css';//加载Elemengt别的属性
import './plugins/filter';//加载过滤器插件

import "./plugins/directive"//加载自定义指令

import axios  from "./plugins/axios.js";//引入封装好的axios
Vue.prototype.axios = axios;



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
