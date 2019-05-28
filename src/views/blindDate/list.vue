<template>
  <div class="post">
    <div class="post-header">
      <img src="http://findloveimg.alcyh.com/a01.png" alt="">
      <h3>广州相亲</h3>
      <p class="num">
        <span>今日:128</span><span>帖子:6841324</span><span>今日:128</span>
      </p>
      <p class="info">广州板块，可以按下面的分区进行筛选</p>
      <XButton v-if="ableFollow" @tap.native="ableFollow=false" class="follow-button" mini type="primary"><i class="iconfont icon-add"></i>关注</XButton>
      <XButton v-else @tap.native="ableFollow=true" class="follow-button disabled" mini :plain="true">已关注</XButton>
    </div>

    <div class="blindDate-list">
      <ScrollTab v-model="tabIndex" :list="tabList" :scrollTop="tabLimit" :fixedTop="'2.3rem'" @on-before-index-change="switchTabItem"/>

      <div class="list">
        <div :class="['col-list',{'too-long':isTooLong=='left'}]" v-if="leftColList.length>0">
          <div class="list-item" v-for="(item,index) in leftColList" :key="index" @tap="$router.push('/blindDate/detail/'+item.post_id)">
            <img v-lazy="item.imgUrls && item.imgUrls.length>0 ? item.imgUrls[0] : item.cover" alt="">
            <div class="bottom-info">
              <h3 class="ellipsis">{{item.title}}</h3>
              <p>
                <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
                {{item.user.username}}
                <span><i class="iconfont icon-chatlinemtui"></i>{{item.comment}}</span>
              </p>
            </div>
          </div>
        </div>

        <div :class="['col-list',{'too-long':isTooLong=='right'}]" v-if="rightColList.length>0">
          <div class="list-item" v-for="(item,index) in rightColList" :key="index" @tap="$router.push('/blindDate/detail/'+item.post_id)">
            <img v-lazy="item.imgUrls && item.imgUrls.length>0 ? item.imgUrls[0] : item.cover" alt="">
            <div class="bottom-info">
              <h3 class="ellipsis">{{item.title}}</h3>
              <p>
                <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
                {{item.user.username}}
                <span><i class="iconfont icon-chatlinemtui"></i>{{item.comment}}</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      <Pager :pageNo.sync="params.pageNo" :totalSize="params.totalSize"/>

    </div>
  </div>
</template>

<script>
  import {XButton,Tab,TabItem} from 'vux'
  import {getBlindDateList} from '@/api/post'
  import ScrollTab from '@/components/ScrollTab'
  import Pager from '@/components/Pager'
  import iScroll from '@/utils/IScroll/index.js'
  export default {
    components:{XButton,Tab,TabItem,ScrollTab,Pager},
    mixins: [iScroll],
    data(){
      return{
        params:{
          pageSize: 10,
          pageNo: 1,
          totalSize: 2
        },
        ableFollow: true,
        list: [],
        tabList: [
          {name:'全部'},{name:'天河'},{name:'白云'},{name:'珠海'},{name:'越秀'},{name:'荔湾'},
          {name:'番禺'},{name:'南沙'},{name:'黄埔'},{name:'花都'},{name:'从化'},{name:'增城'},
        ],
        tabLimit: 0,
        tabIndex: 0,
        isTooLong: ''
      }
    },
    computed:{
      leftColList(){
        return this.list.filter((item,i)=>{return i%2 == 0})
      },
      rightColList(){
        return this.list.filter((item,i)=>{return i%2 != 0})
      }
    },
    watch:{
      params:{
        handler(){
          this.getList();
        },
        deep: true
      }
    },
    methods:{
      setStyle(){//获得数据后返回顶部并且设置一些样式
        document.querySelector(".router-wrap").scrollTop = 0;//回到顶部
        setTimeout(()=>{//设置左右列高度
          let colList = document.querySelectorAll('.list .col-list');
          if(colList.length==2){
            let dist = colList[0].clientHeight - colList[1].clientHeight;
            if(Math.abs(dist) > 200){
              this.isTooLong = dist>0?'left':'right';
            }else{
              this.isTooLong = '';
            }
          }
        },1000)
      },
      switchTabItem(index){//点击tab
        this.tabIndex = index;
        this.getList();
      },
      getList(){
        this.$vux.loading.show({text: '加载中'});
        getBlindDateList(this.params).then((data)=>{
          this.list.length==0 ? this.list = data.list : this.list.reverse();
          this.$nextTick(this.setStyle)
          this.$vux.loading.hide();
        })
      }
    },
    mounted(){
      this.getList();
      this.tabLimit = document.querySelector('.post .post-header').clientHeight;
    }
  }
</script>


<style lang="scss">
  @import '../../styles/views/post.scss';
  //相亲列表
  .blindDate-list{
    .list{
      padding: 0.5rem 0.25rem;
      overflow: hidden;
      .col-list{
        width: 8.5rem;
        float: left;
        margin: 0 0.25rem;
        &.too-long{
          .list-item:nth-last-of-type(1),.list-item:nth-last-of-type(2){
            &>img{
              height: 7rem;
              object-fit: cover;
            }
          }
        }
        .list-item{
          width: 8.5rem;
          float: left;
          margin-bottom: 0.5rem;
          border-radius: 5px;
          overflow: hidden;
          img{
            display: block;
            width: 100%;
            height: auto;
          }
          .bottom-info{
            padding: 0.3rem;
            background-color: #fff;
            h3{
              font-size: 0.8rem;
              line-height: 1.5rem;
            }
            p{
              color: #999999;
              overflow: hidden;
              line-height: 0.8rem;
              img{
                width: 0.8rem;
                height: 0.8rem;
                float: left;
                margin-right: 0.3rem;
                border-radius: 50%;
              }
              span{
                font-size: 0.6rem;
                float: right;
                i{
                  margin-right: 0.2rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
