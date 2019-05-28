import IScroll from './iscroll'
export default{
  methods:{
    _initIScrollBar(){
      console.log(window.iscrollObj)
      if(typeof window.iscrollObj != 'undefined'){
        window.iscrollObj.destroy();
        window.iscrollObj = undefined;
        let bar = document.querySelector('.iScrollVerticalScrollbar');
        if(bar){
          bar.parentNode.removeChild(bar)
        }
      }
      window.iscrollObj = new IScroll('#router-wrap',{
        scrollbars: 'custom',
        fadeScrollbars: true,
        interactiveScrollbars: true,
        resizeScrollbars: false,
        tap: true,
        // click: true,
        // preventDefault: false,
      });
    },
    _refreshIScrollBar(){
      setTimeout(() => {
        if(window.iscrollObj && window.iscrollObj.refresh){
          window.iscrollObj.refresh();
        }
      }, 20);
    }
  },
  mounted(){
    console.log('mounted')
    setTimeout(this._initIScrollBar,600);
    //this.$nextTick(this._initIScrollBar);
  },
  updated(){
    this.$nextTick(this._refreshIScrollBar);
  }
}
