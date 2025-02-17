import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import useRef from '@/hooks/useRef'

interface FormState {
  name: string
  introduce: string
}

export const useRoleModalStore = defineStore('system-role-modal', () => {
  // 弹窗中的表单
  const initialFormState = {
    name: '',
    introduce: ''
  }

  const formState = reactive<FormState>({ ...initialFormState })
  const formStateCopy = reactive<FormState>({ ...initialFormState })

  const resetFormState = () => {
    Object.assign(formState, initialFormState)
  }

  const resetFormStateCopy = () => {
    Object.assign(formStateCopy, initialFormState)
  }

  const setFormState = (newState: FormState) => {
    Object.assign(formState, newState)
  }

  const setFormStateCopy = (newState: FormState) => {
    Object.assign(formStateCopy, newState)
  }

  const [menuModalTitle, setMenuModalTitle] = useRef<string>('')

  const [currentRoleId, setCurrentRoleId] = useRef<string>('')

  const [formMode, setFormMode] = useRef<'create' | 'update'>('create')

  const [checkedKeys, setCheckedKeys] = useRef<string[]>([])

  watch(
    formMode,
    newValue => {
      setMenuModalTitle(newValue === 'create' ? '新增角色' : '编辑角色')
    },
    { immediate: true }
  )

  return {
    formState,
    setFormState,
    formStateCopy,
    setFormStateCopy,
    resetFormState,
    resetFormStateCopy,
    menuModalTitle,
    setMenuModalTitle,
    formMode,
    setFormMode,
    currentRoleId,
    setCurrentRoleId,
    checkedKeys,
    setCheckedKeys
  }
})
