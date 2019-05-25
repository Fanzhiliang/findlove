<template>
  <div class="post-detail" v-if="obj.user">
    <h2 class="title ellipsis">{{obj.title}}</h2>
    <div class="userInfo">
      <img src="/static/img/default-head.gif" alt="">
      <div class="name">
        {{obj.user.username}}
        <span :style="{'background-color': levelList[obj.user.level-1].color}">Lv{{obj.user.level}} 永久会员</span>
      </div>
      <div class="time">
        {{obj.time}}
        <span><i class="iconfont icon-chatlinemtui">{{obj.comment}}</i></span>
        <span><i class="iconfont icon-eye">{{obj.join}}</i></span>
      </div>
    </div>

    <div class="content" v-html="obj.content"></div>

    <div class="img-item" v-for="(item,index) in obj.imgUrls" :key="index">
      <img v-lazy="item" alt="" v-if="typeof item == 'string'">
    </div>

    <div class="mini-button-row">
      <div class="button" @click="isShowDialog=true">打赏</div>
    </div>
    <!-- 打赏框 -->
    <x-dialog v-model="isShowDialog">
      <div class="dialog-userInfo">
        <img src="/static/img/default-head.gif" alt="">
        <p class="username">{{obj.user.username}}</p>
        <p class="t">发帖不易，打赏一下楼主吧</p>
        <span @click="isShowDialog=false" class="vux-close"></span>
      </div>
      <div class="input-panel">
        <div class="row integral">
          <label for="">积分</label>
          <input type="text">
        </div>
        <div class="row no-label">
          <input type="text" placeholder="说两句鼓励一下...">
        </div>
        <div class="center-row">
          <XSwitch title="通知作者"></XSwitch>
        </div>
        <div class="center-row">
          <x-button type="primary" class="button">打赏</x-button>
        </div>
      </div>
    </x-dialog>

    <Comment />
  </div>
</template>

<script>
  import {getPostList} from '@/api/post'
  import {levelList} from '@/data'
  import Comment from '@/components/Comment'
  import {XDialog,XButton,XSwitch} from 'vux'
  export default {
    components:{Comment,XDialog,XButton,XSwitch},
    data(){
      return{
        post_id: '',
        obj: {},
        levelList,
        isShowDialog: false,
      }
    },
    methods:{
      getList(){
        this.$vux.loading.show({text: '加载中'});
        getPostList({
          post_id:this.post_id
        }).then((data)=>{
          if(data.list.length > 0){
            this.obj = data.list[0];
          }
          this.$vux.loading.hide();
        })
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

