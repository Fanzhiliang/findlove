<template>
  <div class="edit-user">
    <group label-width="5em" label-align="left">
      <x-input title="真实姓名" v-model="obj.name"></x-input>

      <popup-radio title="性别" :options="sexList" value-align="left" v-model="obj.sex"></popup-radio>

      <datetime title="生日" :min-year="1970" v-model="obj.birthday" value-text-align="left"></datetime>

      <x-address title="出生地" :list="ChinaAddressData" value-text-align="left" v-model="obj.birth_address"></x-address>

      <x-address title="居住地" :list="ChinaAddressData" value-text-align="left" v-model="obj.live_address"></x-address>
    </group>

    <group label-width="5em" label-align="left">
      <x-input title="情感状态" v-model="obj.status"></x-input>

      <x-input title="交友目的" v-model="obj.objective"></x-input>

      <popup-picker title="血型" :data="bloodTypeList" value-text-align="left" v-model="obj.bloodType"></popup-picker>
    </group>

    <div class="button-row">
      <XButton type="primary" @tap.native="submitData">保存</XButton>
    </div>
  </div>
</template>

<script>
  import {Group,Cell,XInput,PopupRadio,XAddress,ChinaAddressData,Datetime,PopupPicker,XButton} from 'vux'
  export default {
    components:{Group,Cell,XInput,PopupRadio,XAddress,Datetime,PopupPicker,XButton},
    data(){
      return{
        sexList: [
          {key:0,value:'保密'},{key:1,value:'男'},{key:2,value:'女'},
        ],
        bloodTypeList: [['A','B','AB','O']],
        ChinaAddressData,
        obj:{
          name: '',
          sex: '保密',
          birthday: '',
          birth_address: [],
          live_address: [],
          status: '',
          objective: '',
          bloodType: ['A']
        }
      }
    },
    methods:{
      submitData(){
        console.log(JSON.parse(JSON.stringify(this.obj)))
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/views/userCenter.scss';
</style>