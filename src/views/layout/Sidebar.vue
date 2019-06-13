<template>
  <div class="sidebar">
    <div class="userInfo" @click="$router.push('/userCenter')">
      <div class="top-row">
        <div class="head-wrap">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
      </div>
      <div class="middle-row textShadowBlack">
        你好，{{typeof userInfo != 'undefined' ?  userInfo.username : '请登录'}}
      </div>
      <div class="bottom-row">
        <p class="ellipsis textShadowBlack">祝你早日暴富，生活愉快</p>
        <span @click.stop="logout"><i class="iconfont icon-enter"></i>{{$t('logout')}}</span>
      </div>
      <div class="bottom-bg bg1"></div>
      <div class="bottom-bg bg2"></div>
    </div>

    <div class="router-list">
      <div class="list-inner">
        <div class="router-row" v-for="item in routerList" :key="item.name" @click="geRouter(item.path)">
          <i :class="['iconfont','icon-'+item.icon]" :style="{color:item.color}"></i><span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    props: ['isShow'],
    data(){
      return{
        routerList: [//好看的颜色 #9DCA08 #91B9EB #F37D7D
          {name: this.$t('index'),path: '/',icon: 'home',color:'#3EBBFD'},
          {name: this.$t('community'),path: '/community',icon: 'chat2',color:'#FFB300'},
          {name: this.$t('sign'),path: '/sign',icon: 'Sign',color:'#DA99DB'}
        ]
      }
    },
    computed:{
      ...mapGetters(['userInfo'])
    },
    methods:{
      logout(){
        this.$vux.confirm.show({
          title: this.$t('logoutTip'),
          confirmText: this.$t('confirm'),
          cancelText: this.$t('cancel'),
          onConfirm : () => {
            this.$store.dispatch('logout').then((data)=>{
              this.$vux.toast.show({text:this.$t('logoutSuccess')});
              this.$router.push('/login');
            })
          }
        })
      },
      geRouter(path){
        this.$emit('update:isShow',false);//隐藏侧边栏
        this.$router.push(path);
      }
    }
  }
</script>

<style lang="less">
  @keyframes bg-move{
    from {background-position-x:0%;}
    to {background-position-x:450px;}
  }
  .sidebar{
    width: 14rem;
    height: 100%;
    background-color: #fff;
    position: relative;
    .userInfo{
      height: 8.5rem;
      padding: 0 0.6rem;
      background-image: url('http://findloveimg.alcyh.com/sidebar_bg.jpg');
      background-size: cover;
      position: relative;
      overflow: hidden;
      z-index: 9;
      cursor: pointer;
      .top-row{
        height: 2.6rem;
        padding: 0.7rem 0;
        .head-wrap{
          width: 2.6rem;
          height: 2.6rem;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 50%;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .middle-row{
        font-size: 1rem;
        color: #fff;
        font-weight: 100;
        line-height: 1.5rem;
        height: 1.5rem;
        padding-bottom: 0.3rem;
      }
      .bottom-row{
        height: 1rem;
        p{
          width: 8rem;
          display: inline-block;
          color: #fff;
          font-size: 0.5rem;
          height: 0.7rem;
          line-height: 0.7rem;
        }
        span{
          float: right;
          height: 1rem;
          background-color: rgba(0,0,0,0.5);
          color: #fff;
          font-size: 0.5rem;
          margin-top: -0.2rem;
          padding: 0.2rem 0.4rem;
          line-height: 1rem;
          border-radius: 3px;
          i{
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.3rem;
            font-size: 0.6rem;
          }
        }
      }
      .bottom-bg{
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 25px;
        background-repeat: repeat-x;
        background-size: 450px;
        &.bg1{
          bottom: 0;
          background-image: url('http://findloveimg.alcyh.com/comiis_a.svg');
          animation: bg-move 4s infinite linear;
        }
        &.bg2{
          background-image: url('http://findloveimg.alcyh.com/comiis_b.svg');
          animation: bg-move 5s infinite linear;
        }
      }
    }
    .router-list{
      height: 100%;
      padding-top: 8.5rem;
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      box-sizing: border-box;
      overflow: hidden;
      .list-inner{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding-right: 17px;
        .router-row{
          font-size: 0.8rem;
          font-weight: 100;
          padding: 0.2rem 0.6rem;
          cursor: pointer;
          i{
            margin-right: 0.6rem;
            margin-left: 0.3rem;
            display: inline-block;
            vertical-align: middle;
            font-size: 1rem;
          }
          span{
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>


