<template>
  <div class="app-container">
    <Drawer width="14rem" :show.sync="isShowSidebar">
      <!-- 侧边栏 -->
      <Sidebar slot="drawer" :isShow.sync="isShowSidebar"/>

      <!-- 头部 -->
      <Header v-show="!hideHeader" :isShowSidebar.sync="isShowSidebar"></Header>

      <!-- 路由 -->
      <div :class="['router-container',{hideHeader:hideHeader||isTransparent},{hideFooter}]">
        <div class="router-wrap" id="router-wrap">
          <transition name="router-fade">
            <router-view/>
          </transition>
        </div>
      </div>

      <!-- 底部 -->
      <Footer v-show="!hideFooter"></Footer>

    </Drawer>

  </div>

</template>

<script>
  import { Drawer } from 'vux'
  import Header from './Header'
  import Sidebar from './Sidebar'
  import Footer from './Footer'
  export default{
    components:{Header,Drawer,Sidebar,Footer},
    data(){
      return{
        isShowSidebar: false
      }
    },
    computed:{
      hideHeader(){//是否隐藏头部
        let temp = !!this.$route.meta.hideHeader;
        this.isShowSidebar = temp;
        return temp;
      },
      hideFooter(){//是否隐藏底部
        return !!this.$route.meta.hideFooter;
      },
      isTransparent(){//是否头部透明
        return this.$route.meta.isTransparent;
      }
    }
  }
</script>

<style>
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .2s;
}
.router-fade-enter{
  opacity: 0;
}
.router-fade-enter-to{
  opacity: 1;
}
.router-fade-leave,.router-fade-leave-to{
  display: none;
}
</style>
