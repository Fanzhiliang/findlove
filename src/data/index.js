import i18n  from '../lang'

export const emoticons = [
  {
    icon: '/static/img/emoticons/monkey/35.gif',
    list: [
      [
        '/static/img/emoticons/monkey/35.gif','/static/img/emoticons/monkey/17.gif','/static/img/emoticons/monkey/25.gif','/static/img/emoticons/monkey/40.gif','/static/img/emoticons/monkey/02.gif','/static/img/emoticons/monkey/32.gif','/static/img/emoticons/monkey/30.gif','/static/img/emoticons/monkey/29.gif','/static/img/emoticons/monkey/13.gif','/static/img/emoticons/monkey/34.gif','/static/img/emoticons/monkey/18.gif','/static/img/emoticons/monkey/03.gif','/static/img/emoticons/monkey/26.gif','/static/img/emoticons/monkey/11.gif','/static/img/emoticons/monkey/12.gif','/static/img/emoticons/monkey/20.gif','/static/img/emoticons/monkey/16.gif','/static/img/emoticons/monkey/21.gif','/static/img/emoticons/monkey/38.gif','/static/img/emoticons/monkey/07.gif','/static/img/emoticons/monkey/36.gif','/static/img/emoticons/monkey/23.gif','/static/img/emoticons/monkey/37.gif','/static/img/emoticons/monkey/01.gif'
      ],[
        '/static/img/emoticons/monkey/15.gif','/static/img/emoticons/monkey/08.gif','/static/img/emoticons/monkey/22.gif','/static/img/emoticons/monkey/27.gif','/static/img/emoticons/monkey/33.gif','/static/img/emoticons/monkey/24.gif','/static/img/emoticons/monkey/05.gif','/static/img/emoticons/monkey/14.gif','/static/img/emoticons/monkey/10.gif','/static/img/emoticons/monkey/04.gif','/static/img/emoticons/monkey/06.gif','/static/img/emoticons/monkey/28.gif','/static/img/emoticons/monkey/39.gif','/static/img/emoticons/monkey/09.gif','/static/img/emoticons/monkey/31.gif','/static/img/emoticons/monkey/19.gif'
      ]
    ]
  },{
    icon: '/static/img/emoticons/face/fFace_01.png',
    list: [
      [
        '/static/img/emoticons/face/fFace_01.png','/static/img/emoticons/face/fFace_02.png','/static/img/emoticons/face/fFace_03.png','/static/img/emoticons/face/fFace_04.png','/static/img/emoticons/face/fFace_05.png','/static/img/emoticons/face/fFace_06.png','/static/img/emoticons/face/fFace_07.png','/static/img/emoticons/face/fFace_08.png','/static/img/emoticons/face/fFace_09.png','/static/img/emoticons/face/fFace_10.png','/static/img/emoticons/face/fFace_11.png','/static/img/emoticons/face/fFace_12.png','/static/img/emoticons/face/fFace_13.png','/static/img/emoticons/face/fFace_14.png','/static/img/emoticons/face/fFace_15.png','/static/img/emoticons/face/fFace_16.png','/static/img/emoticons/face/fFace_17.png','/static/img/emoticons/face/fFace_18.png','/static/img/emoticons/face/fFace_19.png','/static/img/emoticons/face/fFace_20.png','/static/img/emoticons/face/fFace_21.png','/static/img/emoticons/face/fFace_22.png','/static/img/emoticons/face/fFace_23.png','/static/img/emoticons/face/fFace_24.png'
      ],[
        '/static/img/emoticons/face/fFace_25.png','/static/img/emoticons/face/fFace_26.png','/static/img/emoticons/face/fFace_27.png','/static/img/emoticons/face/fFace_28.png','/static/img/emoticons/face/fFace_29.png','/static/img/emoticons/face/fFace_30.png','/static/img/emoticons/face/fFace_31.png','/static/img/emoticons/face/fFace_32.png','/static/img/emoticons/face/fFace_33.png','/static/img/emoticons/face/fFace_34.png','/static/img/emoticons/face/fFace_35.png','/static/img/emoticons/face/fFace_36.png'
      ]
    ]
  }
]

export const levelList = [
  {color:'#F3F3F3',limit:20},{color:'#3EBBFD',limit:40},{color:'#FFB300',limit:80},{color:'#DA99DB',limit:160},
  {color:'#9DCA08',limit:320},{color:'#91B9EB',limit:640},{color:'#F37D7D',limit:1280},{color:'#DD0000',limit:2560},
  {color:'#c8a06a',limit:20}
]

export const vipList = [
  {key:i18n.t('monthlyMember'),value:i18n.t('monthlyMember'),money:49},
  {key:i18n.t('quarterlyMember'),value:i18n.t('quarterlyMember'),money:99},
  {key:i18n.t('halfYearMember'),value:i18n.t('halfYearMember'),money:149},
  {key:i18n.t('annualMember'),value:i18n.t('annualMember'),money:199},
  {key:i18n.t('permanentMember'),value:i18n.t('permanentMember'),money:299}
]

export const playList = [
  {key:i18n.t('alipay'),value:i18n.t('alipayValue'),icon:'zhifubao',pic:'/static/img/zhifubao_code.jpg'},
  {key:i18n.t('wechat'),value:i18n.t('wechatValue'),icon:'wechat',pic:'/static/img/weixin_code.jpg'},
  {key:i18n.t('integral'),value:i18n.t('integralValue'),icon:'jifen',pic:'/static/img/jifen_pic.jpg'}
]







