import request from '@/utils/request'

//获得相亲列表
export const getBlindDateList = data => request({
  url: '/post/getBlindDateList',
  method: 'post',
  data
})
//获得活动列表
export const getActivityList = data => request({
  url: '/post/getActivityList',
  method: 'post',
  data
})
//获得帖子列表
export const getPostList = data => request({
  url: '/post/getPostList',
  method: 'post',
  data
})


