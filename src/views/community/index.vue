<template>
  <div class="community">
    <div class="level-row clearfix">
      <span class="level"><i :class="'iconfont icon-level-'+userInfo.level" :style="{color:levelList[userInfo.level-1].color}"></i></span>
      <div class="progress">
        <div class="progress-inner" :style="{width:(integral*100/limit)+'%'}"></div>
      </div>
      <span class="rate"><span>{{integral}}</span>/{{limit}}</span>
      <div class="sign-button" v-if="isSigned"><i class="iconfont icon-success"></i>已签到</div>
      <div class="sign-button no-sign" v-else @click="sign">签到</div>
    </div>
    <div class="banner-row">
      <Swiper ref="swiper" :list="bannerList" :loop="true" :auto="true" :interval="4000" :show-dots="false" :show-desc-mask="false"></Swiper>
    </div>
    <div class="three-col-row">
      <div class="col-items clearfix">
        <div class="col-item"><h3>今日发帖</h3><p>1367</p></div>
        <div class="col-item"><h3>总帖数</h3><p>5712</p></div>
        <div class="col-item"><h3>会员数</h3><p>947</p></div>
      </div>
      <div class="swiper-row">
        <span>公告</span>
        <swiper auto :loop="true" height="30px" direction="vertical" :interval="2000" class="text-scroll" :show-dots="false">
          <swiper-item><p>给大家讲个笑话</p></swiper-item>
          <swiper-item><p>我的微信：QQ505911050</p></swiper-item>
        </swiper>
      </div>
    </div>

    <Group>
      <XSwitch title="相亲板块" v-model="isShowBlinddate"></XSwitch>
      <el-collapse-transition>
        <div class="toggle-panel clearfix" v-show="isShowBlinddate">
          <a :href="item.href" class="path-item" v-for="(item,index) in blindDateList" :key="index">
            <img :src="item.img" alt="">
            <p class="title">{{item.title}}</p>
            <p class="count">总数：{{item.count}}</p>
          </a>
        </div>
      </el-collapse-transition>
    </Group>

    <Group>
      <XSwitch title="论坛板块" v-model="isShowForum"></XSwitch>
      <el-collapse-transition>
        <div class="toggle-panel clearfix" v-show="isShowForum">
          <a :href="item.href" class="path-item" v-for="(item,index) in forumList" :key="index">
            <img :src="item.img" alt="">
            <p class="title">{{item.title}}</p>
            <p class="count">总数：{{item.count}}</p>
          </a>
        </div>
      </el-collapse-transition>
    </Group>
  </div>
</template>

<script>
  import { Swiper,SwiperItem,Group,XSwitch } from 'vux'
  import {mapGetters} from 'vuex'
  import {levelList} from '@/data'
  export default {
    components:{Swiper,SwiperItem,Group,XSwitch},
    data(){
      return{
        bannerList: [
          {
            url: 'javascript:',
            img: '/static/img/ver-1.png'
          },
          {
            url: 'javascript:',
            img: '/static/img/ver-2.png'
          },
          {
            url: 'javascript:',
            img: '/static/img/ver-3.png'
          }
        ],
        levelList,
        blindDateList: [
          {href:'javascript:;',img:'/static/img/a01.png',title:'广州相亲',count:141},
          {href:'javascript:;',img:'/static/img/a04.png',title:'佛山相亲',count:73},
          {href:'javascript:;',img:'/static/img/a05.png',title:'中山相亲',count:25},
          {href:'javascript:;',img:'/static/img/a06.png',title:'惠州相亲',count:8},
          {href:'javascript:;',img:'/static/img/a07.png',title:'汕头相亲',count:90},
          {href:'javascript:;',img:'/static/img/a08.png',title:'东莞相亲',count:101},
        ],
        forumList: [
          {href:'javascript:;',img:'/static/img/a02.png',title:'吐槽分享',count:2436},
          {href:'javascript:;',img:'/static/img/a03.png',title:'公示公告',count:3},
        ],
        isSigned: false,
        isShowBlinddate: true,
        isShowForum: true,
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
      integral(){
        return parseInt(this.userInfo.integral);
      },
      limit(){
        return parseInt(this.levelList[this.userInfo.level-1].limit);
      }
    },
    methods:{
      sign(){
        let temp = Object.assign({},this.userInfo);
        temp.integral = parseInt(temp.integral) + 3;
        this.$store.commit('SET_USERINFO',temp);
        this.isSigned = true;
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$refs.swiper.xheight = '120px'
      })
    },
  }
