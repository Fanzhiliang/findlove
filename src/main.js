// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill"
import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'

//重置、图标、常用样式
import '@/styles/reset/reset.css';
import '@/styles/icons/iconfont.css';
import '@/styles/common.scss';

//vux框架
import  { AlertPlugin,ToastPlugin,LoadingPlugin,ConfirmPlugin } from 'vux'
//ElementUI框架
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
//有关element-ui的样式
import '@/styles/reset/element-ui.scss'
//有关vux的样式
import '@/styles/reset/vux.less'
//全局样式变量
import '@/styles/variables.scss'
//图片懒加载
import src404 from '@/assets/img/bg-404.png'
import srcloading from '@/assets/img/bg-loading.gif'
import VueLazyload from 'vue-lazyload'
//图标
import './icons'
//rem
import './utils/rem.js'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin,{position: 'middle',type: 'text'})
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  error: src404,
  loading: srcloading
})

FastClick.attach(document.body)//解决移动端click延时问题

Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
