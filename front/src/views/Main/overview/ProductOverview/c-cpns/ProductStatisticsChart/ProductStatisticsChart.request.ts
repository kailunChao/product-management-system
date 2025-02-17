import request from '@/service'

export const getStatisticsRequest = () =>
  request.get({
    url: '/category/chart/statistics'
  })