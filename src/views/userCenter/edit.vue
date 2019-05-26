<template>
  <div class="edit-user">
    <group label-width="6em" label-align="left">
      <x-input :title="$t('realName')" v-model="obj.name"></x-input>

      <popup-radio :title="$t('gender')" :options="sexList" value-align="left" v-model="obj.sex" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></popup-radio>

      <datetime :title="$t('birthday')" :min-year="1970" v-model="obj.birthday" value-text-align="left" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></datetime>

      <x-address :title="$t('birthdayPlace')" :list="ChinaAddressData" value-text-align="left" v-model="obj.birth_address" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></x-address>

      <x-address :title="$t('livePlace')" :list="ChinaAddressData" value-text-align="left" v-model="obj.live_address" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></x-address>
    </group>

    <group label-width="5em" label-align="left">
      <x-input :title="$t('affective')" v-model="obj.status"></x-input>

      <x-input :title="$t('objective')" v-model="obj.objective"></x-input>

      <popup-picker :title="$t('bloodType')" :data="bloodTypeList" value-text-align="left" v-model="obj.bloodType" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></popup-picker>
    </group>

    <div class="button-row">
      <XButton type="primary" @click.native="submitData">{{$t('save')}}</XButton>
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