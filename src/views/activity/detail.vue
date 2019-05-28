<template>
  <div class="post-detail" v-if="obj.user">
    <h2 class="title ellipsis">{{obj.title}}</h2>
    <div class="userInfo">
      <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
      <div class="name">
        {{obj.user.username}}
        <span :style="{'background-color': levelList[obj.user.level-1].color}">Lv{{obj.user.level}} 永久会员</span>
      </div>
      <div class="time">
        {{obj.time}}
        <span><i class="iconfont icon-user">{{obj.join}}</i></span>
      </div>
    </div>

    <div class="content">
      <table class="table">
        <tr>
          <td>活动类型</td><td>{{obj.type}}</td>
        </tr>
        <tr>
          <td>活动地点</td><td>{{obj.address}}</td>
        </tr>
        <tr>
          <td>活动内容</td><td>{{obj.content}}</td>
        </tr>
      </table>
    </div>

    <div class="img-item">
      <img v-lazy="obj.cover" alt="">
    </div>

    <div class="mini-button-row">
      <div class="button" @tap="join">报名参加</div>
    </div>

    <Comment />
  </div>
</template>

<script>
  import {getActivityList} from '@/api/post'
  import {levelList} from '@/data'
  import Comment from '@/components/Comment'
  import iScroll from '@/utils/IScroll/index.js'
  export default {
    components:{Comment},
    mixins: [iScroll],
    data(){
      return{
        post_id: '',
        obj: {},
        levelList,
      }
    },
    methods:{
      getList(){
        this.$vux.loading.show({text: '加载中'});
        getActivityList({
          post_id:this.post_id
        }).then((data)=>{
          if(data.list.length > 0){
            this.obj = data.list[0];
          }
          this.$vux.loading.hide();
        })
      },
      join(){
        this.$vux.toast.show({text:'报名成功'});
      }
    },
    created(){
      this.post_id = this.$route.params.id;
      if(this.post_id){
        this.getList();
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/views/post.scss';
</style>

