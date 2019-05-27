<template>
  <div class="photo-list">
    <div class="img-wrap" v-for="(item,index) in photoList" :key="index">
      <img class="inner-img" v-lazy="item.src" @click="show(index)"/>
    </div>

    <div v-transfer-dom>
      <previewer :list="photoList" ref="previewer" :options="options"></previewer>
    </div>

    <Pager :pageNo.sync="params.pageNo" :totalSize="params.totalSize"/>
  </div>
</template>

<script>
  import{Previewer,TransferDom} from 'vux'
  import Pager from '@/components/Pager'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,Pager
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
      }
    },
    data(){
      return{
        params:{
          pageNo: 1,
          pageSize: 2,
          totalSize: 1
        },
        photoList: [
          {src:'http://findloveimg.alcyh.com/cover-1.jpg'},
          {src:'http://findloveimg.alcyh.com/cover-2.jpg'},
          {src:'http://findloveimg.alcyh.com/cover-3.jpg'},
          {src:'http://findloveimg.alcyh.com/cover-4.jpg'},
          {src:'http://findloveimg.alcyh.com/cover-5.jpg'},
          {src:'http://findloveimg.alcyh.com/cover-6.jpg'},
          {src:'http://findloveimg.alcyh.com/man-1.jpg'},
          {src:'http://findloveimg.alcyh.com/man-2.jpg'},
          {src:'http://findloveimg.alcyh.com/man-3.jpg'},
          {src:'http://findloveimg.alcyh.com/man-4.jpg'},
          {src:'http://findloveimg.alcyh.com/man-5.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-1.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-2.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-3.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-4.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-5.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-6.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-7.jpg'},
          {src:'http://findloveimg.alcyh.com/woman-8.jpg'},
        ],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.inner-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    }
  }
</script>



