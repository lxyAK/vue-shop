import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import '../src/assets/font/iconfont.css'
// 配置 axios
import axios from 'axios'
// 配置请求的基准URL地址
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
