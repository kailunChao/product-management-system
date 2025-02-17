import request from '@/service'

export const getUserInfoRequest = () =>
  request.get({
    url: '/user/current'
  })

export const uploadAvatarRequest = (formData: FormData) =>
  request.post({
    url: '/upload/avatar',
    data: formData
  })
