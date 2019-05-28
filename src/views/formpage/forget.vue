<template>
  <div class="form-wrap">
    <!-- 背景 -->
    <bg></bg>
    <div class="code-container">
      <img src="http://findloveimg.alcyh.com/code.jpg" alt="">
      <div class="tip">
        {{$t('forgetTip')}}
      </div>
    </div>
    <div style="text-align: center;">
      <XButton type="primary" mini @tap.native="$router.push('/login')">{{$t('backLogin')}}</XButton>
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
