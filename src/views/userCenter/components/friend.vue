<template>
  <div class="item-list">
    <div class="row-item" v-for="(item,index) in friendlist" :key="index">
      <img src="/static/img/default-head.gif" alt="">
      <h3 class="ellipsis">{{item.username}}</h3>
      <p class="ellipsis">{{item.sign}}</p>
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
        friendlist:[
          {username: 'alcyh',sign:'我也能找到吗？在仅有一次的生命里。'},
          {username: 'xxl',sign:''},
          {username: '蚊子腿细也是肉',sign:'这家伙很懒，什么也没留下... '},
          {username: 'xl',sign:'本人已死，有事烧纸~'},
        ]
      }
    }
  }
</script>

