import request from '@/service'

export const accountLoginRequest = (data: { name: string; password: string }) =>
  request.post({
    url: '/auth/accountLogin',
    data
  })

export const phoneNumberLoginRequest = (data: { phoneNumber: string }) =>
  request.post({
    url: '/auth/phoneNumberLogin',
    data
  })

export const forgotPasswordRequest = (data: {
  phoneNumber: string
  password: string
  password_confirm: string
}) =>
  request.post({
    url: '/auth/forgotPassword',
    data
  })

export const createCaptchaRequest = (data: { phoneNumber: string }) =>
  request.post({
    url: '/short-message/captcha',
    data
  })

export const checkCaptchaRequest = (data: {
  phoneNumber: string
  captcha: string
}) =>
  request.post({
    url: '/short-message/captcha/verify',
    data
  })
