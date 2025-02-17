import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import useRef from '@/hooks/useRef'

export interface FormState {
  name: string
  price: number
  quantity: number
  subCategoryId: string[]
}

export const useProductModalStore = defineStore('system-product-modal', () => {
  // 弹窗中的表单
  const initialFormState = {
    name: '',
    price: 0,
    quantity: 0,
    subCategoryId: []
  }

  const [pics, setPics] = useRef<any[]>([])

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

  const [productModalTitle, setProductModalTitle] = useRef<string>('')

  const [currentProductId, setCurrentProductId] = useRef<string>('')

  const [formMode, setFormMode] = useRef<'create' | 'update'>('create')

  const [tabDisabled, setTabDisabled] = useRef<boolean>(true)

  const [fileList, setFileList] = useRef<
    {
      [key: string]: any
    }[]
  >([])

  watch(
    formMode,
    newValue => {
      setProductModalTitle(newValue === 'create' ? '新增商品' : '编辑商品')
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
    productModalTitle,
    setProductModalTitle,
    formMode,
    setFormMode,
    currentProductId,
    setCurrentProductId,
    pics,
    setPics,
    tabDisabled,
    setTabDisabled,
    fileList,
    setFileList
  }
})
