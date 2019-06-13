import IScroll from './iscroll-probe'

let _scrollEl = '#router-wrap';
//巨坑留意：
//iScroll实现滚动是用transform: translate()实现的，如果_scrollEl里有position: fixed的元素会出现偏移

export default{
  data(){
    return{
      _IScrollBarScroll: ()=>{},
      _IScrollBarScrollEnd: ()=>{},
    }
  },
  methods:{
    _initIScrollBar(){
      this._destroyIScrollBar();
      window.iscrollObj = new IScroll(_scrollEl,{
        scrollbars: 'custom',
        fadeScrollbars: true,
        interactiveScrollbars: true,
        resizeScrollbars: false,
        tap: true,
        // click: true,
        // preventDefault: false,
        probeType: 2,//为了监听滚动事件，需要设置监听的精度
      });
      typeof this._IScrollBarScroll == 'function' && window.iscrollObj.on('scroll',this._IScrollBarScroll);
      typeof this._IScrollBarScrollEnd == 'function' && window.iscrollObj.on('scrollEnd',this._IScrollBarScrollEnd);
      document.querySelectorAll(_scrollEl+' img').forEach((item)=>{
        item.addEventListener('load',this._refreshIScrollBar);
      })
    },
    _refreshIScrollBar(){
      setTimeout(() => {
        if(window.iscrollObj && window.iscrollObj.refresh){
          window.iscrollObj.refresh();
        }
      }, 20);
    },
    _destroyIScrollBar(){
      if(typeof window.iscrollObj != 'undefined'){
        window.iscrollObj.destroy();
        window.iscrollObj = undefined;
        let bar = document.querySelector('.iScrollVerticalScrollbar');
        if(bar){
          bar.parentNode.removeChild(bar)
        }
      }
    },
    _setIScrollBarScroll(func){//设置滚动事件
      this._IScrollBarScroll = func;
    },
    _setIScrollBarScrollEnd(func){//设置结束滚动事件
      this._IScrollBarScrollEnd = func;
    }
  },
  mounted(){
    setTimeout(this._initIScrollBar,600);
    //this.$nextTick(this._initIScrollBar);
  },
  updated(){
    this.$nextTick(this._refreshIScrollBar);
  },
  beforeDestroy(){
    this._destroyIScrollBar();
    this._setIScrollBarScroll(()=>{});
    this._setIScrollBarScrollEnd(()=>{});
    document.querySelectorAll(this._scrollEl+' img').forEach((item)=>{
      item.removeEventListener('load',this._refreshIScrollBar);
    })
  }
}
