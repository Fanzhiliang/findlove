<template>
  <div>
    <div v-for="(item,index) in bgUrls" :key="index" :class="['bgs',{'on':bgIndex==index}]" :style="{'background-image': `url(${item})`}"></div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      bgUrls: [
        'http://findloveimg.alcyh.com/comiis_bg_1.jpg',
        'http://findloveimg.alcyh.com/comiis_bg_2.jpg',
        'http://findloveimg.alcyh.com/comiis_bg_3.jpg',
        'http://findloveimg.alcyh.com/comiis_bg_4.jpg',
        'http://findloveimg.alcyh.com/comiis_bg_5.jpg'
      ],
      bgIndex: 0,//当前背景下标
      bgTimer: null,
      bgInterval: 5000
    }
  },
  methods:{
    changeBgUrl(){
      this.bgIndex = this.bgIndex == this.bgUrls.length - 1 ? 0 : this.bgIndex + 1;
    },
  },
  created(){
    this.bgTimer = setInterval(this.changeBgUrl,this.bgInterval);
  },
  beforeDestroy(){
    clearInterval(this.bgTimer);
  },
}
</script>

<style lang="scss">
  .bgs{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    z-index: -1;
    opacity: 0;
    transition: opacity 1s ease-in;
    &.on{
      opacity: 1;
    }
  }
</style>


