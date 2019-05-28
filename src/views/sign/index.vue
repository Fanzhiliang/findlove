<template>
  <div class="sign">
    <div class="userInfo">
      <div class="info-inner">
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt>
        </div>
        <p class="name textShadowBlack ellipsis">{{userInfo.username}}</p>
        <p class="level textShadowBlack ellipsis">Lv{{userInfo.level}}</p>
      </div>
      <div class="rank-row">
        <div class="rank-item">
          <h3>{{$t('todayRank')}}</h3>
          <p>996</p>
        </div>
        <div class="rank-item">
          <h3>{{$t('continuitySign')}}</h3>
          <p>
            4
            <span>天</span>
          </p>
        </div>
        <div class="rank-item">
          <h3>{{$t('totalSign')}}</h3>
          <p>
            12
            <span>天</span>
          </p>
        </div>
      </div>
    </div>
    <div class="btn-row">
      <XButton
        :type="ableSign?'primary':''"
        :plain="!ableSign"
        :disabled="!ableSign"
        @tap.native="ableSign=false"
      >{{ableSign?$t('sign'):$t('signed')}}</XButton>
    </div>
    <div class="flow-row">
      <tab>
        <tab-item selected>{{$t('todayRank')}}</tab-item>
        <tab-item>{{$t('monthRank')}}</tab-item>
        <tab-item>{{$t('totalRank')}}</tab-item>
      </tab>
      <div class="flow-value">
        <div class="flow-item" v-for="(item,index) in signedList" :key="index">
          <div class="user-head">
            <img v-lazy="'http://findloveimg.alcyh.com/default-head.gif'" alt>
          </div>
          <div class="line"></div>
          <div class="info">
            <div class="name">{{item.name}} {{item.time}}</div>
            <div class="timer">{{$t('monthDays')}}{{item.month}}，{{$t('totalDays')}}{{item.count}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { XButton, Tab, TabItem } from "vux";
export default {
  components: { XButton, Tab, TabItem },
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      ableSign: true,
      signedList: [
        {name:'小跳蚤',time:'7秒前',month:27,count:134},{name:'大狗子',time:'1分钟前',month:12,count:345},
        {name:'alcyh',time:'2天前',month:3,count:724},{name:'fzl',time:'一周前',month:27,count:37},
        {name:'小跳蚤',time:'7秒前',month:27,count:134},{name:'大狗子',time:'1分钟前',month:12,count:345},
        {name:'alcyh',time:'2天前',month:3,count:724},{name:'fzl',time:'一周前',month:27,count:37},
        {name:'小跳蚤',time:'7秒前',month:27,count:134},{name:'大狗子',time:'1分钟前',month:12,count:345},
      ]
    };
  }
};
</script>

<style lang="scss">
.sign {
  background-color: #fff;
  .userInfo {
    background-image: url("http://findloveimg.alcyh.com/sidebar_bg.jpg");
    background-size: cover;
    height: 10rem;
    overflow: hidden;
    .info-inner {
      color: rgba(255, 255, 255, 0.8);
      overflow: hidden;
      height: 3rem;
      margin-top: 3.5rem;
      margin-bottom: 0.7rem;
      padding-left: 1rem;
      .head {
        width: 3rem;
        height: 3rem;
        margin-right: 0.5rem;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        float: left;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 1rem;
        line-height: 1.5rem;
        padding-top: 0.3rem;
        width: 12rem;
      }
      .level {
        font-size: 0.7ren;
        width: 12rem;
      }
    }
    .rank-row {
      background-color: rgba(0, 0, 0, 0.4);
      height: 2.8rem;
      overflow: hidden;
      padding: 0 0.5rem;
      .rank-item {
        float: left;
        width: 33.25%;
        height: 2rem;
        margin: 0.4rem 0;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
        border-right: 2px solid rgba(255, 255, 255, 0.2);
        &:last-of-type {
          border-right: 0;
        }
        h3 {
          font-size: 0.75rem;
          opacity: 0.7;
          line-height: 1rem;
          padding-bottom: 0.2rem;
        }
        p {
          span {
            opacity: 0.7;
          }
        }
      }
    }
  }
  .btn-row {
    padding: 0.5rem;
  }
  .flow-row{
    .flow-value{
      .flow-item{
        height: 3.7rem;
        .user-head{
          width: 2.6rem;
          height: 2.6rem;
          margin: 0.5rem 0.3rem 0.5rem 0.5rem;
          float: left;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .line{
          float: left;
          width: 1rem;
          height: 100%;
          position: relative;
          &::before{
            content: '';
            width: 2px;
            height: 100%;
            margin-left: -1px;
            position: absolute;
            top: 0;
            left: 50%;
            background-color: #dddddd;
          }
          &::after{
            content: '';
            width: 5px;
            height: 5px;
            margin-left: -4px;
            margin-top: -3px;
            background-color: #fff;
            border: 2px solid #dddddd;
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
          }
        }
        .info{
          .name{
            color: $gray-text;
            line-height: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.2rem;
          }
          .timer{
            color: #D19A5E;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}
</style>
