import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import useRef from '@/hooks/useRef'
import { CreateCategoryRequest } from '../../ProductCategory.request'

export const useCategoryModalStore = defineStore(
  'product-category-modal',
  () => {
    const [whichCategory, setWhichCategory] = useRef<
      'category' | 'subCategory'
    >('category')

    // 弹窗中的表单
    const initialFormState: CreateCategoryRequest =
      whichCategory.value === 'category'
        ? {
            name: '',
            icon: '',
            introduce: ''
          }
        : {
            name: '',
            introduce: ''
          }

    const formState = reactive<CreateCategoryRequest>({ ...initialFormState })
    const formStateCopy = reactive<CreateCategoryRequest>({
      ...initialFormState
    })

    const resetFormState = () => {
      Object.assign(formState, initialFormState)
    }

    const resetFormStateCopy = () => {
      Object.assign(formStateCopy, initialFormState)
    }

    const setFormState = (newState: CreateCategoryRequest) => {
      Object.assign(formState, newState)
    }

    const setFormStateCopy = (newState: CreateCategoryRequest) => {
      Object.assign(formStateCopy, newState)
    }

    const [currentCategoryId, setCurrentCategoryId] = useRef<string>('')

    const [categoryModalTitle, setCategoryModalTitle] = useRef<string>('')

    const [formMode, setFormMode] = useRef<'create' | 'update'>('create')

    watch(
      [whichCategory, formMode],
      ([newMenu, newFormMode]) => {
        setCategoryModalTitle(
          newMenu === 'category'
            ? newFormMode === 'create'
              ? '新增分类'
              : '编辑分类'
            : newFormMode === 'create'
            ? '新增子类目'
            : '编辑子类目'
        )
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
      formMode,
      setFormMode,
      whichCategory,
      setWhichCategory,
      currentCategoryId,
      setCurrentCategoryId,
      categoryModalTitle,
      setCategoryModalTitle
    }
  }
)
