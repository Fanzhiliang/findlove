<template>
  <div class="chat">
    <div class="list">
      <div class="more">更多消息</div>

      <div class="chat-item">
        <div class="time">2019-05-16 09:15:32</div>
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
        <div class="content">
          <p>你好123<br></p>
          <p>哈哈<img style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;" src="http://findloveimg.alcyh.com/emoticons/face/fFace_02.png" data-mce-src="../..http://findloveimg.alcyh.com/emoticons/face/fFace_02.png" data-mce-style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"><br data-mce-bogus="1"></p>
        </div>
      </div>

      <div class="chat-item my">
        <div class="time">2019-05-17 22:05:06</div>
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
        <div class="content">
          <img v-lazy="'http://ws.alcyh.com/resources/2_1552392520_0.jpg'" alt="">
        </div>
      </div>

      <div class="chat-item my">
        <div class="time">2019-05-17 22:05:06</div>
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
        <div class="content">
          <p>给你发个图</p>
        </div>
      </div>

      <div class="chat-item">
        <div class="time">2019-05-17 22:05:06</div>
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
        <div class="content">
          <a href="http://ws.alcyh.com/resources/6_1557883413_0.zip" target="_blank">http://ws.alcyh.com/resources/6_1557883413_0.zip</a>
        </div>
      </div>

      <div class="chat-item">
        <div class="time">2019-05-17 22:05:06</div>
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
        <div class="content">
          <p>这是一个下载链接</p>
        </div>
      </div>

      <div class="chat-item">
        <div class="time">2019-05-17 22:05:06</div>
        <div class="head">
          <img src="http://findloveimg.alcyh.com/default-head.gif" alt="">
        </div>
        <div class="content">
          <p>你下来看看呗</p>
        </div>
      </div>


    </div>

    <!-- 底部 -->
    <div class="comment-ctrl">
      <div class="goEdit" @tap="isShowReply=true">
        <i class="iconfont icon-edit1"></i>发送消息...
      </div>
      <div class="icon-item">
        <i class="iconfont icon-image"></i>
        <input type="file" @change="fileChange">
      </div>
      <div class="button" @tap="deleteFriend">删除好友</div>
    </div>

    <!-- 回复框 -->
    <div :class="['reply',{on:isShowReply}]">
      <div class="reply-header">发送消息<i class="iconfont icon-close" @tap="isShowReply=false"></i>
      </div>
      <div class="reply-content">
        <div class="text-wrap">
          <Tinymce ref="tinymce" v-model="obj.contnet" :toolbar="[]" :menubar="''" :height="180" placeholder="发送的内容..."/>
        </div>
      </div>
      <div class="toolbar-row">
        <div :class="['toolbar-item',{on:toggleIndex==0}]" @tap="setToggleIndex(0)">
          <p><i class="iconfont icon-smile"></i></p>
          <p>表情</p>
        </div>
      </div>
      <div class="toggle-row" v-show="toggleIndex!=-1">
        <transition-group name="fade">
        <!-- 选择表情 -->
        <div class="toggle-item" v-show="toggleIndex==0" :key="0">
          <div class="select-emoticons">
            <div :class="['item',{on:index==emoticonsIndex}]" v-for="(item,index) in emoticons" :key="index" @tap="emoticonsIndex=index">
              <img :src="item.icon" alt="">
            </div>
          </div>
          <div class="emoticons-swiper-wrap">
            <transition-group name="fade">
              <Swiper dots-position="center" v-for="(eObj,eObjIndex) in emoticons" :key="eObj.icon" v-show="eObjIndex==emoticonsIndex">
                <SwiperItem v-for="(list,index) in eObj.list" :key="index">
                  <div class="emoticons-wrap">
                    <div class="item" v-for="(src,i) in list" :key="i">
                      <img :src="src" @tap="insertEmoticon(src)" alt="">
                    </div>
                  </div>
                </SwiperItem>
              </Swiper>
            </transition-group>
          </div>
        </div>
        </transition-group>
      </div>
      <div class="but-row">
        <XButton type="primary" @tap.native="submitData">发送</XButton>
      </div>
    </div>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {emoticons} from '@/data'
  import {XButton,Swiper,SwiperItem} from "vux"
  import iScroll from '@/utils/IScroll/index.js'
  export default {
    components:{Tinymce,XButton,Swiper,SwiperItem},
    mixins: [iScroll],
    data(){
      return{
        emoticons,
        obj: {
          contnet: ''
        },
        toggleIndex: -1,
        emoticonsIndex: 0,
        isShowReply: false,
      }
    },
    watch:{
      isShowReply(newValue){
        if(!newValue){
          this.$set(this.obj,'contnet','');
        }
      }
    },
    methods:{
      setToggleIndex(index){
        this.toggleIndex = index;
      },
      goTop(){//移动到顶部
        document.querySelector(".router-wrap").scrollTop = 0
      },
      fileChange(e){//上传文件
        this.$vux.toast.show({text:'没有上传的接口'});
      },
      insertEmoticon(src){//插入表情
        this.$refs.tinymce.insertContent(`<img src="${src}" style="width:20px;height:20px;margin-right:3px;display:inline-block;vertical-align:text-bottom;" />`);
        this.goTop();
      },
      submitData(){
        if(!this.obj.contnet){
          this.$vux.toast.show({text: '内容不能为空'});
        }else{
          this.$vux.toast.show({text: '没有接口，你可以按F12，在调试工具的控制台中查看数据'});
          console.log(JSON.parse(JSON.stringify(this.obj)));
        }
      },
      deleteFriend(){//删除好友
        this.$vux.confirm.show({
          title: '确定要删除好友吗？',
          onConfirm :()=>{
            this.$vux.toast.show({text:'删除失败，对方不想失去你...'});
          }
        })

      }
    }
  }
