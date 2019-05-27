<template>
  <div class="post-list">
    <div class="post-item" v-for="(item,index) in postList" :key="index">
      <div class="user-row">
        <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        <div class="info">
          {{item.username}}
          <span :style="{'background-color':levelList[item.level-1].color}">Lv{{item.level}}</span>
        </div>
        <div class="time">
          <span>{{item.time}}</span><span>来自</span><span>{{item.address}}</span>
        </div>
      </div>
      <div class="title ellipsis">{{item.title}}</div>
      <div class="content more-ellipsis">{{item.content}}</div>

      <div class="imgs">
        <div class="img-item" v-for="(src,i) in item.imgSrcs" :key="i" :style="{'background-image':`url(${src})`}"></div>
      </div>

    </div>

    <Pager v-show="postList.length>0" :pageNo.sync="params.pageNo" :totalSize="params.totalSize"/>
  </div>
</template>

<script>
  import {levelList} from '@/data'
  import Pager from '@/components/Pager'
  export default {
    components:{Pager},
    data(){
      return{
        levelList,
        params:{
          pageNo: 1,
          pageSize: 2,
          totalSize: 5
        },
        postList: []
      }
    },
    watch:{
      params:{
        handler(params){
          this.getList();
        },
        deep: true
      }
    },
    methods:{
      goTop(){
        document.querySelector(".router-wrap").scrollTop = 0;
      },
      getList(){
        this.$vux.loading.show({text:'加载中'});
        setTimeout(() => {
          this.$vux.loading.hide();
          this.$nextTick(this.goTop);
          if(this.postList.length>0){
            this.postList.reverse();return;
          }
          this.postList = [
            {
              username: 'fzl',level:8,time:'2019-05-04',address:'北京',title:'纪念五四运动100周年',
              content:'今天是五四运动 100 周年。在中国的语境中，它既是一次反帝救亡的学生运动，也是新文化运动的一个结果。而新文化运动，与《新青年》和它的前身《青年杂志》息息相关。今天的纪念，我是直接拿来：100 年前，先行者如何看世界，如何设置议题，如何推动了中国进步……',
              imgSrcs:[
                'http://findloveimg.alcyh.com/cover-1.jpg','http://findloveimg.alcyh.com/cover-2.jpg',
                'http://findloveimg.alcyh.com/cover-4.jpg','http://findloveimg.alcyh.com/cover-5.jpg',
                'http://findloveimg.alcyh.com/cover-6.jpg'
              ]
            },
            {
              username: 'fzl',level:8,time:'2019-05-13',address:'广州',title:'当红男演员相亲',
              content:'本人当红男演员，年龄：22、身高：180、体重：130、家财万贯不差钱，本科学历，心地善良，能说会道 ……',
              imgSrcs:[
                'http://findloveimg.alcyh.com/cover-3.jpg','http://findloveimg.alcyh.com/man-2.jpg'
              ]
            }
          ]
        }, 1000);
      }
    },
    created(){
      this.getList();
    }
  }
</script>

