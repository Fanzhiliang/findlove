<template>
	<div class="editor-wrap">
		<textarea :id="id"></textarea>
    <!-- <SelectImages @successUpload="successUpload"/> -->
	</div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
// import SelectImages from './components/selectImages'//这里的图片上传不一样

export default{
  props:{
    value:{
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default: () => toolbar
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    placeholder: {
      type: String,
      default: 'placeholder'
    }
  },
  data(){
    return{
      id: 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
      language: 'zh_CN',
      isInit: false,
      isChange: false,
      fullscreen: false
    }
  },
  watch:{
    value(val){
      if(!this.isChange && this.isInit){
        this.$nextTick(()=>{
          this.$emit('input', val||'');
          this.setContent(val||'');
        })
      }
    }
  },
  methods:{
    initTinymce(){
      let that = this;
      window.tinymce.init({
        language: this.language,
        selector: `#${this.id}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: [''],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        content_css: '/static/css/tinymce_reset.css',//重置样式
        init_instance_callback: editor => {//初始化成功
          if (that.value) {
            editor.setContent(that.value)
          }
          that.isInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {//全部的改变事件
            this.isChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {//是否全屏
            that.fullscreen = e.state
          })
          editor.on('init', ()=>{
            that.setContent(`<p id="tinymcePlaceholder">${that.placeholder}</p>`);
          })
          editor.on('focus', ()=>{
            let Placeholder = document.querySelector('iframe').contentDocument.querySelector('#tinymcePlaceholder');
            if(Placeholder){
              Placeholder.parentNode.removeChild(Placeholder);
            }
          })
        }
      })
    },
    destroyTinymce(){
      const tinymce = window.tinymce.get(this.id);
      if(this.fullscreen){
        tinymce.execCommand('mceFullScreen')
      }
      if(tinymce){
        tinymce.destroy();
      }
    },
    setContent(val){
      window.tinymce.get(this.id).setContent(val);
    },
    insertContent(val){
      window.tinymce.get(this.id).insertContent(val);
    },
    getContent(){
      return window.tinymce.get(this.id).getContent();
    },
    successUpload(urls){
      urls.forEach((u)=>{
        window.tinymce.get(this.id).insertContent(`<img src="${u}" >`)
      })
    }
  },
  mounted(){
    this.initTinymce();
  },
  activated(){
    this.initTinymce();
  },
  destroyed(){
    this.destroyTinymce();
  },
  components:{
    // SelectImages
  }
}
</script>

<style scoped>
  .editor-wrap{
    position: relative;
  }
</style>