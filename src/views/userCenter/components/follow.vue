<template>
  <div class="item-list">
    <div class="row-item" v-for="(item,index) in friendlist" :key="index" @tap="$router.push(item.path)">
      <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
      <h3 class="ellipsis">{{item.name}}</h3>
      <p class="ellipsis">
        <em>今日:{{item.today}}</em><em>帖子:{{item.post}}</em><em>关注:{{item.follow}}</em>
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
        friendlist:[
          {name: '广州相亲',img:'http://findloveimg.alcyh.com/a01.png',today:138,post:684654,follow:9846,path:'/blindDate/list'},
          {name: '佛山相亲',img:'http://findloveimg.alcyh.com/a04.png',today:41,post:33547,follow:654,path:'/blindDate/list'}
        ]
      }
    }
  }
</script>

