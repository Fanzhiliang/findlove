<template>
  <div class="vip">
    <div class="banner-row">
      <Swiper ref="banner" :list="bannerList" :loop="true" :auto="true" :interval="4000" :show-dots="false"></Swiper>
    </div>

    <group>
      <cell title="我的账号" :value="userInfo.username"></cell>
      <popup-radio title="会员类型" :options="vipList" v-model="obj.vipType" placeholder="选择会员类型"></popup-radio>
      <cell title="应支付" :value="playMoney"></cell>
      <popup-radio title="支付方式" :options="playList" v-model="obj.playType" placeholder="选择支付方式">
        <template slot-scope="props" slot="each-item">
          <i :class="'iconfont playType icon-'+playList[props.index].icon"></i>{{props.label}}
        </template>
      </popup-radio>
      <cell primary="content">
        <div style="text-align: center;">
          <img :src="picSrc" alt="">
        </div>
      </cell>
      <div class="play-but-row">
        <XButton :type="ablePay?'primary':''" :plain="!ablePay" :disabled="!ablePay" class="play-but" @click.native="payHandler">开通vip会员</XButton>
      </div>
    </group>

    <div class="table-row">
      <load-more tip="会员有什么福利？" :show-loading="false" background-color="#fbf9fe"></load-more>
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>普通用户</th>
            <th>vip会员</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>只能浏览不能看到联系方式</td>
            <td>不仅能看到联系方式还可以私聊对方进行了解</td>
          </tr>
        </tbody>
      </x-table>
    </div>

  </div>
</template>

<script>
  import { Swiper,Group,PopupRadio,Cell,XButton,XTable,LoadMore } from 'vux'
  import {mapGetters} from 'vuex'
  export default {
    components:{Swiper,Group,PopupRadio,Cell,XButton,XTable,LoadMore},
    data(){
      return{
        bannerList: [
          {url: 'javascript:',img: '/static/img/banner_4.jpg',title: '会员中心'}
        ],
        obj: {
          vipType: '',
          playType: ''
        },
        vipList: [
          {key:'月会员',value:'月会员',money:49},{key:'季会员',value:'季会员',money:99},{key:'半年会员',value:'半年会员',money:149},
          {key:'年会员',value:'年会员',money:199},{key:'永久会员',value:'永久会员',money:299}
        ],
        playList: [
          {key:'支付宝',value:'支付宝支付',icon:'zhifubao',pic:'/static/img/zhifubao_code.jpg'},
          {key:'微信',value:'微信支付',icon:'wechat',pic:'/static/img/weixin_code.jpg'},
          {key:'积分',value:'积分支付',icon:'jifen',pic:'/static/img/jifen_pic.jpg'}
        ]
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
      playMoney(){
        let tempArr = this.vipList.filter((item)=>{
          return item.key == this.obj.vipType;
        })
        return tempArr.length == 1 ? tempArr[0].money+'元' : '请选择会员类型';
      },
      picSrc(){
        let tempArr = this.playList.filter((item)=>{
          return item.key == this.obj.playType;
        })
        return tempArr.length == 1 ? tempArr[0].pic : '';
      },
      ablePay(){
        return this.obj.vipType && this.obj.playType;
      }
    },
    methods:{
      payHandler(){

      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$refs.banner.xheight = '120px'
      })
    }
  }
</script>


<style lang="scss">
  .vip{
    padding-bottom: 1rem;
    .table-row{
      padding: 0 0.5rem;
    }
    .vux-table td{
      padding: 0 10px;
      line-height: normal;
    }
  }
  
  .vux-popup-dialog{
    .playType{
      font-size: 0.75rem;
      margin-right: 0.3rem;
    }
    .icon-zhifubao{
      color: rgb(6,180,253);
    }
    .icon-wechat{
      color:rgb(21,196,52);
    }
    .icon-jifen{
      color:rgb(200,160,106);
    }
  }
  .play-but-row{
    padding: 0 15px 2rem 15px;
  }
</style>

