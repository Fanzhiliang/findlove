<template>
  <div class="publish">
    <div class="tab-row">
      <div class="inner">
        <tab :line-width="2">
          <tab-item selected>{{$t('Post')}}</tab-item>
        </tab>
      </div>
    </div>

    <group label-width="3em">
      <x-input :title="$t('title')" :placeholder="$t('placeholder.required')" v-model="obj.title" @click.native="inputFocus('goTop')"></x-input>

      <PopupRadio :title="$t('type')" :placeholder="$t('placeholder.select')" :options="typeList" v-model="obj.type" value-align="left"></PopupRadio>

      <x-input :title="$t('time')" v-if="obj.type.includes('活动')" :placeholder="$t('placeholder.required')" v-model="obj.time" @click.native="inputFocus('goTop')"></x-input>

      <x-input :title="$t('address')" v-if="obj.type.includes('活动')" :placeholder="$t('placeholder.required')" v-model="obj.address" @click.native="inputFocus('goTop')"></x-input>

      <div class="text-wrap">
        <Tinymce ref="tinymce" v-model="obj.contnet" :toolbar="[]" :menubar="''" :height="180" :placeholder="$t('placeholder.share')"/>
      </div>

      <div class="imgs-row">
        <div class="img-item"
        v-for="(item,index) in imgSrcs" :key="index"
        :style="{'background-image':`url(${item})`}"
        @click="removeSrc(index)">
          <i class="iconfont icon-offline"></i>
        </div>
        <div class="add-img">
          <i class="iconfont icon-add"></i>
          <input type="file" accept="image/*" multiple @change="fileChange">
        </div>
      </div>

      <div class="toolbar-row">
        <div :class="['toolbar-item',{on:toggleIndex==0}]" @click="setToggleIndex(0)">
          <p><i class="iconfont icon-smile"></i></p>
          <p>{{$t('emoticons')}}</p>
        </div>
        <div :class="['toolbar-item',{on:toggleIndex==1}]" @click="setToggleIndex(1)">
          <p><i class="iconfont icon-callperson"></i></p>
          <p>{{$t('callfriend')}}</p>
        </div>
        <div :class="['toolbar-item',{on:toggleIndex==2}]" @click="setToggleIndex(2)">
          <p><i class="iconfont icon-link"></i></p>
          <p>{{$t('link')}}</p>
        </div>
      </div>

      <div class="toggle-row" v-show="toggleIndex!=-1">
        <transition-group name="fade">
        <!-- 选择表情 -->
        <div class="toggle-item" v-show="toggleIndex==0" :key="0">
          <div class="emoticons-swiper-wrap">
            <transition-group name="fade">
              <Swiper dots-position="center" v-for="(eObj,eObjIndex) in emoticons" :key="eObj.icon" v-show="eObjIndex==emoticonsIndex">
                <SwiperItem v-for="(list,index) in eObj.list" :key="index">
                  <div class="emoticons-wrap">
                    <div class="item" v-for="(src,i) in list" :key="i">
                      <img :src="src" @click="insertEmoticon(src)" alt="">
                    </div>
                  </div>
                </SwiperItem>
              </Swiper>
            </transition-group>
          </div>
          <div class="select-emoticons">
            <div :class="['item',{on:index==emoticonsIndex}]" v-for="(item,index) in emoticons" :key="index" @click="emoticonsIndex=index">
              <img :src="item.icon" alt="">
            </div>
          </div>
        </div>
        <!-- @朋友 -->
        <div class="toggle-item" v-show="toggleIndex==1" :key="1">
          <div>
            <div class="p-input-wrap">
              <input type="text" class="p-input" :placeholder="$t('placeholder.username')" v-model="callUser" @click="inputFocus('goBottom')">
              <XButton type="primary" mini @click.native="insertCallUser">@{{$t('add')}}</XButton>
            </div>
            <p class="b-tip">{{$t('remindFriend')}}</p>
          </div>
        </div>
        <!-- 链接 -->
        <div class="toggle-item" v-show="toggleIndex==2" :key="2">
          <div>
            <div class="p-input-wrap">
              <input type="text" class="p-input" :placeholder="$t('placeholder.linkWebsite')" v-model="linkHref" @click="inputFocus('goBottom')">
            </div>
            <div class="p-input-wrap">
              <input type="text" class="p-input" :placeholder="$t('placeholder.linkText')" v-model="linkName" @click="inputFocus('goBottom')">
            </div>
            <div class="p-input-wrap no-border">
              <XButton type="primary" mini @click.native="insertLink">{{$t('insert')}}</XButton>
            </div>
          </div>
        </div>
        </transition-group>
      </div>

      <div class="but-row">
        <XButton type="primary" @click.native="submitData">{{$t('publishBut')}}</XButton>
      </div>

    </group>

  </div>
