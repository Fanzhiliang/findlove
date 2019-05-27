<template>
  <div class="form-wrap">
    <!-- 背景 -->
    <bg></bg>
    <div class="toggle-wrap">
      <div class="toggle-inner">
        <!-- logo -->
        <div class="logo-row" @click="$router.push('/')">
          <img src="http://findloveimg.alcyh.com/logo.jpg" alt="">
        </div>
        <!-- 登录框 -->
        <div class="form-panel">
          <div class="form-row">
            <label><svg-icon iconClass="user" className="label-icon"></svg-icon>{{$t('username')}}</label>
            <input type="text" :placeholder="$t('placeholder.username')" autocomplete="off" v-model="dataForm.username">
          </div>
          <div class="form-row suffix">
            <label><svg-icon iconClass="password" className="label-icon"></svg-icon>{{$t('password')}}</label>
            <input :type="isShowPassword?'text':'password'" :placeholder="$t('placeholder.password')" autocomplete="new-password" v-model="dataForm.password">
            <svg-icon v-if="isShowPassword" @click="isShowPassword=false" iconClass="eye-open" className="suffix-icon"></svg-icon>
            <svg-icon v-else @click="isShowPassword=true" iconClass="eye" className="suffix-icon"></svg-icon>
          </div>
          <div class="form-row suffix">
            <label><svg-icon iconClass="sure" className="label-icon"></svg-icon>{{$t('rePassword')}}</label>
            <input :type="isShowRePassword?'text':'password'" :placeholder="$t('placeholder.rePassword')" autocomplete="new-password" v-model="dataForm.rePassword">
            <svg-icon v-if="isShowRePassword" @click="isShowRePassword=false" iconClass="eye-open" className="suffix-icon"></svg-icon>
            <svg-icon v-else @click="isShowRePassword=true" iconClass="eye" className="suffix-icon"></svg-icon>
          </div>
          <div class="form-row suffix">
            <label>{{$t('code')}}</label>
            <input type="text" :placeholder="$t('placeholder.code')" autocomplete="off" v-model="dataForm.code">
            <svg-icon iconClass="code" className="suffix-icon" @click="isShowCode=true"></svg-icon>
          </div>
          <XButton type="primary" class="b-but" @click.native="submitData">{{$t('register')}}</XButton>
          <div class="link-row">
            <router-link :to="'/login'" class="l">{{$t('goLogin')}}>>></router-link>
          </div>
        </div>
      </div>
    </div>

    <XDialog :show.sync="isShowCode" :hide-on-blur="true">
      <img src="http://findloveimg.alcyh.com/code.jpg" alt="">
      <p class="tip">{{$t('followWechatTip')}}</p>
      <div @click="isShowCode=false"><span class="vux-close"></span></div>
    </XDialog>
    
  </div>
</template>

<script>
  import { XButton,XDialog  } from 'vux'
  import bg from './components/bg'
  export default{
    components:{XButton,XDialog,bg},
    data(){
      return{
        isShowPassword: false,//是否显示密码
        isShowRePassword: false,
        isShowCode: false,//是否显示二维码
        dataForm:{
          username: '',
          password: '',
          rePassword: '',
          code: ''
        }
      }
    },
    methods:{
      submitData(){
        if(!this.dataForm.username){
          this.$vux.toast.show({text: '账号不能为空'});
        }else if(!this.dataForm.password){
          this.$vux.toast.show({text: '密码不能为空'});
        }else if(!this.dataForm.rePassword){
          this.$vux.toast.show({text: '请确认密码'});
        }else if(this.dataForm.password != this.dataForm.rePassword){
          this.$vux.toast.show({text: '密码不相同'});
        }else if(!this.dataForm.code || this.dataForm.code.length != 6){
          this.$vux.toast.show({text: '请输入6位的验证码'});
        }else{
          this.$vux.loading.show({text: '注册中'});
          this.$store.dispatch('register',this.dataForm).then(()=>{
            this.$vux.loading.hide();
            this.$router.push('/');
          })
        }
      }
    },
  }
</script>

<style lang="scss">
  @import '../../styles/views/formpage.scss';
</style>


