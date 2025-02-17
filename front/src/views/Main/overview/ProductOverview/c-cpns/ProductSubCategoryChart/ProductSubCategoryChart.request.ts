import request from '@/service'

export const getSubCategoryWithProductNumRequest = () =>
  request.get({
    url: '/category/chart/detail'
  })
