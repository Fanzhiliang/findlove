<template>
  <div class="userCenter">
    <div class="userInfo">
      <div class="top-row">
        <div class="head-wrap">
          <img src="/static/img/default-head.gif" alt="">
        </div>
        <h3 class="textShadowBlack">{{userInfo.username}}</h3>
        <p class="textShadowBlack"><span :style="{'background-color': levelList[userInfo.level-1].color}">Lv{{userInfo.level}}</span>永久会员</p>
      </div>
      <div class="bottom-bg bg1"></div>
      <div class="bottom-bg bg2"></div>
    </div>

    <ScrollTab v-model="tabIndex" :list="tabList" :scrollTop="tabLimit" :fixedTop="'2.3rem'"/>

    <component :is="tabList[tabIndex].component"></component>

    <div class="footer-wrap">
      <div class="center-footer">
        <div class="footer-item" @click="addFriend">
          <span><i class="iconfont icon-tianjiayonghu"></i>加好友</span>
        </div>
        <div class="footer-item" @click="$router.push('/chat')">
          <span><i class="iconfont icon-chatlinemtui"></i>聊天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {levelList} from '@/data'
  import {Tab,TabItem,Group,Cell,XDialog} from 'vux'
  import info from './components/info'
  import post from './components/post'
  import photo from './components/photo'
  import friend from './components/friend'
  import msg from './components/msg'
  import follow from './components/follow'
  import ScrollTab from '@/components/ScrollTab'
  export default {
    components: {Tab,TabItem,Group,Cell,XDialog,info,post,photo,friend,msg,follow,ScrollTab},
    data(){
      return{
        path: '',
        levelList,
        tabList: [
          {name:'资料',component:'info'},
          {name:'帖子',component:'post'},
          {name:'相册',component:'photo'},
          {name:'好友',component:'friend'},
          {name:'消息',component:'msg'},
          {name:'关注',component:'follow'},
        ],
        tabIndex: 0,
        tabLimit: 0,
      }
    },
    computed:{
      ...mapGetters(['userInfo'])
    },
    watch:{
      $route(route){
        console.log(route)
        this.path = typeof route.params.path != 'undefined' ? route.params.path : '';
      }
    },
    methods:{
      addFriend(){
        this.$vux.confirm.show({
          title: '确定发送好友申请？',
          onConfirm: ()=>{
            this.$vux.toast.show({text:'发送成功，没有接口，你可以点击聊天进入聊天界面'});
          }
        })
      }
    },
    mounted(){
      this.tabLimit = document.querySelector('.userCenter .userInfo').clientHeight;
    }
  }
</script>


<style lang="scss">
  @import '../../styles/views/userCenter.scss';
</style>
