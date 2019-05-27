<template>
  <div class="vip">
    <div class="banner-row">
      <Swiper ref="banner" :list="bannerList" :loop="true" :auto="true" :interval="4000" :show-dots="false"></Swiper>
    </div>

    <group>
      <cell :title="$t('myAccount')" :value="userInfo.username"></cell>
      <popup-radio :title="$t('vipType')" :options="vipList" v-model="obj.vipType" :placeholder="$t('placeholder.selectVipType')"></popup-radio>
      <cell :title="$t('payable')" :value="playMoney"></cell>
      <popup-radio :title="$t('payType')" :options="playList" v-model="obj.playType" :placeholder="$t('placeholder.selectpayType')">
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
        <XButton :type="ablePay?'primary':''" :plain="!ablePay" :disabled="!ablePay" class="play-but" @click.native="payHandler">{{$t('vipBut')}}</XButton>
      </div>
    </group>

    <div class="table-row">
      <load-more :tip="$t('whatVip')" :show-loading="false" background-color="#fbf9fe"></load-more>
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>{{$t('ordinaryMember')}}</th>
            <th>{{$t('ordinaryMemberValue')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{$t('vipMembership')}}</td>
            <td>{{$t('vipMembershipValue')}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>

  </div>
</template>

<script>
  import { Swiper,Group,PopupRadio,Cell,XButton,XTable,LoadMore } from 'vux'
  import {mapGetters} from 'vuex'
  import {vipList,playList} from '@/data'
  export default {
    components:{Swiper,Group,PopupRadio,Cell,XButton,XTable,LoadMore},
    data(){
      return{
        bannerList: [
          {url: 'javascript:',img: 'http://findloveimg.alcyh.com/banner_4.jpg',title: '会员中心'}
        ],
        obj: {
          vipType: '',
          playType: ''
        },
        vipList,
        playList
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
      playMoney(){
        let tempArr = this.vipList.filter((item)=>{
          return item.key == this.obj.vipType;
        })
        return tempArr.length == 1 ? tempArr[0].money+'元' : this.$t('placeholder.selectVipTypeFirst');
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
      padding: 5px 0.5rem;
    }
    .vux-table td,.vux-table th{
      padding: 5px 10px;
      line-height: normal;
      text-align: left;
      &:first-of-type{
        width: 4em;
      }
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

