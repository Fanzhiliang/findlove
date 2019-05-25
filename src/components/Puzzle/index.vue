<template>
  <div class="puzzle">
    <div class="bg" :style="bgStyle">
      <canvas id="puzzleBox" :style="canvasStyle(false)"></canvas>
      <canvas id="puzzleShadow" :style="canvasStyle(true)"></canvas>
      <canvas id="puzzleLost" :style="canvasStyle(true)"></canvas>
      <div class="canvas-mask" @click="toggleBg"></div>
    </div>
    <div class="ctrl-row" 
    @mousemove.prevent="dragHandler" @touchmove.prevent="dragHandler" @mouseleave.prevent="endDrag"
    @mousedown.prevent="startDrag" @touchstart.prevent="startDrag" 
        @mouseup.prevent="endDrag" @touchend.prevent="endDrag">
      <span>按住此处，拖动完成上方拼图</span>
      <div class="ctrl-bg" :style="ctrlBgStyle"></div>
      <div class="drap-obj" :style="drapObj" 
        >
        <img :src="arrowSrc" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import { setInterval, clearInterval } from 'timers';
  import arrowSrc from './img/double-arrow-right.png'
  import ver1 from './img/ver-1.png'
  import ver2 from './img/ver-2.png'
  import ver3 from './img/ver-3.png'
  export default {
    props:{
      urls:{
        type: Array,
        default: ()=>[]
      }
    },
    data(){
      return{
        bgWidth: 0,
        bgHeight: 0,
        arrowSrc,
        bgUrls: this.urls.length>0 ? this.urls: [ver1,ver2,ver3],
        bgIndex: 0,
        moveDist: 0,//移动的距离，px
        isMoveing: false,//是否开始移动
        posX: 0,
        resultDist: 0,
        isFinal: false,//是否完成
      }
    },
    computed:{
      bgStyle(){return{'background-image': `url(${this.bgUrls[this.bgIndex]})`}},
      ctrlBgStyle(){return{width: this.moveDist + 'px'}},
      drapObj(){return{left: this.moveDist + 'px'}}
    },
    watch:{
      bgIndex(){
        this.init();
      },
      moveDist(newValue,oldValue){
        if(newValue!=0){
          let dist = newValue - oldValue;
          this.resultDist += dist;
        }
      },
      resultDist(newValue){
        this.isFinal = newValue<5 && newValue>-5;
      }
    },
    methods:{
      toggleBg(){
        let temp = this.bgIndex;
        ++temp;
        if(temp>this.bgUrls.length-1){
          temp = 0;
        }
        this.bgIndex = temp;
      },
      canvasStyle(ableMove){
        return{
          width: this.bgWidth+'px',height: this.bgHeight+'px',
          'margin-left': ableMove?this.resultDist+'px':0
        }
      },
      RandomNum(Min, Max) {//生成范围内的随机数
        var Range = Max - Min;
        var Rand = Math.random();
        if (Math.round(Rand * Range) == 0) {
          return Min + 1;
        } else if (Math.round(Rand * Max) == Max) {
          return Max - 1;
        } else {
          var num = Min + Math.round(Rand * Range) - 1;
          return num;
        }
      },
      init(){
        this.moveDist = 0;
        let bg = document.querySelector(".puzzle .bg");
        var c = document.getElementById("puzzleBox");//这里提前获得
        this.bgWidth = bg.clientWidth;
        this.bgHeight = bg.clientHeight;
        //画布里面和外面的宽高不是一回事
        var W = c.width;
        var H = c.height;
        var PL_Size = W/8;//拼图大小
        var padding = W/16;
        this.resultDist = -this.RandomNum(PL_Size*2,PL_Size*4);
        var MinN_X = padding + PL_Size;
        var MaxN_X = W - padding - PL_Size - PL_Size / 6;
        var MaxN_Y = padding;
        var MinN_Y = H - padding - PL_Size - PL_Size / 6;
        var X = this.RandomNum(W/2, MaxN_X);
        var Y = this.RandomNum(MaxN_Y, MinN_Y);
        var d = PL_Size / 3;
        //var c = document.getElementById("puzzleBox");
        c.height = c.height;//重置画布
        var ctx = c.getContext("2d");
        ctx.globalCompositeOperation = "xor";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#fff";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.moveTo(X, Y);
        ctx.lineTo(X + d, Y);
        ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
        ctx.lineTo(X + 3 * d, Y);
        ctx.lineTo(X + 3 * d, Y + d);
        ctx.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d);
        ctx.lineTo(X + 3 * d, Y + 3 * d);
        ctx.lineTo(X, Y + 3 * d);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        var c_l = document.getElementById("puzzleLost");
        var c_s = document.getElementById("puzzleShadow");
        c_l.height = c_l.height;//重置画布
        c_s.height = c_s.height;//重置画布
        var ctx_l = c_l.getContext("2d");
        var ctx_s = c_s.getContext("2d");
        var img = new Image();
        img.src = this.bgUrls[this.bgIndex];
        img.onload =  () => {
          ctx_l.drawImage(img, 0, 0, W, H);
        }
        ctx_l.beginPath();
        ctx_l.strokeStyle = "rgba(0,0,0,0)";
        ctx_l.moveTo(X, Y);
        ctx_l.lineTo(X + d, Y);
        ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
        ctx_l.lineTo(X + 3 * d, Y);
        ctx_l.lineTo(X + 3 * d, Y + d);
        ctx_l.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d);
        ctx_l.lineTo(X + 3 * d, Y + 3 * d);
        ctx_l.lineTo(X, Y + 3 * d);
        ctx_l.closePath();
        ctx_l.stroke();
        ctx_s.fill();
        ctx_l.clip();
        ctx_s.beginPath();
        ctx_s.lineWidth = "1";
        ctx_s.strokeStyle = "rgba(0,0,0,0)";
        ctx_s.moveTo(X, Y);
        ctx_s.lineTo(X + d, Y);
        ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
        ctx_s.lineTo(X + 3 * d, Y);
        ctx_s.lineTo(X + 3 * d, Y + d);
        ctx_s.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d);
        ctx_s.lineTo(X + 3 * d, Y + 3 * d);
        ctx_s.lineTo(X, Y + 3 * d);
        ctx_s.closePath();
        ctx_s.stroke();
        ctx_s.shadowBlur = 20;
        ctx_s.shadowColor = "black";
        ctx_s.fill();
      },
      getPageX(e){//移动端touch事件e没有pageX值，需要判断获取pageX
        return typeof e.touches != 'undefined' && e.touches.length>0 ? e.touches[0].pageX : e.pageX;
      },
      startDrag(e){//开始拖动
        e.preventDefault()
        this.isMoveing = true;
        this.posX = this.getPageX(e);
      },
      dragHandler(e){//拖动中
        e.preventDefault()
        if(this.isMoveing){
          let currX = this.getPageX(e);
          let newDist = this.moveDist + currX - this.posX;
          if(newDist<=0){
            newDist = 0;
          }
          this.moveDist = newDist;
          this.posX = currX;
        }
      },
      endDrag(e){//结束拖动
        e.preventDefault()
        this.isMoveing = false;
        if(this.isFinal){//已经完成
          this.$emit('finalHandler');
        }else{//未完成恢复
          this.resetMoveDist();
        }
      },
      resetMoveDist(){//恢复滑块位置
        let timer = setInterval(()=>{
          let newDist = this.moveDist - Math.ceil(this.moveDist/20);
          if(newDist<=0){
            clearInterval(timer);
            newDist = 0;
          }
          this.isMoveing = false;//恢复期间禁止移动滑块
          this.moveDist = newDist;
        },5);
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style lang="scss">
  .puzzle{
    width: 16.75rem;
    height: 10rem;
    .bg{
      height: 7.5rem;
      background-size: cover;
      position: relative;
      canvas,.canvas-mask{
        position: absolute;
        top: 0;
        left: 0;
      }
      .canvas-mask{
        width: 100%;
        height: 100%;
        z-index: 999;
      }
    }
    .ctrl-row{
      margin-top: 1rem;
      height: 2rem;
      // border: 1px solid rgba(255, 255, 255, 0.3);
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      text-align: center;
      cursor: move;
      .ctrl-bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2rem;
        background-color: $theme-color;
      }
      span{
        font-size: 0.7rem;
        line-height: 2rem;
        margin-left: 1rem;
      }
      .drap-obj{
        position: absolute;
        top: -1px;
        left: 0;
        width: 2rem;
        height: 2rem;
        border: 1px solid #c5c5c5;
        border-radius: 5px;
        background-color: #fff;
        margin-left: -1px;
        text-align: center;
        img{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin: 0.5rem;
        }
      }
    }
  }
</style>