</script>

<style lang="scss">
  .community{
    background-color: $gray-bg;
    .level-row{
      background-color: #F3F1F7;
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.5rem;
      .level{
        float: left;
        width: 1.25rem;
        height: 100%;
        i{
          font-size: 1.2rem;
        }
      }
      .progress{
        float: left;
        height: 0.7rem;
        width: 9rem;
        margin: 0.65rem 0.4rem 0.65rem 0;
        background-image: url('../../assets/img/markings.png');
        border-radius: 10px;
        overflow: hidden;
        .progress-inner{
          height: 100%;
          border-radius: 10px;
          box-sizing: border-box;
          border: 1px solid transparent;
          background-image: linear-gradient(to bottom,#8db943,#70a128);
        }
      }
      .rate{
        font-size: 0.65rem;
        float: left;
        span{
          color: #DD0000;
        }
      }
      .sign-button{
        background-color: #70a128;
        color: rgba(255, 255, 255, 0.5);
        float: right;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.6rem;
        padding: 0 0.5rem;
        border-radius: 3px;
        margin: 0.25rem 0 0.25rem 0.3rem;
        &.no-sign{
          color: #fff;
        }
        i{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .banner-row,.banner-row .vux-slider,.banner-row .vux-swiper.vux-swiper{//不加这个手机上看不会width100%
      width: 100%;
    }
    .three-col-row{
      background-color: #fff;
      .col-items{
        padding: 0.2rem 0.5rem;
        border-bottom: 1px solid #f3f3f3;
        .col-item{
          float: left;
          width: 33.25%;
          text-align: center;
          h3{
            color: $gray-text;
            font-size: 0.65rem;
            font-weight: 100;
            height: 1rem;
            padding-top: 0.3rem;
          }
          p{
            color: #777777;
            font-size: 1rem;
            font-weight: 100;
          }
        }
      }
      .swiper-row{
        clear: both;
        height: 1.8rem;
        overflow: hidden;
        line-height: 1.8rem;
        border-bottom: 1px solid #f3f3f3;
        padding: 0.2rem 0.5rem;
        span{
          display: inline-block;
          height: 1rem;
          line-height: 1rem;
          background-color: #FFAE0E;
          color: #fff;
          font-size: 0.6rem;
          padding: 0 0.2rem;
          border-radius: 0 2px 0 2px;
        }
        .text-scroll{
          display: inline-block;
          width: 15rem;
          height: 1.8rem;
          vertical-align: middle;
          margin-left: 0.5rem;
          p{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #DD0000;
            line-height: 1.8rem;
          }
        }
      }
    }
    .weui-label{
      color: #333333;
      font-weight: 100;
      font-size: 0.7rem;
    }
    .vux-no-group-title{
      margin-top: 0.5rem;
      border-bottom: 1px solid #f3f3f3;
      &:last-of-type{
        margin-bottom: 0.5rem;
      }
    }
    .toggle-panel{
      .path-item{
        float: left;
        width: 50%;
        height: 4rem;
        padding: 0.5rem;
        box-sizing: border-box;
        text-decoration: none;
        border-top: 1px solid #f3f3f3;
        &:nth-of-type(2n+1){
          border-right: 1px solid #f3f3f3;
        }
        img{
          width: 3rem;
          height: 3rem;
          float: left;
          margin-right: 0.5rem;
        }
        .title{
          line-height: 1rem;
          color: #333333;
          font-size: 0.8rem;
          padding-top: 0.4rem;
          padding-bottom: 0.2rem;
        }
        .count{
          line-height: 1rem;
          color: #FFAE0E;
          font-size: 0.7rem;
        }
      }
    }
  }
</style>


