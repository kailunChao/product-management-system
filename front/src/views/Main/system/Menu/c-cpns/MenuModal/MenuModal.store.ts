import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import useRef from '@/hooks/useRef'
import { CreateMenuRequest } from '../../Menu.request'

export const useMenuModalStore = defineStore('system-menu-modal', () => {
  const [whichMenu, setWhichMenu] = useRef<'menu' | 'subMenu'>('menu')

  // 弹窗中的表单
  const initialFormState: CreateMenuRequest =
    whichMenu.value === 'menu'
      ? {
          name: '',
          icon: '',
          introduce: ''
        }
      : {
          name: '',
          path: '',
          introduce: ''
        }

  const formState = reactive<CreateMenuRequest>({ ...initialFormState })
  const formStateCopy = reactive<CreateMenuRequest>({ ...initialFormState })

  const resetFormState = () => {
    Object.assign(formState, initialFormState)
  }

  const resetFormStateCopy = () => {
    Object.assign(formStateCopy, initialFormState)
  }

  const setFormState = (newState: CreateMenuRequest) => {
    Object.assign(formState, newState)
  }

  const setFormStateCopy = (newState: CreateMenuRequest) => {
    Object.assign(formStateCopy, newState)
  }

  const [currentMenuId, setCurrentMenuId] = useRef<string>('')

  const [menuModalTitle, setMenuModalTitle] = useRef<string>('')

  const [formMode, setFormMode] = useRef<'create' | 'update'>('create')

  watch(
    [whichMenu, formMode],
    ([newMenu, newFormMode]) => {
      setMenuModalTitle(
        newMenu === 'menu'
          ? newFormMode === 'create'
            ? '新增菜单'
            : '编辑菜单'
          : newFormMode === 'create'
          ? '新增子菜单'
          : '编辑子菜单'
      )
    },
    { immediate: true }
  )

  return {
    formState,
    setFormState,
    whichMenu,
    setWhichMenu,
    currentMenuId,
    setCurrentMenuId,
    formStateCopy,
    setFormStateCopy,
    resetFormState,
    resetFormStateCopy,
    menuModalTitle,
    setMenuModalTitle,
    formMode,
    setFormMode
  }
})