</template>

<script>
  import { Tab,TabItem,XInput,Group,XButton,Cell,PopupRadio,Swiper,SwiperItem } from "vux"
  import Tinymce from '@/components/Tinymce'
  import {imgToBase64} from '@/utils'
  import {emoticons} from '@/data'
  import resizeHandler from '@/utils/resizeHandler'
  export default {
    components: { Tab,TabItem,XInput,Group,XButton,Cell,PopupRadio,Tinymce,Swiper,SwiperItem },
    mixins: [resizeHandler],
    data(){
      return{
        obj:{
          title: '',
          type: '',
          time: '',
          address: '',
          contnet: '',
          fileList: [],
          callUsers: []
        },
        typeList: [
          {key:'广州相亲',value:'广州相亲'},{key:'佛山相亲',value:'佛山相亲'},{key:'中山相亲',value:'中山相亲'},
          {key:'惠州相亲',value:'惠州相亲'},{key:'汕头相亲',value:'汕头相亲'},{key:'东莞相亲',value:'东莞相亲'},
          {key:'线上活动',value:'线上活动'},{key:'线下活动',value:'线下活动'},{key:'普通帖子',value:'普通帖子'},
        ],
        maxFileLength: 9,//最多上传的图片数量
        imgSrcs: [],
        emoticons,
        emoticonsIndex: 0,//当前表情列表的下标
        toggleIndex: -1,//当前插入功能的下标
        callUser: '',//@的朋友
        linkName: '',//链接文字
        linkHref: '',//链接网站
        resizePosY: 'goBottom',//屏幕尺寸修改过后需要滚动到的地方
      }
    },
    methods:{
      removeSrc(index){
        this.imgSrcs.splice(index,1);
        this.obj.fileList.splice(index,1);
      },
      fileChange(e){
        let tempLength = e.target.files.length + this.obj.fileList.length;
        if(tempLength > this.maxFileLength){
          this.$vux.toast.show({text: this.$t('uploadImgPrefix') + this.maxFileLength + this.$t('uploadImgSuffix') });
        }else{
          Array.prototype.forEach.call(e.target.files,async (file)=>{
            let srcBase64 = await imgToBase64(file);
            this.imgSrcs.push(srcBase64);
            this.obj.fileList.push(file);
          })
        }
      },
      goTop(){//移动到顶部
        document.querySelector(".router-wrap").scrollTop = 0
      },
      goBottom(){//移动到底部
        let wrap = document.querySelector(".router-wrap");
        wrap.scrollTop = wrap.scrollHeight;
      },
      _keyboardShow(){//显示键盘
        // let func = this[this.resizePosY];
        // typeof func == 'function' && setTimeout(func,100);
      },
      _keyboardHide(){//收起键盘
        // let func = this[this.resizePosY];
        // typeof func == 'function' && setTimeout(func,100);
      },
      setToggleIndex(index){
        this.toggleIndex = index;
        setTimeout(this.goBottom,350);
        document.querySelector('body').click();
      },
      inputFocus(type){//input获得焦点计算尺寸改变后要滚动的值
        this.resizePosY = type;
      },
      insertEmoticon(src){//插入表情
        this.$refs.tinymce.insertContent(`<img src="${src}" style="width:20px;height:20px;margin-right:3px;display:inline-block;vertical-align:text-bottom;" />`);
        this.goTop();
      },
      insertCallUser(){//@朋友
        if(this.callUser.indexOf('@') != -1){
          this.$vux.toast.show({text: this.$t('usernameError')});
        }else if(!this.callUser){
          this.$vux.toast.show({text: this.$t('usernameNull')});
        }else{
          this.$refs.tinymce.insertContent(`<span></span><a href="javascript:;" target="_blank" style="text-decoration: none;">@${this.callUser}</a><span></span>`);
          this.obj.callUsers.push(this.callUser);
          this.callUser = "";
          this.goTop();
        }
      },
      insertLink(){//插入链接
        if(!this.linkName || !this.linkHref){
          this.$vux.toast.show({text: this.$t('linkNull')});
        }else{
          this.$refs.tinymce.insertContent(`<span></span><a href="${this.linkHref}" target="_blank" style="text-decoration: underline;"><em>${this.linkName}</em></a><span></span>`);
          this.linkHref = '';
          this.linkName = '';
          this.goTop();
        }
      },
      submitData(){
        if(!this.obj.title){
          this.$vux.toast.show({text: '标题不能为空'});
        }else if(!this.obj.type){
          this.$vux.toast.show({text: '类型不能为空'});
        }else if(!this.obj.contnet){
          this.$vux.toast.show({text: '内容不能为空'});
        }else if(this.obj.type.includes('活动') && !this.obj.time){
          this.$vux.toast.show({text: '活动时间不能为空'});
        }else if(this.obj.type.includes('活动') && !this.obj.address){
          this.$vux.toast.show({text: '活动地点不能为空'});
        }else{
          this.$vux.toast.show({text: '没有接口，你可以按F12，在调试工具的控制台中查看数据'});
          console.log(JSON.parse(JSON.stringify(this.obj)));
          this.obj.fileList.forEach((file)=>{console.log(file)});
        }
      }
    }
  };
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade-enter{opacity: 0;}
  .fade-enter-to{opacity: 1;}
  .fade-leave,.fade-leave-to{
    display: none;
  }

  .publish {
    background-color: $gray-bg;
    height: 100%;
    .tab-row {
      background-color: #fff;
      .inner {
        width: 3rem;
      }
    }
    .weui-label,.vux-label{
      color: #777777;
    }
    .weui-cell::before{
      left: 0;
    }
    //富文本
    .mce-tinymce,.mce-edit,.mce-edit-area,.mce-tinymce *{
      border: 0;
      box-shadow: none!important;
    }
    .mce-statusbar{
      display: none;
    }
    .text-wrap{
      background-color: #fff;
      height: 180px;
      border-top: 1px solid #D9D9D9;
    }
    .imgs-row{
      padding: 0.5rem 10px;
      min-height: 3rem;
      line-height: 3rem;
      overflow: hidden;
      &>div{
        float: left;
        width: 3rem;
        height: 3rem;
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .add-img{
        box-sizing: border-box;
        border: #777777;
        background-color: #F8F8F8;
        border-radius: 4px;
        text-align: center;
        position: relative;
        i{
          font-size: 1rem;
          color: #777777;
          opacity: 0.6;
        }
        input{
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
        }
      }
      .img-item{
        background-position: center 0;
        background-size: cover;
        position: relative;
        i{
          position: absolute;
          color: rgb(211,0,0);
          background-color: #fff;
          width: 15px;
          height: 15px;
          line-height: 15px;
          border-radius: 50%;
          left: -5px;
          top: -5px;
        }
      }
    }
    .toolbar-row{
      background-color: #F8F8F8;
      padding: 0.3rem 0;
      height: 2.3rem;
      overflow: hidden;
      border-bottom: 1px solid $gray-bg;
      .toolbar-item{
        color: rgba(119, 119, 119, 0.5);
        float: left;
        height: 2.3rem;
        text-align: center;
        padding: 0 10px;
        &.on{
          color: #ffb300;
        }
        i{
          font-size: 1rem;
        }
        p{
          font-size: 0.5rem;
        }
      }
    }
    .toggle-row{
      position: relative;
      .toggle-item{
        background-color: #fff;
      }
      .emoticons-swiper-wrap{
        height: 180px;
        overflow: hidden;
        .emoticons-wrap{
          padding: 10px;
          background-color: #fff;
          overflow: hidden;
          .item{
            float: left;
            width: 2.2rem;
            height: 2.2rem;
            padding: 5px;
            box-sizing: border-box;
          }
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .select-emoticons{
        background-color: #f8f8f8;
        height: 1.8rem;
        overflow: hidden;
        .item{
          float: left;
          width: 1.2rem;
          height: 1.2rem;
          padding: 0.3rem 0.5rem;
          &.on{
            background-color: #fff;
          }
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }

      .p-input{
        display: inline-block;
        width: 100%;
        border: 0;
        background-color: transparent;
        font-size: 0.7rem;
      }
      .p-input-wrap{
        padding: 0.5rem 130px 0.5rem 0;
        margin-left: 10px;
        position: relative;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #f3f3f3;
        &.no-border{
          border-bottom: 0;
        }
        button{
          position: absolute;
          right: 10px;
          top: 0.5rem;
        }
      }
      .b-tip{
        color: rgb(255, 179, 0);
        padding: 10px;
      }
    }
    .but-row{
      background-color: $gray-bg;
      padding: 0.5rem 10px;
    }
  }
</style>


