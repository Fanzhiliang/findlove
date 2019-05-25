import Vue from 'vue'
import { register, login, getUserByToken } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const user = {
  state: {
    userInfo: undefined,
    token: getToken(),
  },

  mutations: {
    SET_USERINFO(state, userInfo){
      Vue.set(state,'userInfo',userInfo);
    },
    SET_TOKEN(state, token){
      Vue.set(state,'token',token);
      setToken(token);
    },
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      return new Promise((resolve,reject)=>{
        login(userInfo).then((data)=>{
          if(data.err_code == 0 && data.user){
            commit('SET_USERINFO',data.user);
            if(data.user.token){
              commit('SET_TOKEN',data.user.token);
            }
          }
          resolve(data);
        }).catch(error=>reject(error))
      })
    },
    // 注册
    register({ commit }, userInfo) {
      return new Promise((resolve,reject)=>{
        register(userInfo).then((data)=>{
          if(data.err_code == 0 && data.user){
            commit('SET_USERINFO',data.user);
            if(data.user.token){
              commit('SET_TOKEN',data.user.token);
            }
          }
          resolve(data);
        }).catch(error=>reject(error))
      })
    },
    //根据token获得用户信息
    getUserByToken({ commit }, token) {
      return new Promise((resolve,reject)=>{
        getUserByToken({token}).then((data)=>{
          if(data.err_code == 0 && data.user){
            commit('SET_USERINFO',data.user);
            if(data.user.token){
              commit('SET_TOKEN',data.user.token);
            }
          }
          resolve(data);
        }).catch(error=>reject(error))
      })
    },
    //退出登录
    logout({ commit }){
      return new Promise((resolve,reject)=>{
        commit('SET_USERINFO',undefined);
        commit('SET_TOKEN','');
        resolve();
      })
    }

  }
}

export default user