</script>

<style lang="scss">
  .chat{
    min-height: 100%;
    box-sizing: border-box;
    background-color: #ECF1F7;
    padding-bottom: 2.3rem;
    .list{
      .more{
        text-decoration: none;
        color: #60729B;
        cursor: pointer;
        text-align: center;
        line-height: 1.5rem;
        font-weight: normal;
      }
      .chat-item{
        width: 100%;
        margin-bottom: 0.8rem;
        overflow: hidden;
        .time{
          text-align: center;
          padding: 0.5rem 0;
          clear: both;
          color: #999999;
        }
        .head{
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          overflow: hidden;
          float: left;
          margin-right: 0.8rem;
          margin-left: 0.4rem;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .content{
          background-color: #D4D8DD;
          padding: 8px;
          border-radius: 5px;
          float: left;
          font-size: 0.8rem;
          position: relative;
          word-break: break-all;
          max-width: 13rem;
          *{
            font-size: 0.75rem;
            color: #000;
            line-height: 1rem;
            word-break: break-all;
          }
          & > img{
            width: 8rem;
            height: auto;
            display: block;
            border-radius: 5px;
          }
          & > a{
            color: #60729B;
          }
          &::before{
            content: '';
            position: absolute;
            border: 10px solid transparent;
            border-right-color: #D4D8DD;
            top: 3px;
            left: -18px;
          }
          &::after{
            content: '';
            position: absolute;
            border: 10px solid transparent;
            border-left-color: $theme-color;
            top: 3px;
            right: -18px;
            display: none;
          }
        }
      }
      .chat-item.my{
        .head{
          float: right;
          margin-left: 0.8rem;
          margin-right: 0.4rem;
        }
        .content{
          float: right;
          background-color: $theme-color;
          *{
            color: #fff;
          }
          & > a{
             color: #fff;
          }
          &::before{
            display: none;
          }
          &::after{
            display: block;
          }
        }
      }
    }
    .comment-ctrl{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2.3rem;
      background-color: #f8f8f8;
      z-index: 887;
      overflow: hidden;
      .goEdit{
        background-color: #fff;
        border: 1px solid #EDEDED;
        width: 9.5rem;
        height: 1.4rem;
        padding: 0 0.8rem;
        border-radius: 1rem;
        line-height: 1.4rem;
        color: #777777;
        margin: 0.4rem 0.5rem;
        margin-right: 0;
        display: inline-block;
        cursor: pointer;
        i{
          font-size: 0.65rem;
          margin-right: 0.2rem;
        }
      }
      .icon-item{
        display: inline-block;
        width: 2.3rem;
        height: 100%;
        vertical-align: top;
        line-height: 2.3rem;
        text-align: center;
        position: relative;
        cursor: pointer;
        i{
          font-size: 1.2rem;
          color: #777777;
        }
        span{
          position: absolute;
          background-color: rgb(221,0,0);
          color: #fff;
          font-size: 0.4rem;
          padding: 0 0.1rem;
          border-radius: 5px;
          line-height: 0.6rem;
          top: 0.3rem;
          right: 0.1rem;
        }
        input[type='file']{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
      }
      .button{
        display: inline-block;
        background-color: #E13523;
        color: #fff;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        width: 4rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        vertical-align: top;
        cursor: pointer;
      }
    }
    .reply{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 120%;
      display: none;
      left: 0;
      background-color: #f8f8f8;
      z-index: 1000;
      &.on{
        display: initial;
        animation: lift .3s forwards;
      }
      //富文本
      .mce-tinymce,.mce-edit,.mce-edit-area,.mce-tinymce *{
        border: 0;
        box-shadow: none!important;
      }
      .mce-statusbar{
        display: none;
      }
      .reply-header{
        height: 2.3rem;
        background-color: #f8f8f8;
        border-top: 1px solid #f3f3f3;
        border-bottom: 1px solid #f3f3f3;
        position: relative;
        text-align: center;
        line-height: 2.3rem;
        font-size: 0.9rem;
        i{
          font-size: 2rem;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          color: #777777;
        }
      }
      .text-wrap{
        background-color: #fff;
        height: 180px;
        border-bottom: 1px solid #f3f3f3;
      }
      .toolbar-row{
        background-color: #F8F8F8;
        padding: 0.3rem 0;
        height: 2rem;
        overflow: hidden;
        border-bottom: 1px solid $gray-bg;
        .toolbar-item{
          color: rgba(119, 119, 119, 0.5);
          float: left;
          height: 2rem;
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
            padding-bottom: 0.3rem;
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
          padding: 0;
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
      .but-row{
        background-color: #f8f8f8;
        padding: 0.5rem 10px;
      }
    }
  }

  @keyframes lift{
    from {top:100%;}
    to {top:0;}
  }
</style>

