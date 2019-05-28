<template>
  <div :class="['header',{transparent:isTransparent}]" :style="transparentStyle">
    <div class="head" v-show="!isShowLeft">
      <svg-icon iconClass="more" className="more" @tap="toggleSiderbar"></svg-icon>
      <div class="head-img" @tap="toggleSiderbar">
        <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
      </div>
    </div>

    <div class="icons-row left no-padding" v-show="isShowLeft" @tap="goBack">
      <div class="icon-item">
        <i class="iconfont icon-left"></i>
      </div>
    </div>
    
    <div class="icons-row right">
      <div class="icon-item" v-show="isShowSearch" @tap="$router.push('/search')">
        <i class="iconfont icon-search1"></i>
      </div>
      <div class="icon-item" v-show="isShowEdit" @tap="$router.push('/publish')">
        <i class="iconfont icon-edit1"></i>
      </div>
      <div class="icon-item" v-show="isShowHome" @tap="$router.push('/userCenter')">
        <i class="iconfont icon-home"></i>
      </div>
      <div class="icon-item" v-show="isShowMore" @tap="showMoreList=true">
        <i class="iconfont icon-More"></i>
        <div class="toggle-mask" v-show="showMoreList" @tap.stop="showMoreList=false">
          <el-collapse-transition>
            <div class="toggle-list" v-show="showMoreList">
              <div class="list-item" @tap="$router.push('/userCenter/edit')">更新个人资料</div>
              <div class="list-item" @tap="$router.push('/')">返回首页</div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>

    <div class="title textShadowBlack">
      <span>{{$t($route.meta.title)}}</span>
    </div>

  </div>
</template>

<script>
  export default{
    props: ['isShowSidebar'],
    data(){
      return{
        transparent: 0,
        showMoreList: false
      }
    },
    computed:{
      isShowLeft(){//显示用户头像就不现在返回按钮
        return this.$route.meta.isShowLeft;
      },
      isShowSearch(){
        return this.$route.meta.isShowSearch;
      },
      isShowEdit(){
        return this.$route.meta.isShowEdit;
      },
      isShowHome(){
        return this.$route.meta.isShowHome;
      },
      isShowMore(){
        return this.$route.meta.isShowMore;
      },
      isTransparent(){//是否头部透明
        return this.$route.meta.isTransparent;
      },
      transparentStyle(){
        return this.isTransparent ? {
          'background-color': `rgba(0, 0, 0, ${this.transparent})`
        } : {};
      }
    },
    methods:{
      toggleSiderbar(){
        this.$emit('update:isShowSidebar',!this.isShowSidebar);
      },
      goBack(){
        this.$router.back(-1);
      }
    },
    mounted(){
      let wrap = document.querySelector('.router-wrap');
      if(wrap){
        wrap.addEventListener('scroll',()=>{
          let temp = (wrap.scrollTop / 100).toFixed(1);
          temp = temp > 1 ? 1 : temp;
          this.transparent = temp;
        })
      }
      
    }
  }
</script>

<style lang="scss">
  .header{
    width: 100%;
    height: 2.3rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $theme-color;
    overflow: hidden;
    text-align: center;
    z-index: 7;
    &.transparent{
      background-color: rgba(0, 0, 0, 0);
    }
    &>div{
      position: absolute;
      top: 0;
      height: 2.3rem;
      color: #fff;
      font-size: 0.85rem;
      line-height: 2.3rem;
    }
    .head{
      left: 0;
      .more{
        color: #fff;
        width: 0.8rem;
        height: 100%;
        margin-left: 0.3rem;
        cursor: pointer;
      }
      .head-img{
        display: inline-block;
        vertical-align: top;
        width: 1.3rem;
        height: 1.3rem;
        margin: 0.5rem 0 0.5rem -0.2rem;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .title{
      left: 50%;
      transform: translateX(-50%);
    }
    .icons-row{
      &.right{
        right: 0;
        padding-right: 0.3rem;
      }
      &.left{
        left: 0;
        padding-left: 0.3rem;
      }
      &.no-padding{
        padding: 0;
      }
      .icon-item{
        display: inline-block;
        padding: 0 0.3rem;
        i{
          font-size: 1.1rem;
        }
        .toggle-mask{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 998;
          background-color: transparent;
          .toggle-list{
            position: fixed;
            top: 2.5rem;
            right: 0.5rem;
            background-color: #fff;
            border-radius: 5px;
            padding: 0 0.5rem;
            z-index: 999;
            border: 1px solid #f3f3f3;
            .list-item{
              color: #777;
              border-bottom: 1px solid #f3f3f3;
              line-height: 1.5rem;
              padding: 0.2rem 0;
              text-align: left;
            }
          }
        }
        
      }
    }
  }
</style>