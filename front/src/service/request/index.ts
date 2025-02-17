import router from '@/router'
import { message } from 'ant-design-vue'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config => {
        message.loading({ content: '加载中...', duration: 0, key: 'axios' })
        const token = localStorage.getItem('token')
        if (config.headers && token) {
          // 类型缩小
          config.headers.Authorization = 'Bearer ' + token
        }
        return config
      },
      err => {
        message.destroy('axios')
        message.error('网络请求失败', 2)
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      res => {
        message.destroy('axios')
        if (res.data.message) message.success(res.data.message, 3)
        return res.data
      },
      err => {
        message.destroy('axios')
        let errorMessage = ''
        // 没收到服务器响应
        if (!err.response) {
          message.error('服务器睡着了', 2)
          return Promise.reject(err)
        }

        const messageValue = err.response.data.message
        //token不正确
        if (messageValue === 'token验证错误') {
          message.error(messageValue, 2)
          router.push('/login')
          return Promise.reject(err)
        }
        if (typeof messageValue === 'string') {
          errorMessage = messageValue
        } else if (typeof messageValue === 'object') {
          errorMessage = Object.values(messageValue).join('\n')
        } else {
          errorMessage = '未知错误'
        }

        message.error(errorMessage, 2)
        return Promise.reject(err)
      }
    )
  }
  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
