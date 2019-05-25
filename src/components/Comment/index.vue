<template>
  <div class="comment">
    <div class="comment-header">
      <h3>全部评论 <span>50</span></h3>
      <i class="iconfont icon-sortaltup">倒序浏览</i>
      <i class="iconfont icon-eye">只看楼主</i> 
    </div>
    <div class="comment-list">

      <div class="comment-item">
        <div class="left-col">
          <img src="/static/img/default-head.gif" alt="">
        </div>
        <div class="right-col">
          <div class="comment-userInfo">
            一只小小小小鸟
            <span :style="{'background-color': levelList[9-1].color}">Lv9 永久会员</span>
            <span>楼主</span>
          </div>
          <div class="comment-content">
            <p>大家好，可以多多留言，如果遇到骗子一定要向管理员举报！<br></p>
            <p><img style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;" src="/static/img/emoticons/monkey/12.gif" data-mce-src="static/img/emoticons/monkey/12.gif" data-mce-style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"><img style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;" src="/static/img/emoticons/monkey/11.gif" data-mce-src="static/img/emoticons/monkey/11.gif" data-mce-style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"><img style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;" src="/static/img/emoticons/monkey/35.gif" data-mce-src="static/img/emoticons/monkey/35.gif" data-mce-style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"></p>
          </div>
          <div class="bottom-row">
            <span class="time">2019-05-16 10:04</span>
            <i class="iconfont icon-warn" @click="report"></i>
            <i class="iconfont icon-chatbubbleoutline"></i>
            <i class="iconfont icon-heart1">20</i>
          </div>
        </div>
      </div>

      <div class="comment-item">
        <div class="left-col">
          <img src="/static/img/default-head.gif" alt="">
        </div>
        <div class="right-col">
          <div class="comment-userInfo">
            樊致良
            <span :style="{'background-color': levelList[2-1].color}">Lv2 月会员</span>
          </div>
          <div class="comment-content">
            <p>怎么每个页面下面的评论都一样的？<img style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;" src="/static/img/emoticons/face/fFace_01.png" data-mce-src="../../static/img/emoticons/face/fFace_01.png" data-mce-style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"><br><br></p>
          </div>
          <div class="bottom-row">
            <span class="time">2019-05-16 10:04</span>
            <i class="iconfont icon-warn" @click="report"></i>
            <i class="iconfont icon-chatbubbleoutline"></i>
            <i class="iconfont icon-heart1">0</i>
          </div>
        </div>
      </div>

      <div class="comment-item">
        <div class="left-col">
          <img src="/static/img/default-head.gif" alt="">
        </div>
        <div class="right-col">
          <div class="comment-userInfo">
            一只小小小小鸟
            <span :style="{'background-color': levelList[9-1].color}">Lv9 永久会员</span>
            <span>楼主</span>
          </div>
          <div class="callUser">
            <p>樊致良 发表于 2019-05-16 10:04</p>
            <div>
              <p>怎么每个页面下面的评论都一样的？<img style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;" src="/static/img/emoticons/face/fFace_01.png" data-mce-src="../../static/img/emoticons/face/fFace_01.png" data-mce-style="width: 20px; height: 20px; margin-right: 3px; display: inline-block; vertical-align: text-bottom;"><br><br></p>
            </div>
          </div>
          <div class="comment-content">
            <p>因为没有数据，现在评论组件里面的都是静态的。。。<br></p>
          </div>
          <div class="bottom-row">
            <span class="time">2019-05-16 10:04</span>
            <i class="iconfont icon-warn" @click="report"></i>
            <i class="iconfont icon-chatbubbleoutline"></i>
            <i class="iconfont icon-heart1">777</i>
          </div>
        </div>
      </div>

    </div>
    <!-- 底部 -->
    <div class="comment-ctrl">
      <div class="goEdit" @click="isShowReply=true">
        <i class="iconfont icon-edit1"></i>说说你的看法...
      </div>
      <div class="icon-item">
        <i class="iconfont icon-Star"></i><span>12</span>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-heart1"></i><span>777</span>
      </div>
      <div class="icon-item" @click="isShowShare=true">
        <i class="iconfont icon-share"></i>
      </div>
    </div>
    <!-- 回复框 -->
    <div :class="['reply',{on:isShowReply}]">
      <div class="reply-header">回复<i class="iconfont icon-close" @click="isShowReply=false"></i>
      </div>
      <div class="reply-content">
        <div class="text-wrap">
          <Tinymce ref="tinymce" v-model="obj.contnet" :toolbar="[]" :menubar="''" :height="180" placeholder="说说你的看法..."/>
        </div>
      </div>
      <div class="toolbar-row">
        <div :class="['toolbar-item',{on:toggleIndex==0}]" @click="setToggleIndex(0)">
          <p><i class="iconfont icon-smile"></i></p>
          <p>表情</p>
        </div>
        <div :class="['toolbar-item',{on:toggleIndex==1}]" @click="setToggleIndex(1)">
          <p><i class="iconfont icon-image"></i></p>
          <p>图片</p>
        </div>
      </div>
      <div class="toggle-row" v-show="toggleIndex!=-1">
        <transition-group name="fade">
        <!-- 选择表情 -->
        <div class="toggle-item" v-show="toggleIndex==0" :key="0">
          <div class="select-emoticons">
            <div :class="['item',{on:index==emoticonsIndex}]" v-for="(item,index) in emoticons" :key="index" @click="emoticonsIndex=index">
              <img :src="item.icon" alt="">
            </div>
          </div>
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
        </div>
        <!-- 选择图片 -->
        <div class="toggle-item" v-show="toggleIndex==1" :key="1">
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
        </div>
        </transition-group>
      </div>
      <div class="but-row">
        <XButton type="primary" @click.native="submitData">发表</XButton>
      </div>
    </div>
    <!-- 分享 -->
    <div :class="['share',{on:isShowShare}]" @click="isShowShare=false">
      <div class="share-main" @click.stop="">
        <div class="share-item">
          <div class="top"><img src="/static/img/qq.svg" alt=""></div>
          <p>QQ</p>
        </div>
        <div class="share-item">
          <div class="top"><img src="/static/img/wechat.svg" alt=""></div>
          <p>微信</p>
        </div>
        <div class="share-item">
          <div class="top"><img src="/static/img/weibo.svg" alt=""></div>
          <p>微博</p>
        </div>
        <div class="share-button" @click="isShowShare=false">取消</div>
      </div> 
    </div>
  </div>
