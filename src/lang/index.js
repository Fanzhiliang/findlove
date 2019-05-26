import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.getters && store.getters.lang ? store.getters.lang : 'zh',
  messages: {
    en: require('./en'),
    zh: require('./zh'),
    tw: require('./tw'),
  }
})

export default i18n;

export const langList = [
  [
    {name:'English',value:'en'},
    {name:'简体中文',value:'zh'},
    {name:'繁體中文',value:'tw'},
  ]
]