import { defineStore } from 'pinia'
import { CreateUserRequest } from '../../User.request'
import { reactive, watch } from 'vue'
import useRef from '@/hooks/useRef'

interface userModalType extends CreateUserRequest {
  id?: string
}

export const useUserModalStore = defineStore('system-user-modal', () => {
  // 弹窗中的表单
  const initialFormState: userModalType = {
    name: '',
    realname: '',
    password: '',
    phoneNumber: '',
    role: '暂不选择',
    enable: true
  }

  const formState = reactive<userModalType>({ ...initialFormState })
  const formStateCopy = reactive<userModalType>({ ...initialFormState })

  const resetFormState = () => {
    Object.assign(formState, initialFormState)
  }
  const resetFormStateCopy = () => {
    Object.assign(formStateCopy, initialFormState)
  }

  const setFormState = (newState: userModalType) => {
    Object.assign(formState, {
      ...newState,
      role: newState.role === null ? '暂不选择' : newState.role
    })
  }

  const setFormStateCopy = (newState: userModalType) => {
    Object.assign(formStateCopy, {
      ...newState,
      role: newState.role === null ? '暂不选择' : newState.role
    })
  }

  const [formMode, setFormMode] = useRef<'create' | 'update'>('create')

  const [currentUserId, setCurrentUserId] = useRef<string>('')

  const [userModalTitle, setUserModalTitle] = useRef<string>('')

  watch(
    formMode,
    newValue => {
      newValue === 'create'
        ? setUserModalTitle('新增用户')
        : setUserModalTitle('编辑用户')
    },
    { immediate: true }
  )

  return {
    formState,
    resetFormState,
    setFormState,
    formMode,
    setFormMode,
    currentUserId,
    setCurrentUserId,
    formStateCopy,
    resetFormStateCopy,
    setFormStateCopy,
    userModalTitle,
    setUserModalTitle
  }
})
