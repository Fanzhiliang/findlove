<template>
  <div class="errorPage">
    <msg :title="description" description="你还可以进行以下操作" :buttons="buttons" icon="warn"></msg>
  </div>
</template>

<script>
  import {Msg,XButton,Divider} from 'vux'
  export default {
    components:{Msg,XButton,Divider},
    data(){
      return{
        errorType: ''
      }
    },
    computed:{
      description(){
        if(this.errorType=='404'){
          return '找不到你需要的页面'
        }else if(this.errorType=='400'){
          return '数据错误或参数不完整';
        }
      },
      buttons(){
        return [
          {
            type: 'primary',
            text: '返回上一页',
            onClick: this.goBackHandler
          },
          {
            type: 'default',
            text: '返回首页',
            onClick:this.goIndexHandler
          }
        ]
      }
    },
    methods:{
      goBackHandler(){
        this.$router.back(-1);
      },
      goIndexHandler(){
        this.$router.push('/');
      }
    },
    created(){
      this.errorType = this.$route.params.type;
    }
  }
</script>

<style>

</style>

