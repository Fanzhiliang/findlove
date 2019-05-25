<template>
  <div class="index">
    <div class="banner-row">
      <div class="banner-title">
        <p><span>公告</span>在这里祝大家劳动节快乐！</p>
      </div>
      <div class="banner-main">
        <Swiper :list="bannerList" :loop="true" :auto="true" :interval="4000"></Swiper>
      </div>
    </div>

    <div class="three-col-row">
      <div class="row-item">
        <h3>每日签到</h3>
        <p>赚积分赢VIP</p>
      </div>
      <div class="row-item">
        <h3>加入会员</h3>
        <p>永久会员通用</p>
      </div>
      <div class="row-item">
        <h3>积分转盘</h3>
        <p>大奖等你来拿</p>
      </div>
      <div class="row-item">
        <h3>意见反馈</h3>
        <p>一起共同进步</p>
      </div>
      <div class="row-item">
        <h3>APP下载</h3>
        <p>并没有</p>
      </div>
      <div class="row-item">
        <h3>推广任务</h3>
        <p>推广兑换积分</p>
      </div>
    </div>

    <div class="headline">
      <img src="/static/img/toutiao_ico.png" alt="">
      <h3>给你们来段绕口令</h3>
      <p class="more-ellipsis">一位爷爷他姓顾，上街打醋又买布。买了布，打了醋，回头看见鹰抓兔。放下布，搁下醋，上前去追鹰和兔，飞了鹰，跑了兔。打翻醋，醋湿布。</p>
    </div>

    <div class="links-row">
      <a :href="item.href" class="link" v-for="(item,index) in linkList" :key="index" @click="$router.push(item.path)">
        <img :src="item.img" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
    
    <div class="recommend clearfix">
      <div class="title">
        <p class="ellipsis">相亲展示</p>
        <span @click="$router.push('/blindDate/list')"><i class="iconfont icon-More"></i></span>
      </div>
      <div class="recommend-item" v-for="(item,index) in bindDateList" :key="index" @click="$router.push('/blindDate/detail/'+item.post_id)">
        <img v-lazy="item.cover" alt="">
        <p class="ellipsis">{{item.title}}</p>
      </div>
    </div>

    <div class="recommend">
      <div class="title">
        <p class="ellipsis">热帖排行</p>
        <span @click="$router.push('/post/list')"><i class="iconfont icon-More"></i></span>
      </div>
      <div class="post-row" v-for="(item,index) in postList" :key="index" @click="$router.push('/post/detail/'+item.post_id)">
        <span class="num">{{index+1}}</span>
        <p class="ellipsis">{{item.title}}</p>
        <span class="comment">{{item.comment}}</span>
      </div>
    </div>

    <div class="recommend">
      <div class="title">
        <p class="ellipsis">活动进行中</p>
        <span @click="$router.push('/activity/list')">More...</span>
      </div>
      <div class="recommend-row" v-for="(item,index) in activityList" :key="index" @click="$router.push('/activity/detail/'+item.post_id)">
        <img v-lazy="item.cover" alt="">
        <h3 class="ellipsis">{{item.title}}</h3>
        <p class="ellipsis">时间：{{item.time}}</p>
        <p class="ellipsis">类型：{{item.type}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper } from 'vux'
  import {getBlindDateList,getActivityList,getPostList} from '@/api/post'
  export default {
    data(){
      return{
        bannerList: [
          {
            url: 'javascript:',
            img: '/static/img/banner_1.jpg',
            title: '我也能找到吗？'
          },
          {
            url: 'javascript:',
            img: '/static/img/banner_2.jpg',
            title: '在仅有一次的生命'
          },
          {
            url: 'javascript:',
            img: '/static/img/banner_3.jpg',
            title: 'Seven777'
          }
        ],
        linkList: [
          {href:'javascript:;',img:'/static/img/a01.png',title:'广州相亲',path:'/blindDate/list'},
          {href:'javascript:;',img:'/static/img/a02.png',title:'吐槽分享',path:'/post/list'},
          {href:'javascript:;',img:'/static/img/a03.png',title:'公告活动',path:'/activity/list'},
          {href:'javascript:;',img:'/static/img/a04.png',title:'佛山相亲',path:'/blindDate/list'},
          {href:'javascript:;',img:'/static/img/a05.png',title:'中山相亲',path:'/blindDate/list'},
          {href:'javascript:;',img:'/static/img/a06.png',title:'惠州相亲',path:'/blindDate/list'},
          {href:'javascript:;',img:'/static/img/a07.png',title:'汕头相亲',path:'/blindDate/list'},
          {href:'javascript:;',img:'/static/img/a08.png',title:'东莞相亲',path:'/blindDate/list'},
        ],
        activityList: [],
        bindDateList: [],
        postList: []
      }
    },
    created(){
      getBlindDateList({pageSize:6}).then((data)=>{
        this.bindDateList = data.list;
      })
      getActivityList({pageSize:3}).then((data)=>{
        this.activityList = data.list;
      })
      getPostList({pageSize:6}).then((data)=>{
        this.postList = data.list;
      })
    },
    components:{Swiper},
  }
