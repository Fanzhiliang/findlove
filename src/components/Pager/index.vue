<template>
  <div class="pager" v-show="totalSize>1">
    <div :class="['item',{disabled:pageNo==1}]" @click="prev">上一页</div>
    <div :class="['item',{disabled:totalSize==1}]">
      第{{pageNo}}页
      <span><i class="iconfont icon-down"></i></span>
      <popup-picker :data="pageList" v-model="pageResult"></popup-picker>
    </div>
    <div :class="['item',{disabled:pageNo==totalSize}]" @click="next">下一页</div>
  </div>
</template>


<script>
  import {PopupPicker} from 'vux'
  export default {
    components:{PopupPicker},
    props:{
      pageNo:{
        default: 1
      },
      totalSize: {
        default: 1
      }
    },
    data(){
      return{
        pageList: [],
        pageResult: []
      }
    },
    watch:{
      totalSize(){
        this.init();
      },
      pageResult(){
        this.$emit('update:pageNo',this.pageResult[0]);
      }
    },
    methods:{
      init(){
        this.pageList = [];
        let tempList = []
        for(let i=1;i<=this.totalSize;i++){
          tempList.push(i);
        }
        this.pageList.push(tempList);
      },
      prev(){
        if(this.pageNo > 1){
          this.$emit('update:pageNo',this.pageNo-1);
        }
      },
      next(){
        if(this.pageNo < this.totalSize){
          this.$emit('update:pageNo',this.pageNo+1);
        }
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style lang="scss">
  .pager{
    width: 100%;
    height: 2.3rem;
    line-height: 2.3rem;
    clear: both;
    background-color: #fff;
    text-align: center;
    .item{
      height: 1rem;
      padding: 0 0.3rem;
      line-height: 1rem;
      color: #333;
      display: inline-block;
      vertical-align: middle;
      border: 1px solid #f3f3f3;
      border-radius: 3px;
      overflow: hidden;
      position: relative;
      margin: 0 5px;
      &.disabled{
        color: #f3f3f3;
      }
      span{
        display: inline-block;
        background-color: #f3f3f3;
        width: 1rem;
        height: 100%;
        margin-right: -0.3rem;
        i{
          font-size: 0.6rem;
        }
      }
      & div{
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

