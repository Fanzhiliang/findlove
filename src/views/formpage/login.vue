<template>
  <div class="form-wrap">
    <!-- 背景 -->
    <bg></bg>
    <div :class="['toggle-wrap','step'+step]">
      <!-- 表单信息 -->
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
          <XButton type="primary" class="b-but" @click.native="goPuzzle">{{$t('login')}}</XButton>
          <div class="link-row">
            <router-link :to="'/register'" class="l">{{$t('register')}}</router-link>
            <router-link :to="'/forget'" class="r">{{$t('forget')}}</router-link>
          </div>
        </div>
      </div>
      <!-- 验证 -->
      <div class="toggle-inner">
        <div class="form-panel">
          <div class="puzzle-row">
            <Puzzle ref="puzzle" @finalHandler="submitData"/>
          </div>
          <XButton type="primary" class="b-but" @click.native="step=1">{{$t('back')}}</XButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import Puzzle from '@/components/Puzzle'
  import bg from './components/bg'
  export default{
    components:{XButton,Puzzle,bg},
    data(){
      return{
        isShowPassword: false,//是否显示密码
        dataForm:{
          username: '',
          password: ''
        },
        step: 1
      }
    },
    methods:{
      goPuzzle(){
        if(!this.dataForm.username){
          this.$vux.toast.show({text: '账号不能为空'});
        }else if(!this.dataForm.password){
          this.$vux.toast.show({text: '密码不能为空'});
        }else{
          this.step = 2;
        }
      },
      submitData(){
        this.$vux.loading.show({text: '登录中'});
        this.$store.dispatch('login',this.dataForm).then(()=>{
          this.$vux.loading.hide();
          this.$router.push('/');
        }).catch(()=>{
          this.$vux.loading.hide();
          this.step = 1;
          this.$refs.puzzle.toggleBg();
        })
      }
    },
  }
</script>

<style lang="scss">
  @import '../../styles/views/formpage.scss';
</style>


