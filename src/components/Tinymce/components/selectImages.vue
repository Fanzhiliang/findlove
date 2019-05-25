<template>
  <div class="selectImages-wrap">
    <el-button class="start-select" size="mini" icon="el-icon-upload" type="primary" @click="showDialog=true">上传图片</el-button>
    <el-dialog title="选择上传的图片" :visible.sync="showDialog" :close-on-click-modal="false">
      <div v-loading="isLoading">
        <el-upload
          multiple
          :action="'http://ws.alcyh.com/api/upload.php'"
          ref="selectImages"
          list-type="picture-card"
          :on-remove="uploadSubmit"
          :on-change="uploadSubmit" 
          :http-request="pushFile"
          :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="but-bottom">
          <el-button type="danger" size="small" @click="showDialog=false">取消</el-button>
          <el-button type="primary" size="small" @click="uploadImage">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {upload} from '@/api'

export default{
  data(){
    return{
      showDialog: false,
      fileList: [],
      isLoading: false
    }
  },
  methods: {
    pushFile(params){
      this.fileList.push(params.file);
    },
    uploadSubmit(){
      this.fileList = [];
      this.$refs.selectImages.submit();
    },
    uploadImage(){
      this.isLoading = true;
      upload(this.fileList,{user_id:'admin'}).then((list)=>{
        this.isLoading = false;
        this.$emit('successUpload',list);
        this.fileList = [];
        this.showDialog = false;
      }).catch(({err_msg})=>{
        this.isLoading = false;
        this.$message({message:err_msg,type:'warning'});
      })
    },
  }
}
</script>

<style scoped>
  .selectImages-wrap{

  }
  .start-select{
    position: absolute;
    right: 3px;
    top: 3px;
  }
  .but-bottom{
    margin-top: 20px;
    text-align: right;
  }
</style>