<template>
  <div class="form-wrap">
    <!-- 背景 -->
    <bg></bg>
    <div class="toggle-wrap">
      <div class="toggle-inner">
        <!-- logo -->
        <div class="logo-row" @click="$router.push('/')">
          <img src="/static/img/logo.jpg" alt="">
        </div>
        <!-- 登录框 -->
        <div class="form-panel">
          <div class="form-row">
            <label><svg-icon iconClass="user" className="label-icon"></svg-icon>账号</label>
            <input type="text" placeholder="请输入用户名" autocomplete="off" v-model="dataForm.username">
          </div>
          <div class="form-row suffix">
            <label><svg-icon iconClass="password" className="label-icon"></svg-icon>密码</label>
            <input :type="isShowPassword?'text':'password'" placeholder="请输入密码" autocomplete="new-password" v-model="dataForm.password">
            <svg-icon v-if="isShowPassword" @click="isShowPassword=false" iconClass="eye-open" className="suffix-icon"></svg-icon>
            <svg-icon v-else @click="isShowPassword=true" iconClass="eye" className="suffix-icon"></svg-icon>
          </div>
          <div class="form-row suffix">
            <label><svg-icon iconClass="sure" className="label-icon"></svg-icon>确认</label>
            <input :type="isShowRePassword?'text':'password'" placeholder="请确认密码" autocomplete="new-password" v-model="dataForm.rePassword">
            <svg-icon v-if="isShowRePassword" @click="isShowRePassword=false" iconClass="eye-open" className="suffix-icon"></svg-icon>
            <svg-icon v-else @click="isShowRePassword=true" iconClass="eye" className="suffix-icon"></svg-icon>
          </div>
          <div class="form-row suffix">
            <label>验证码</label>
            <input type="text" placeholder="关注公众号获得" autocomplete="off" v-model="dataForm.code">
            <svg-icon iconClass="code" className="suffix-icon" @click="isShowCode=true"></svg-icon>
          </div>
          <XButton type="primary" class="b-but" @click.native="submitData">注册</XButton>
          <div class="link-row">
            <router-link :to="'/login'" class="l">已有账号？马上登录>>></router-link>
          </div>
        </div>
      </div>
    </div>

    <XDialog :show.sync="isShowCode" :hide-on-blur="true">
      <img src="/static/img/code.jpg" alt="">
      <p class="tip">
        关注公众号，发送"注册"二字即可获得验证码
      </p>
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


