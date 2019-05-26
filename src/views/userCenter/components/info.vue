<template>
  <div class="info">
    <group label-width="5em">
      <cell :title="$t('signature')" value="这家伙很懒，什么也没留下..." value-align="left"></cell>
      <cell is-link value-align="left" @click.native="isShowCode=true">
        <span slot="title">{{$t('QRCode')}}</span>
        <slot><i class="iconfont icon-code"></i></slot>
      </cell>

      <popup-picker :title="$t('languageText')" :data="langList" value-text-align="left" v-model="tempLang" show-name :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></popup-picker>
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
        <p>{{$t('post')}}44</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-chatfillmtui"></i>
        <p>{{$t('message')}}21</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-group"></i>
        <p>{{$t('friends')}}45</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-image"></i>
        <p>{{$t('photos')}}9</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-footer"></i>
        <p>{{$t('browse')}}123</p>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-crown"></i>
        <p>{{$t('permanentMember')}}</p>
      </div>
      <div class="icon-item">
        <i :class="'iconfont icon-level-'+userInfo.level"></i>
        <p>{{$t('level')}}</p>
      </div>
    </div>

    <div class="two-col-row">
      <div class="col-item">
        <span class="label">{{$t('integral')}}</span><span class="value">{{userInfo.integral}}</span>
      </div>
      <div class="col-item">
        <span class="label">{{$t('sign')}}</span><span class="value">136天</span>
      </div>
    </div>

    <group label-width="6em">
      <cell :title="$t('userID')" :value="'234324'"></cell>
      <cell :title="$t('gender')" :value="'保密'"></cell>
      <cell :title="$t('birthday')" :value="'1996-12-25'"></cell>
      <cell :title="$t('onlineTime')" :value="'42小时'"></cell>
      <cell :title="$t('registerTime')" :value="'2019-05-01 23:42'"></cell>
      <cell :title="$t('lastVisit')" :value="'2019-05-13 13:31'"></cell>
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