</template>

<script>
  import {levelList} from '@/data'
  import Tinymce from '@/components/Tinymce'
  import {emoticons} from '@/data'
  import {XButton,Swiper,SwiperItem} from "vux"
  import {imgToBase64} from '@/utils'
  export default {
    components:{Tinymce,XButton,Swiper,SwiperItem},
    data(){
      return{
        levelList,
        emoticons,
        obj: {
          contnet: '',
          fileList: []
        },
        toggleIndex: -1,
        emoticonsIndex: 0,
        maxFileLength: 9,//最多上传的图片数量
        imgSrcs: [],
        isShowReply: false,
        isShowShare: false,
      }
    },
    methods:{
      report(){
        this.$vux.confirm.show({
          title: '确定要举报该评论吗？',
          onConfirm : () =>{
            this.$vux.toast.show({text: '举报成功'});
          }
        })
      },
      setToggleIndex(index){
        this.toggleIndex = index;
      },
      removeSrc(index){
        this.imgSrcs.splice(index,1);
        this.obj.fileList.splice(index,1);
      },
      fileChange(e){
        let tempLength = e.target.files.length + this.obj.fileList.length;
        if(tempLength > this.maxFileLength){
          this.$vux.toast.show({text: `最多上传${this.maxFileLength}张图片`});
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
          this.obj.fileList.forEach((file)=>{console.log(file)});
        }
      }
    }
  }
</script>

<style lang="scss">
  .comment{
    border-top: 0.5rem solid #f3f3f3;
    background-color: #fff;
    padding-bottom: 2rem;
    .comment-header{
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.5rem;
      overflow: hidden;
      border-bottom: 1px solid #f3f3f3;
      h3{
        float: left;
        font-size: 0.85rem;
        color: #000;
        span{
          font-size: 0.6rem;
          color: #777777;
        }
      }
      i{
        float: right;
        margin-left: 1rem;
        font-size: 0.6rem;
        color: #777777;
        &::before{
          margin-right: 0.2rem;
        }
      }
    }
    .comment-list{
      .comment-item{
        overflow: hidden;
        padding: 0.5rem 0.5rem 0.5rem 3rem;
        position: relative;
        border-bottom: 1px solid #f3f3f3;
        .left-col{
          padding: 0.5rem;
          position: absolute;
          top: 0;
          left: 0;
          width: 2rem;
          img{
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }
        }
        .right-col{
          .comment-userInfo{
            font-size: 0.75rem;
            padding-bottom: 0.5rem;
            span{
              color: #fff;
              padding: 0 0.2rem;
              background-color: rgb(221, 0, 0);
              display: inline-block;
              vertical-align: text-top;
              line-height: 0.8rem;
              font-size: 0.5rem;
            }
          }
          .callUser{
            background-color: #FFFCEE;
            border: 1px dashed #999999;
            padding: 0.4rem 0.3rem;
            p{
              padding-bottom: 0.2rem;
            }
            & *{
              color: #777777;
            }
          }
          .comment-content{
            padding-bottom: 0.5rem;
            & *{
              font-size: 0.7rem;
              line-height: 1.2rem;
            }
          }
          .bottom-row{
            color: #999999;
            .time{

            }
            i{
              float: right;
              margin-left: 0.8rem;
              font-size: 0.6rem;
              &::before{
                margin-right: 0.2rem;
                font-size: 0.7rem;
              }
            }
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
        width: 8rem;
        height: 1.4rem;
        padding: 0 0.8rem;
        border-radius: 1rem;
        line-height: 1.4rem;
        color: #777777;
        margin: 0.4rem 0.5rem;
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
    .share{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 120%;
      display: none;
      left: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 1000;
      &.on{
        display: initial;
        animation: lift .3s forwards;
      }
      .share-main{
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #f3f3f3;
        width: 100%;
        overflow: hidden;
        .share-item{
          text-align: center;
          float: left;
          width: 25%;
          padding: 0.5rem 0;
          cursor: pointer;
          .top{
            background-color: #fff;
            width: 2.5rem;
            height: 2.5rem;
            display: inline-block;
            border-radius: 50%;
            img{
              width: 1.3rem;
              height: 1.3rem;
              margin: 0.6rem;
              display: inline-block;
            }
          }
          p{
            padding: 0.3rem 0;
          }
        }
        .share-button{
          background-color: #fff;
          border: 1px solid #dedede;
          clear: both;
          height: 1.8rem;
          line-height: 1.8rem;
          text-align: center;
          color: $theme-color;
          font-size: 0.8rem;
          cursor: pointer;
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade-enter{opacity: 0;}
  .fade-enter-to{opacity: 1;}
  .fade-leave,.fade-leave-to{
    display: none;
  }

  @keyframes lift{
    from {top:100%;}
    to {top:0;}
  }
</style>


