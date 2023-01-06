import request from './request'

export const login = (data) => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data
})

export const getCode = (mobile) => request({
  method: 'get',
  url: `/v1_0/sms/codes/${mobile}`
})
export const getUserInfo = () => request({
  method: 'get',
  url: '/v1_0/user'

})
