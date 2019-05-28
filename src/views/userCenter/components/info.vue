<template>
  <div class="info">
    <group label-width="5em">
      <cell title="个人签名" value="这家伙很懒，什么也没留下..." value-align="left"></cell>
      <cell is-link value-align="left" @tap.native="isShowCode=true">
        <span slot="title">二维码</span>
        <slot><i class="iconfont icon-code"></i></slot>
      </cell>

      <popup-picker title="语言" :data="langList" value-text-align="left" v-model="tempLang" show-name></popup-picker>
    </group>
    <XDialog :show.sync="isShowCode" :hide-on-blur="true" @tap.native="isShowCode=false">
      <div class="user-row">
        <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        <div class="username">{{userInfo.username}}</div>
        <div class="info">扫扫二维码，关注该用户</div>
      </div>
      <img src="http://findloveimg.alcyh.com/code.jpg" alt="">
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
  import {Group,Cell,XDialog,PopupPicker} from 'vux'
  import {langList} from '@/lang'
  
  export default {
    components: {Group,Cell,XDialog,PopupPicker},
    data(){
      return{
        isShowCode: false,
        langList,
        tempLang: []
      }
    },
    watch:{
      tempLang(val,oldVal){
        let lang = val[0] || 'zh';
        this.$store.commit('SET_LANG',lang);
        if(oldVal.length>0){
          this.$router.go(0);
        }
      }
    },
    computed:{
      ...mapGetters(['userInfo','lang'])
    },
    created(){
      this.tempLang = [this.lang];
    }
  }
</script>