</script>


<style lang="scss">
  .index{
    background-color: $gray-bg;
    min-height: 100%;
    box-sizing: border-box;
    padding-top: 0.5rem;
    .banner-row{
      background-color: #fff;
      padding: 0 0.5rem 0.6rem 0.5rem;
      margin-bottom: 0.5rem;
      .banner-title{
        p{
          line-height: 1.6rem;
          font-size: 0.75rem;
          span{
            background-color: rgb(221,0,0);
            color: #fff;
            font-size: 0.5rem;
            height: 0.8rem;
            display: inline-block;
            line-height: 0.8rem;
            padding: 0 0.2rem;
            vertical-align: text-top;
            margin-right: 0.3rem;
          }
        }
      }
    }
    .three-col-row{
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 0.5rem;
      .row-item{
        float: left;
        width: 33.2%;
        box-sizing: border-box;
        text-align: center;
        height: 3rem;
        border-right: 1px solid $gray-bg;
        &:nth-of-type(2),&:nth-of-type(5){
          color: #3EBBFD;
        }
        &:nth-of-type(3n){
          border-right: 0;
          color: #F37D7D;
        }
        &:nth-of-type(1),&:nth-of-type(4){
          color: #FFB300;
        }
        h3{
          line-height: 1rem;
          font-size: 0.85rem;
          padding-top: 0.5rem;
          padding-bottom: 0.3rem;
        }
        p{
          line-height: 1rem;
          font-size: 0.6rem;
          color: $gray-text;
        }
      }
    }
    .headline{
      padding: 0 0.5rem 0.5rem 0.5rem;
      background-color: #fff;
      position: relative;
      margin-bottom: 0.5rem;
      img{
        position: absolute;
        width: 2rem;
        height: 2rem;
        top: 0;
        left: 0;
      }
      h3{
        text-align: center;
        color: rgb(221, 0, 0);
        line-height: 2rem;
        font-size: 0.8rem;
      }
      p{
        line-height: 1rem;
        height: 2rem;
        overflow: hidden;
        color: $gray-text;
      }
    }
    .links-row{
      padding: 0.5rem 0.5rem 0 0.5rem;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 0.5rem;
      .link{
        width: 25%;
        height: 3.5rem;
        float: left;
        text-decoration: none;
        text-align: center;
        font-size: 0;
        img{
          display: inline-block;
          width: 2rem;
          height: 2rem;
          margin-bottom: 0.2rem;
        }
        p{
          color: #000;
          font-size: 0.6rem;
        }
      }
    }
    .recommend{
      padding: 0 0.5rem;
      background-color: #fff;
      margin-bottom: 0.5rem;
      .title{
        height: 2rem;
        line-height: 2rem;
        font-size: 0.75rem;
        overflow: hidden;
        p{
          display: inline-block;
          width: 12rem;
        }
        span{
          color: $gray-text;
          float: right;
          font-size: 0.6rem;
          padding-left: 1rem;
        }
      }
      .recommend-row{
        height: 4rem;
        padding: 0.5rem 0;
        overflow: hidden;
        img{
          width: 6.5rem;
          height: 4rem;
          margin-right: 0.5rem;
          float: left;
        }
        h3{
          font-weight: 100;
          font-size: 0.75rem;
          width: 10rem;
          line-height: 1rem;
          padding-bottom: 0.2rem; 
        }
        p{
          color: $gray-text;
          font-size: 0.6rem;
          width: 10rem;
        }
      }
      .recommend-item{
        float: left;
        width: 8.6rem;
        height: 5.5rem;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 0.5rem;
        margin-right: 0.5rem;
        border-radius: 5px;
        overflow: hidden;
        &:nth-of-type(2n+1){
          margin-right: 0;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
        p{
          width: 96%;
          padding: 0 2%;
          font-size: 0.6rem;
          height: 1.2rem;
          line-height: 1.2rem;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      .post-row{
        height: 1.8rem;
        // overflow: hidden;
        line-height: 1.8rem;
        border-bottom: 1px solid $gray-bg;
        &>*{
          display: inline-block;
          vertical-align: middle;
        }
        &:nth-of-type(2){
          .num{background-color: #F37D7D;}
        }
        &:nth-of-type(3){
          .num{background-color: #FFB300;}
        }
        &:nth-of-type(4){
          .num{background-color: #9DCA08;}
        }
        &:last-of-type{
          border-bottom: 0;
        }
        .num{
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          margin: 0.5rem 0.5rem 0.5rem 0;
          float: left;
          color: #fff;
          background-color: #999999;
          text-align: center;
          font-size: 0.6rem;
          
        }
        p{
          height: 1rem;
          line-height: 1.1rem;
          margin: 0.4rem 0;
          width: 13rem;
          font-weight: 100;
          float: left;
        }
        .comment{
          font-size: 0.6rem;
          color: $gray-text;
          float: right;
          padding: 0;
          border: 0;
        }
      }
    }
  }
</style>

