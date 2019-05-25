<template>
  <div class="search">
    <div class="search-row">
      <div class="search-inner">
        <div class="select-type">
          {{obj.type[0]}}<i class="iconfont icon-down"></i>
          <div class="select-mask">
            <PopupPicker :title="''" :data="typeList" v-model="obj.type"></PopupPicker>
          </div>
        </div>
        <input type="text" placeholder="请输入搜索内容" v-model="obj.keyword">
        <div class="but"><i class="iconfont icon-search1"></i></div>
      </div>
    </div>
    <div class="ad-row">
      <img src="/static/img/banner_5.jpg" alt="">
      <span>广告</span>
    </div>
    <div class="hot-row">
      <div class="hot-title">热门搜索</div>
      <div class="tags">
        <span @click="obj.keyword='广州'">广州</span>
        <span @click="obj.keyword='佛山'">佛山</span>
        <span @click="obj.keyword='相亲'">相亲</span>
        <span @click="obj.keyword='吐槽'">吐槽</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { PopupPicker } from 'vux'
  export default {
    components: {PopupPicker},
    data(){
      return{
        obj:{
          type: ['全部'],
          keyword: ''
        },
        typeList: [['全部','帖子','相亲']]
      }
    }
  };
</script>

<style lang="scss">
.search{
  .search-row{
    padding: 0.8rem 0.5rem;
    background-color: #f8f8f8;
    .search-inner {
      height: 1.8rem;
      line-height: 1.8rem;
      background-color: #fff;
      border: 1px solid $gray-bg;
      border-radius: 3px;
      overflow: hidden;
      &>div{
        display: inline-block;
        padding: 0 0.5rem;
      }
      .select-type{
        height: 1.2rem;
        margin: 0.2rem 0;
        line-height: 1.2rem;
        border-right: 1px solid rgba(241, 241, 241, 1);
        color: #999999;
        position: relative;
        i{
          margin-left: 0.2rem;
          font-size: 0.65rem;
        }
        .select-mask{
          &,& *{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            overflow: hidden;
          }
        }
      }
      input{
        background-color: transparent;
        border: 0;
        width: 11rem;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.7rem;
      }
      .but{
        float: right;
        width: 1.8rem;
        height: 100%;
        background-color: #FFAE0E;
        color: #fff;
        padding: 0;
        text-align: center;
      }
    }
  }
  .ad-row{
    padding: 0.5rem;
    position: relative;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
    span{
      position: absolute;
      right: 0.75rem;
      bottom: 0.75rem;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 0.6rem;
      padding: 0 0.2rem;
      height: 1rem;
      line-height: 1rem;
      border-radius: 3px;
    }
  }
  .hot-row{
    padding: 0.5rem;
    .hot-title{
      color: #999999;
      font-size: 0.8rem;
      line-height: 1rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0.7rem;
      border-bottom: 1px solid $gray-bg;
    }
    .tags{
      overflow: hidden;
      span{
        float: left;
        border: 1px solid rgba(119, 119, 119, 0.3);
        height: 1.4rem;
        line-height: 1.4rem;
        padding: 0 0.4rem;
        font-size: 0.65rem;
        color: #777;
        border-radius: 3px;
        margin-right: 0.5rem;
        
      }
      span:nth-child(1){
        background-color: #EEF9D5;
      }
      span:nth-child(2){
        background-color: #F6F6F6;
      }
      span:nth-child(3){
        background-color: #E8F6F6;
      }
      span:nth-child(4){
        background-color: #F6F6F6;
      }
    }
  }
}
</style>

