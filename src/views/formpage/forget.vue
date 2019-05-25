<template>
  <div class="form-wrap">
    <!-- 背景 -->
    <bg></bg>
    <div class="code-container">
      <img src="/static/img/code.jpg" alt="">
      <div class="tip">
        关注公众号，发送"忘记密码"四字，系统便会帮你找回密码
      </div>
    </div>
    <div style="text-align: center;">
      <XButton type="primary" mini @click.native="$router.push('/login')">返回登录</XButton>
    </div>
  </div>
</template>

<script>
  import { XButton  } from 'vux'
  import bg from './components/bg'
  export default {
    components:{XButton,bg},
  }
</script>


<style lang="scss">
  @import '../../styles/views/formpage.scss';
</style>
