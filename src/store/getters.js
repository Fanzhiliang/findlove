const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  lang: state => state.view.lang,
}
export default getters
