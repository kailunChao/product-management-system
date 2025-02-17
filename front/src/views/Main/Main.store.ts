import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoRequest, uploadAvatarRequest } from './Main.request'
import { RoleState } from './system/Role/Role.store'
import { Menu } from './system/Menu/Menu.store'

export interface UserInfo {
  id: string
  name: string
  realname: string
  password: string
  phoneNumber: string
  avatar: string | null
  role: RoleState | string | null
  menus: [] | Menu[]
  enable: boolean
  createdAt: string
  updatedAt: string
}

export const useMainStore = defineStore('main', () => {
  const initialFormState = {
    id: '',
    name: '',
    realname: '',
    password: '',
    phoneNumber: '',
    avatar: '',
    role: '',
    menus: [],
    enable: false,
    createdAt: '',
    updatedAt: ''
  }

  const userInfo = ref<UserInfo>({ ...initialFormState })

  const resetUserInfo = () => {
    Object.assign(userInfo, initialFormState)
  }

  const getUserInfoAction = () => {
    return getUserInfoRequest()
      .then(res => {
        userInfo.value = res.data
        console.log(res)
        return userInfo.value
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  const changeUserAvatarAction = (formData: FormData) => {
    return uploadAvatarRequest(formData)
      .then(res => {
        userInfo.value.avatar = res.data.path
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  return { userInfo, getUserInfoAction, changeUserAvatarAction, resetUserInfo }
})
