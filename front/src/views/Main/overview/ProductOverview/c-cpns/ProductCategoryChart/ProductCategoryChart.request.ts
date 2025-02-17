import request from '@/service'

export const getCategoryWithProductNumRequest = () =>
  request.get({
    url: '/category/chart'
  })
