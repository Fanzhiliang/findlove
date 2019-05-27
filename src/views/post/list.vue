<template>
  <div class="post">
    <div class="post-header">
      <img src="http://findloveimg.alcyh.com/a02.png" alt="">
      <h3>吐槽分享</h3>
      <p class="num">
        <span>今日:87964</span><span>帖子:4516</span><span>今日:321</span>
      </p>
      <p class="info">分享你的所见所闻，禁止发布黄毒赌内容！</p>
      <XButton v-if="ableFollow" @click.native="ableFollow=false" class="follow-button" mini type="primary"><i class="iconfont icon-add"></i>关注</XButton>
      <XButton v-else @click.native="ableFollow=true" class="follow-button disabled" mini :plain="true">已关注</XButton>
    </div>

    <div class="post-list">
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index" @click="goPost(index)">
          <div class="left-col">
            <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
          </div>
          <div class="right-col">
            <div class="name">
              {{item.user.username}}
              <span :style="{'background-color': levelList[item.user.level-1].color}">Lv{{item.user.level}}</span>
            </div>
            <div class="title ellipsis">{{item.title}}</div>
            <div class="content more-ellipsis">{{item.content}}</div>
            <div class="time">
              {{item.time}}
              <div class="toogle" ref="toggleMore" @click.stop="">
                <span><i class="iconfont icon-chatlinemtui" @click="goPost(index)">评论</i></span>
                <span><i class="iconfont icon-heart1" @click="like(index)">点赞</i></span>
              </div>
              <i class="iconfont icon-more" @click.stop="toggleMore(index)"></i>
            </div>
            <div class="img-row">
              <img v-for="(it,i) in item.imgUrls" :key="i" :src="it" alt="">
            </div>
            <div class="comment">
              <div class="comment-item">
                <span class="name">一只小小小小鸟</span>：大家好，可以多多留言，如果遇到骗子一定要向管理员举报！
              </div>
              <div class="comment-item">
                <span class="name">樊致良</span>：怎么每个页面下面的评论都一样的？
              </div>
              <div class="comment-item">
                <span class="name">一只小小小小鸟</span>
                <span class="middle">回复</span>
                <span class="name">樊致良</span>：因为没有数据，现在评论组件里面的都是静态的。。。
              </div>
              <div class="comment-item">查看全部评论</div>
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
  import {getPostList} from '@/api/post'
  import Pager from '@/components/Pager'
  import {levelList} from '@/data'
  import {html2Text,toggleClass} from '@/utils'
  export default {
    components:{XButton,Tab,TabItem,Pager},
    data(){
      return{
        params:{
          pageSize: 10,
          pageNo: 1,
          totalSize: 5
        },
        levelList,
        ableFollow: true,
        list: [],
        isShowToggle: false,//是否有显示toggle
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
        getPostList(this.params).then((data)=>{
          this.list.length==0 ? this.list = data.list : this.list.reverse();
          this.list.forEach((item)=>{
            item.content && (item.content = html2Text(item.content));
            item.imgUrls && item.imgUrls instanceof Array && (item.imgUrls = item.imgUrls.splice(0,3));
          })
          this.$nextTick(this.setStyle)
          this.$vux.loading.hide();
        })
      },
      toggleMore(index){
        let toggleItem = this.$refs.toggleMore[index];
        if(toggleItem && toggleClass(toggleItem,' on')){
          this.isShowToggle = true;
        }
      },
      closeAllToggle(){//关闭全部toggle
        this.$refs.toggleMore.forEach((item)=>{
          item.className = 'toogle';
        })
        this.isShowToggle = false;
      },
      like(index){//点赞
        this.toggleMore(index);
        this.$vux.toast.show({text: '点赞成功'});
      },
      goPost(index){//前往帖子
        if(this.isShowToggle){
          this.closeAllToggle();
        }else{
          this.$router.push('/post/detail/'+this.list[index].post_id);
        }
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>

<style lang="scss">
  @import '../../styles/views/post.scss';
  //帖子列表
  .post-list{
    .list{
      overflow: hidden;
      margin: 0.5rem 0;
      .item{
        padding: 0.5rem 0.5rem 0.5rem 3rem;
        position: relative;
        background-color: #fff;
        border-bottom: 1px solid #dedede;
        cursor: pointer;
        .left-col{
          position: absolute;
          top: 0;
          left: 0;
          img{
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            margin: 0.5rem;
          }
        }
        .right-col{
          .name{
            color: #FFB300;
            font-size: 0.8rem;
            margin-bottom: 0.4rem;
            span{
              color: #fff;
              margin-left: 0.3rem;
              line-height: 0.75rem;
              font-size: 0.6rem;
              padding: 0 0.2rem;
              display: inline-block;
              vertical-align: middle;
            }
          }
          .title{
            font-size: 0.85rem;
            margin-bottom: 0.3rem;
          }
          .content{
            font-size: 0.7rem;
            margin-bottom: 0.3rem;
            line-height: 1rem;
            height: 2rem;
            overflow: hidden;
            color: #999999;
          }
          .time{
            color: #dddddd;
            line-height: 1.5rem;
            margin-bottom: 0.4rem;
            position: relative;
            i{
              float: right;
              color: #777777;
              font-size: 0.8rem;
              padding-left: 1rem;
            }
            .toogle{
              position: absolute;
              top: 0;
              right: 1.5rem;
              background-color: #000;
              transition: all 0.3s;
              width: 0;
              height: 1.5rem;
              padding: 0;
              overflow: hidden;
              span{
                i{
                  font-size: 0.6rem;
                  color: #fff;
                  padding: 0 0.3rem;
                  &::before{
                    margin-right: 0.2rem;
                  }
                }
              }
              &.on{
                width: initial;
                padding: 0 0.3rem;
              }
            }
          }
          .img-row{
            overflow: hidden;
            margin-bottom: 1rem;
            img{
              width: 4.88rem;
              height: 4.88rem;
              margin-right: 0.2rem;
              float: left;
              object-fit: cover;
            }
          }
          .comment{
            background-color: #f3f3f3;
            padding: 0.5rem;
            position: relative;
            .comment-item{
              font-size: 0.65rem;
              padding-bottom: 0.3rem;
              line-height: 0.9rem;
              .name{
                color: #FFB300;
                font-size: 0.65rem;
              }
              .middle{
                margin: 0 0.2rem;
              }
            }
            &::before{
              content: '';
              display: inline-block;
              position: absolute;
              top: -0.9rem;
              left: 0.3rem;
              border: 0.5rem solid transparent;
              border-bottom-color: #f3f3f3;
            }
          }

        }
      }
    }
  }
</style>
