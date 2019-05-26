<template>
  <div id="app">
    <transition name="router-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    watch:{
      $route(route){//更改标题
        document.querySelector('title').innerHTML = this.$t(route.meta.title);
      }
    },
  }
</script>

<style>
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-to{
    opacity: 0;
  }
  /* @import './styles/reset/reset.css';
  @import './styles/icons/iconfont.css';
  @import './styles/common.scss'; */
  /* #app {
    
  } */
  html,body,#app,.app-container{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
  }
</style>

