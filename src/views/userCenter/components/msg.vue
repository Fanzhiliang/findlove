<template>
  <div class="item-list">
    <div class="row-item" v-for="(item,index) in msglist" :key="index">
      <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
      <h3 class="ellipsis">
        {{item.username}}
        <span>{{item.time}}</span>
      </h3>
      <p class="ellipsis">
        {{item.content}}
        <span v-if="item.noread && item.noread > 0">{{item.noread < 100 ? item.noread : 99}}</span>
      </p>
    </div>
    <Pager :pageNo.sync="params.pageNo" :pageSize="params.pageSize"/>
  </div>
</template>

<script>
  import Pager from '@/components/Pager'
  export default {
    components:{Pager},
    data(){
      return{
        params:{
          pageNo: 1,
          pageSize: 1
        },
        msglist:[
          {username: 'alcyh',content:'在吗？',noread:10,time:'3分钟前'},
          {username: '蚊子腿细也是肉',content:'彳亍口巴',noread:126,time:'06:54'},
          {username: 'xl',content:'当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。例如我们来展开说一说这个多标签界面',noread:1,time:'2019-05-04'},
        ]
      }
    }
  }
</script>

