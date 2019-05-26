<template>
  <div class="footer">
    <div :class="['footer-item',{on:$route.path=='/'}]" @click="$router.push('/')">
      <i class="iconfont icon-home"></i>
      <span>{{$t('index')}}</span>
    </div>
    <div :class="['footer-item',{on:$route.path=='/community'}]" @click="$router.push('/community')">
      <i class="iconfont icon-chat2"></i>
      <span>{{$t('community')}}</span>
    </div>
    <div class="footer-item big">
      <div class="publish" @click="$router.push('/publish')">
        <div class="publish-mask"></div>
        <div class="publish-main">
          <i class="iconfont icon-add"></i>
        </div>
      </div>
    </div>
    <div :class="['footer-item',{on:$route.path=='/vip'}]" @click="$router.push('/vip')">
      <i class="iconfont icon-group"></i>
      <span>{{$t('vip')}}</span>
    </div>
    <div :class="['footer-item',{on:$route.path=='/sign'}]" @click="$router.push('/sign')">
      <i class="iconfont icon-Sign"></i>
      <span>{{$t('sign')}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.3rem;
    overflow: visible;
    border-top: 1px solid #f3f3f3;
    background-color: #fff;
    z-index: 8;
    .footer-item{
      float: left;
      width: 3.5rem;
      text-align: center;
      color: $gray-text;
      cursor: pointer;
      &.on{
        color: $theme-color!important;
      }
      i{
        font-size: 1.2rem;
        display: block;
        line-height: 1rem;
        margin-top: 0.3rem;
      }
      span{
        display: block;
        font-size: 0.6rem;
        line-height: 1rem;
      }
      .publish{
        border: 1px solid #f3f3f3;
        box-sizing: border-box;
        height: 2.8rem;
        width: 3rem;
        border-radius: 50%;
        display: inline-block;
        margin-top: -0.5rem;
        background-color: #fff;
        position: relative;
        .publish-mask{
          position: absolute;
          width: 3.4rem;
          height: 1.8rem;
          bottom: 0;
          left: -0.2rem;
          background-color: #fff;
        }
        .publish-main{
          background-color: $theme-color;
          display: inline-block;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          position: relative;
          z-index: 3;
          margin: 0.2rem;
          i{
            color: #fff;
            display: block;
            height: 100%;
            line-height: 2.2rem;
            margin: 0;
          }
        }
      }
      &.big{
        width: 4.5rem;
      }
    }
  }
</style>


