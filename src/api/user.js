import request from '@/utils/request'

export const register = data => request({
  url: '/user/register',
  method: 'post',
  data
})

export const login = data => request({
  url: '/user/login',
  method: 'post',
  data
})

export const getUserByToken = data => request({
  url: '/user/getUserByToken',
  method: 'post',
  data
})


