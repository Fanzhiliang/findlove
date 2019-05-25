<template>
  <div class="post">
    <div class="post-header">
      <img src="/static/img/a03.png" alt="">
      <h3>公告活动</h3>
      <p class="num">
        <span>今日:76128</span><span>帖子:38324</span><span>今日:128</span>
      </p>
      <p class="info">下列活动都已经经过官方审核</p>
      <XButton v-if="ableFollow" @click.native="ableFollow=false" class="follow-button" mini type="primary"><i class="iconfont icon-add"></i>关注</XButton>
      <XButton v-else @click.native="ableFollow=true" class="follow-button disabled" mini :plain="true">已关注</XButton>
    </div>

    <div class="activity-list">
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push('/activity/detail/'+item.post_id)">
          <img :src="item.cover" alt="">
          <p class="ellipsis">{{item.title}}<i class="iconfont icon-user">{{item.join}}</i></p>
        </div>
      </div>
      <Pager :pageNo.sync="params.pageNo" :totalSize="params.totalSize"/>

    </div>
  </div>
</template>

<script>
  import {XButton,Tab,TabItem} from 'vux'
  import {getActivityList} from '@/api/post'
  import Pager from '@/components/Pager'
  export default {
    components:{XButton,Tab,TabItem,Pager},
    data(){
      return{
        params:{
          pageSize: 10,
          pageNo: 1,
          totalSize: 3
        },
        ableFollow: true,
        list: [],
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
      },
      getList(){
        this.$vux.loading.show({text: '加载中'});
        getActivityList(this.params).then((data)=>{
          this.list.length==0 ? this.list = data.list : this.list.reverse();
          this.$nextTick(this.setStyle)
          this.$vux.loading.hide();
        })
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>

<style lang="scss">
  @import '../../styles/views/post.scss';
  //活动列表
  .activity-list{
    .list{
      padding: 0.5rem;
      overflow: hidden;
      .item{
        background-color: #fff;
        margin-bottom: 0.8rem;
        img{
          display: block;
          width: 100%;
          height: 8rem;
        }
        p{
          overflow: hidden;
          padding-left: 0.3rem;
          padding-right: 3rem;
          line-height: 1.5rem;
          color: #777777;
          position: relative;
          i{
            font-size: 0.6rem;
            position: absolute;
            right: 0.3rem;
            top: 0;
            &::before{
              margin-right: 0.15rem;
            }
          }
        }
      }
    }
  }
</style>
