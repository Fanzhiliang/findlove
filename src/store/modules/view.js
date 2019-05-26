import Vue from 'vue'
import Cookies from 'js-cookie'
const langKey = 'findlove_lang';

const view = {
  state: {
    lang: typeof Cookies.get(langKey) != 'undefined' && Cookies.get(langKey)  ? Cookies.get(langKey) : 'zh',
  },

  mutations: {
    SET_LANG(state, lang){
      Vue.set(state,'lang',lang || 'zh');
      Cookies.set(langKey,lang || 'zh');
    },
  },

  actions: {
    
  }
}

export default view
