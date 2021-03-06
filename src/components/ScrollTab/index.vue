<template>
  <div :style="{height}" @mousemove.stop="" @mousedown.stop="" @touchmove.stop="" @touchstart.stop="" @click.stop="" @tap.stop="" @mousewheel.stop="" @scroll.stop="" @wheel.stop="" @animationend.stop="" @transitionend.stop="" @pointerdown.stop="" @resize.stop="">
    <!-- 阻止pointerdown是为了避免冒泡触发父组件的iScroll插件 -->
    <div class="tab-wrap" :style="stickyStyle"
    @mousemove.prevent="dragHandler" @touchmove.prevent="dragHandler" @mouseleave.prevent="endDrag"
      @mousedown.prevent="startDrag" @touchstart.prevent="startDrag"
          @mouseup.prevent="endDrag" @touchend.prevent="endDrag">
      <div class="tab-inner" :style="tabStyle">
        <tab :scroll-threshold="list.length" prevent-default v-model="tabIndex" @on-before-index-change="switchTabItem">
          <tab-item v-for="(item,index) in  list" :key="index">{{item.name}}</tab-item>
        </tab>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab,TabItem} from 'vux'
  export default {
    components:{Tab,TabItem},
    props:{
      list:{
        type: Array,
        default: ()=>[]
      },
      value:{
        default: 0
      },
      scrollEl:{
        type: String,
        default: '.router-wrap'
      },
      scrollTop:{
        type: Number,
        default: 0
      },
      fixedTop:{
        type: String,
        default: '0'
      },
      height:{
        type: String,
        default: '44px'
      }
    },
    data(){
      return{
        maxDist: 0,//最大移动距离
        maxScrollCount: 6,//最多显示数
        tabIndex: this.value,
        scrollWrap: null,
        isTabSticky: false,
        isMoveing: false,
        posX: 0,
        moveDist: 0,
        isMoved: false,//是否移动过
        iScrollTop: 0,//如果使用iScroll的滚动距离
        isHideBar: false,//是否隐藏

      }
    },
    computed:{
      tabStyle(){
        return{
          transform: `translateX(${this.moveDist}px)`,
          height: this.height,
          width: this.list.length<=6 ? '100%' : ( (this.list.length % this.maxScrollCount==0 ? this.list.length/this.maxScrollCount : parseInt(this.list.length/this.maxScrollCount)+1) * 90)  +'%'
        }
      },
      stickyStyle(){
        return this.isTabSticky?{
          top: this.fixedTop,
          position: 'fixed',
          left: 0,
          width: '100%',
          height: (parseInt(this.height)-2)+'px',
          marginTop: this.iScrollTop>0?'calc('+this.iScrollTop+'px - '+this.fixedTop+')':'',
          opacity: this.isHideBar?0:1,
        }:{}
      }
    },
    watch:{
      moveDist(newValue,oldValue){
        let temp = newValue - oldValue;
        if(Math.abs(temp)>10){
          this.isMoved = true;
        }
      }
    },
    methods:{
      switchTabItem(index){
        this.tabIndex = index;
        this.$emit('input',index);
        this.$emit('on-before-index-change',index);
      },
      scrollHandler(e){//普通滚动事件
        this.isTabSticky = this.scrollWrap.scrollTop >= this.scrollTop;
      },
      theIScrollHandler(){//使用了iscroll插件滚动事件
        let transformValue = this.scrollWrap.children[0].style.transform;
        if(transformValue.includes(', ')){
          let scrollTop = transformValue.split(', ')[1].split('px) ')[0];
          this.iScrollTop = -parseFloat(scrollTop);
          this.isTabSticky = this.iScrollTop >= this.scrollTop;
        }
      },
      init(){
        this.scrollWrap = document.querySelector(this.scrollEl);
        if(this.scrollWrap){
          this.scrollWrap.addEventListener('scroll',this.scrollHandler);
        }
        //下面两个事件逻辑有点乱
        this.$parent._setIScrollBarScroll && this.$parent._setIScrollBarScroll(() => {
          this.theIScrollHandler();//需要先判断出isTabSticky
          this.isHideBar = this.isTabSticky;//根据isTabSticky判断是否显示
        })
        this.$parent._setIScrollBarScrollEnd && this.$parent._setIScrollBarScrollEnd(()=>{
          this.isHideBar = false;//先显示
          this.theIScrollHandler();//再定位
        })
      },
      getPageX(e){//移动端touch事件e没有pageX值，需要判断获取pageX
        return typeof e.touches != 'undefined' && e.touches.length>0 ? e.touches[0].pageX : e.pageX;
      },
      startDrag(e){//开始拖动
        e.preventDefault()
        this.isMoveing = true;
        this.posX = this.getPageX(e);
      },
      endDrag(e){//结束拖动
        if(!this.isMoved){
          e.target.click();
        }else{
          this.isMoved = false;
        }
        e.preventDefault()
        this.isMoveing = false;
        this.resetMoveDist();

      },
      dragHandler(e){//拖动中
        e.preventDefault()
        if(this.isMoveing){
          let currX = this.getPageX(e);
          let newDist = this.moveDist + currX - this.posX;
          this.moveDist = newDist;
          this.posX = currX;
        }
      },
      resetMoveDist(){//恢复滑块位置
        let dir = 0;
        if(this.moveDist > 0){
          dir = -1;
        }else if(this.moveDist < -this.maxDist){
          dir = +1;
        }else{
          return;
        }
        let timer = setInterval(()=>{
          let newDist = this.moveDist + (dir * Math.ceil(this.moveDist/20));
          if(newDist<=0 || newDist>=-this.maxDist){
            clearInterval(timer);
            newDist =  dir<0?0:-this.maxDist;
          }
          this.isMoveing = false;//恢复期间禁止移动滑块
          this.moveDist = newDist;
        },5);
      }
    },
    mounted(){
      this.maxDist = document.querySelector('.tab-wrap .tab-inner').clientWidth-document.querySelector('.tab-wrap').clientWidth;
      this.init();
    },
    beforeDestroy(){
      if(this.scrollWrap){
        this.scrollWrap.removeEventListener('scroll',this.scrollHandler);
      }
    }
  }
</script>

<style>
  .tab-wrap{
    background-color: #fff;
    overflow: hidden;
  }
</style>


