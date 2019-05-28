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
        <span><i class="iconfont icon-chatlinemtui">{{obj.comment}}</i></span>
        <span><i class="iconfont icon-eye">{{obj.join}}</i></span>
      </div>
    </div>

    <div class="content" v-html="obj.content"></div>

    <div class="img-item" v-for="(item,index) in obj.imgUrls" :key="index">
      <img v-lazy="item" alt="" v-if="typeof item == 'string'">
    </div>

    <div class="mini-button-row" @tap="call">
      <div class="button">联系对方</div>
    </div>

    <Comment />
  </div>
</template>

<script>
  import {getBlindDateList} from '@/api/post'
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
        getBlindDateList({
          post_id:this.post_id
        }).then((data)=>{
          if(data.list.length > 0){
            this.obj = data.list[0];
          }
          this.$vux.loading.hide();
        })
      },
      call(){//联系对方
        this.$router.push('/userCenter');
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

