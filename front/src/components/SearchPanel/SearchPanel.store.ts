import useRef from '@/hooks/useRef'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface Search {
  title: string
  dataIndex: string
}

export const useSearchPanelStore = defineStore('component-search-panel', () => {
  const formState: Record<string, string> = reactive({})

  const [searchs, setSearchs] = useRef<Search[]>([])

  const resetFormState = () => {
    // 遍历 formState 的所有键，并将每个键的值设置为空字符串
    for (const key in formState) {
      if (Object.prototype.hasOwnProperty.call(formState, key)) {
        formState[key] = ''
      }
    }
  }

  const addAttributes = (dataIndex: string) => {
    // 检查属性是否已经存在
    if (!Object.prototype.hasOwnProperty.call(formState, dataIndex)) {
      // 如果属性不存在，则添加属性
      formState[dataIndex] = ''
    }
  }

  const removeAttributes = (dataIndex: string) => {
    // 检查属性是否存在
    if (Object.prototype.hasOwnProperty.call(formState, dataIndex)) {
      // 如果属性存在，则删除属性
      delete formState[dataIndex]
    }
  }

  const addSearch = (obj: Search) => {
    // 检查是否已经存在具有相同 title 的 Search 对象
    const existingIndex = searchs.value.findIndex(
      search => search.title === obj.title
    )
    if (existingIndex === -1) {
      // 如果不存在，则添加新的 Search 对象
      setSearchs([...searchs.value, obj])
    }
  }

  const removeSearch = (obj: Search) => {
    // 检查是否存在具有相同 title 的 Search 对象
    const existingIndex = searchs.value.findIndex(
      search => search.title === obj.title
    )
    if (existingIndex !== -1) {
      // 如果存在，则删除该 Search 对象
      setSearchs(searchs.value.filter((_, index) => index !== existingIndex))
    }
  }

  const add = (obj: Search) => {
    addAttributes(obj.dataIndex)
    addSearch(obj)
  }

  const remove = (obj: Search) => {
    removeAttributes(obj.dataIndex)
    removeSearch(obj)
  }

  return {
    formState,
    searchs,
    add,
    remove,
    resetFormState
  }
})
