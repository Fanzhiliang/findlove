import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import NProgress from 'nprogress' //顶部进度条
import 'nprogress/nprogress.css' //顶部进度条样式
import layout from '@/views/layout'

// NProgress.configure({
//   showSpinner: false
// }); //关闭右上角loding图标

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }), //跳转默认会回到顶部
  routes: [{
      path: '/',
      component: layout,
      children: [{
          path: '/',
          component: () => import('@/views/index'),
          meta: {
            title: '首页',
            isShowSearch: true
          }
        },
        {
          path: '/community',
          component: () => import('@/views/community'),
          meta: {
            title: '社区',
            isShowSearch: true
          }
        },
        {
          path: '/vip',
          component: () => import('@/views/vip'),
          meta: {
            title: 'vip',
            isShowLeft: true,
            isShowHome: true
          }
        },
        {
          path: '/sign',
          component: () => import('@/views/sign'),
          meta: {
            title: '签到',
            isShowLeft: true
          }
        },
        {
          path: '/search',
          component: () => import('@/views/search'),
          meta: {
            title: '搜索',
            isShowLeft: true
          }
        },
        {
          path: '/publish',
          component: () => import('@/views/publish'),
          meta: {
            title: '发帖',
            isShowLeft: true,
            hideFooter: true
          }
        },
        {
          path: '/userCenter',
          component: () => import('@/views/userCenter'),
          meta: {
            title: '用户中心',
            isShowLeft: true,
            isShowMore: true,
            hideFooter: true,
            isTransparent: true
          }
        },
        {
          path: '/userCenter/edit',
          component: () => import('@/views/userCenter/edit'),
          meta: {
            title: '资料设置',
            isShowLeft: true
          }
        },
        {
          path: '/blindDate/list',
          component: () => import('@/views/blindDate/list'),
          meta: {
            title: '相亲列表',
            isShowLeft: true,
            isShowSearch: true,
            isShowEdit: true
          }
        },
        {
          path: '/blindDate/detail/:id',
          component: () => import('@/views/blindDate/detail'),
          meta: {
            title: '相亲详情',
            isShowLeft: true,
            hideFooter: true
          }
        },
        {
          path: '/activity/list',
          component: () => import('@/views/activity/list'),
          meta: {
            title: '活动列表',
            isShowLeft: true,
            isShowSearch: true,
            isShowEdit: true
          }
        },
        {
          path: '/activity/detail/:id',
          component: () => import('@/views/activity/detail'),
          meta: {
            title: '活动详情',
            isShowLeft: true,
            hideFooter: true
          }
        },
        {
          path: '/post/list',
          component: () => import('@/views/post/list'),
          meta: {
            title: '帖子列表',
            isShowLeft: true,
            isShowSearch: true,
            isShowEdit: true
          }
        },
        {
          path: '/post/detail/:id',
          component: () => import('@/views/post/detail'),
          meta: {
            title: '帖子详情',
            isShowLeft: true,
            hideFooter: true
          }
        },
        {
          path: '/chat',
          component: () => import('@/views/chat'),
          meta: {
            title: '聊天界面',
            isShowLeft: true,
            hideFooter: true
          }
        },
        {
          path: '/errorpage/:type',
          component: () => import('@/views/errorpage'),
          meta: {
            title: '网站错误',
            hideFooter: true,
            isShowLeft: true
          }
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/formpage/login'),
      meta: {
        title: '登录',
        hideHeader: true,
        hideFooter: true
      }
    },
    {
      path: '/register',
      component: () => import('@/views/formpage/register'),
      meta: {
        title: '注册',
        hideHeader: true,
        hideFooter: true
      }
    },
    {
      path: '/forget',
      component: () => import('@/views/formpage/forget'),
      meta: {
        title: '忘记密码',
        hideHeader: true,
        hideFooter: true
      }
    },
    {
      path: '*',
      redirect: '/errorpage/404'
    },
  ]
})

let whiteList = ['/login', '/register', '/forget']; //不用登录验证的页面

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (whiteList.includes(to.path)) { //不用验证的页面
    next();
  } else {
    if (store.getters.token) {
      store.dispatch('getUserByToken', store.getters.token).then((data) => {
        next();
      }).catch(() => {
        Vue.$vux.toast.show({
          text: '登录信息有误，请重新登录'
        });
        next({
          path: '/login'
        });
        NProgress.done();
      })
    } else {
      Vue.$vux.toast.show({
        text: '你还没登录，请登录'
      });
      next({
        path: '/login'
      });
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  let wrap = document.querySelector(".router-wrap");
  if (wrap) {
    wrap.scrollTop = 0; //跳转默认会回到顶部
  }
  NProgress.done();
})

export default router;
