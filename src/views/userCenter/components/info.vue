<template>
  <div class="info">
    <group label-width="5em">
      <cell title="个人签名" value="这家伙很懒，什么也没留下..." value-align="left"></cell>
      <cell is-link value-align="left" @click.native="isShowCode=true">
        <span slot="title">二维码</span>
        <slot><i class="iconfont icon-code"></i></slot>
      </cell>
    </group>
    <XDialog :show.sync="isShowCode" :hide-on-blur="true" @click.native="isShowCode=false">
      <div class="user-row">
        <img src="/static/img/default-head.gif" alt="">
        <div class="username">{{userInfo.username}}</div>
        <div class="info">扫扫二维码，关注该用户</div>
      </div>
      <img src="/static/img/code.jpg" alt="">
    </XDialog>

    <div class="icons-row">
      <div class="icon-item">
        <i class="iconfont icon-jibenziliao"></i>
        <p>帖子44</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-chatfillmtui"></i>
        <p>消息21</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-group"></i>
        <p>好友45</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-image"></i>
        <p>相册9</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-footer"></i>
        <p>浏览123</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-crown"></i>
        <p>永久会员</p>
      </div>
      <div class="icon-item">
        <i :class="'iconfont icon-level-'+userInfo.level"></i>
        <p>等级</p>
      </div>
    </div>

    <div class="two-col-row">
      <div class="col-item">
        <span class="label">积分</span><span class="value">{{userInfo.integral}}</span>
      </div>
      <div class="col-item">
        <span class="label">签到</span><span class="value">136天</span>
      </div>
    </div>

    <group label-width="5em">
      <cell title="用户ID" :value="userInfo.id"></cell>
      <cell title="性别" :value="'保密'"></cell>
      <cell title="生日" :value="'1996-12-25'"></cell>
      <cell title="在线时间" :value="'42小时'"></cell>
      <cell title="注册时间" :value="'2019-05-01 23:42'"></cell>
      <cell title="最后访问" :value="'2019-05-13 13:31'"></cell>
    </group>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Group,Cell,XDialog} from 'vux'
  export default {
    components: {Group,Cell,XDialog},
    data(){
      return{
        isShowCode: false
      }
    },
    computed:{
      ...mapGetters(['userInfo'])
    },
  }
</script>

