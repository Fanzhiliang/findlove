import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import view from './modules/view'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    view
  },
  getters
})

export default store
