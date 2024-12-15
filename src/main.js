import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from './utils/request';

Vue.use(ElementUI, {
  size: "mini"
});
Vue.config.productionTip = false
// 创建axios请求实例，定义接口根地址
// Vue全局
// import http from './http';
Vue.prototype.request = request

new Vue({
  router,
  ElementUI,
  render: h => h(App),
}).$mount('#app')