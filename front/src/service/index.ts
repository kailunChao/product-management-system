import { BASE_URL, TIME_OUT, REQUEST_PREFIX } from '@/config'
import Request from './request'

const request = new Request({
  baseURL: BASE_URL + '/' + REQUEST_PREFIX,
  timeout: TIME_OUT
})

export default request
