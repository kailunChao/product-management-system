import { defineStore } from 'pinia'
import useRef from '@/hooks/useRef'

export interface DropdownData {
  title: string
  dataIndex: string
}

export const usePanelStore = defineStore('component-panel', () => {
  const [deleteButtonText, setDeleteButtonText] = useRef<string>('')
  const [isDeleteButtonShow, setIsDeleteButtonShow] = useRef<boolean>(false)
  // const [dropdownData, setDropdownData] = useRef<DropdownData[]>([])

  const setDeleteButtonState = (text: string, isShow: boolean) => {
    setDeleteButtonText(text)
    setIsDeleteButtonShow(isShow)
  }

  return {
    deleteButtonText,
    setDeleteButtonText,
    isDeleteButtonShow,
    setIsDeleteButtonShow,
    setDeleteButtonState,
    // dropdownData,
    // setDropdownData
  }
})
