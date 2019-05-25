import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

axios.defaults.headers = {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"};

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken()
    // }
    if(config.method === 'post') {
      config.data = Qs.stringify(config.data);
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use((res)=>{
  let data = res.data;
  if(data.err_code == 0){//无错误，返回data
    return data;
  }else if(data.err_code == 1){//登录错误，返回登录界面
    Vue.$vux.alert.show({
      title: '提示',content: '还没登录请前往登录',
      onHide () {
        window.location.href = '/login';
      }
    })
  }else{//其它错误，报错
    Vue.$vux.loading.hide();//把loading都关掉
    Vue.$vux.toast.show({text: data.msg||'未知错误'});
    return Promise.reject(data.msg);
  }
},(error)=>{
  console.error(error);
  return Promise.reject(error);
})

export default service
