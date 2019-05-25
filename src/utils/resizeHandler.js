import { debounce } from "@/utils";

export default{
  data(){
    return{
      _Width: 0,
      _Height: 0,
    }
  },
  methods:{
    _resizeHandler(){},//resize事件
    _keyboardShow(){},//显示键盘
    _keyboardHide(){},//收起键盘
    _horizontal(){},//变成横屏
    _vertical(){},//变成竖屏
    _resize(){}
  },
  beforeMount(){
    this._resize = debounce((e={})=>{
      let html = document.querySelector('html');
      let newWidth = html.clientWidth;//新宽度
      let newHeight = html.clientHeight;//新高度
      let param = Object.assign(e,{
        newWidth,newHeight,oldWidth:this._Width,oldHeight:this._Height
      })
      
      typeof this._resizeHandler == 'function' && this._resizeHandler(param);

      if(this._Height == 0 && this._Width == 0){
        //初始
      }else if(newWidth == this._Width){
        if(newHeight < this._Height){//宽度不变，高度减少判断为：键盘显示
          typeof this._keyboardShow == 'function' && this._keyboardShow(param);
        }else if(newHeight > this._Height){//宽度不变，高度增加判断为：键盘收起
          typeof this._keyboardHide == 'function' && this._keyboardHide(param);
        }
      }else if(newWidth > this._Width && newHeight < this._Height){//宽度增加，高度减少判断为：变成横屏
        typeof this._horizontal == 'function' && this._horizontal(param);
      }else if(newWidth < this._Width && newHeight > this._Height){//宽度减少，高度增加判断为：变成竖屏
        typeof this._vertical == 'function' && this._vertical(param);
      }

      this._Width = newWidth;
      this._Height = newHeight;
    },100)
    window.addEventListener('resize',this._resize);
  },
  mounted(){
    this._resize();
  },
  beforeDestroy(){
    window.removeEventListener('resize',this._resize);
  }
}