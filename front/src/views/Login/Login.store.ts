import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { accountLoginRequest, phoneNumberLoginRequest } from './Login.request'
import useRef from '@/hooks/useRef'

interface FormState {
  account: string
  password: string
  passwordConfirm: string
  captcha: string
  phoneNumber: string
  remember: boolean
}

export const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>('')

    const [moduleState, setModuleState] = useRef<
      '用户名登录' | '手机号登录' | '找回密码'
    >('用户名登录')

    const formState = reactive<FormState>({
      account: '',
      password: '',
      passwordConfirm: '',
      captcha: '',
      phoneNumber: '',
      remember: false
    })

    const resetPassword = () => {
      formState.password = ''
      formState.passwordConfirm = ''
    }

    const resetCaptcha = () => {
      formState.captcha = ''
    }

    const accountLoginAction = async (data: {
      name: string
      password: string
    }) => {
      return accountLoginRequest(data)
        .then(res => {
          console.log(res)
          token.value = res.data.token
          return res.data.token
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    const phoneNumberLoginAction = async (data: { phoneNumber: string }) => {
      return phoneNumberLoginRequest(data)
        .then(res => {
          console.log(res)
          token.value = res.data.token
          return res.data.token
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    return {
      token,
      formState,
      accountLoginAction,
      phoneNumberLoginAction,
      moduleState,
      setModuleState,
      resetPassword,
      resetCaptcha
    }
  },
  {
    persist: {
      key: 'pinia-login-store',
      storage: localStorage,
      omit: ['formState.captcha', 'token', 'moduleState'],
      serializer: {
        serialize: state => {
          const stateCopy = { ...state }
          if (!state.formState.remember) {
            delete stateCopy.formState.password
          }
          console.log(stateCopy)
          return JSON.stringify(stateCopy)
        },
        deserialize: str => {
          const state = JSON.parse(str)
          return state
        }
      }
    }
  }
)
