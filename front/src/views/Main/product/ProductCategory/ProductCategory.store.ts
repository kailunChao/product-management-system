import { defineStore } from 'pinia'
import useRef from '@/hooks/useRef'
import {
  getAllCategoriesRequest,
  getCategoriesRequest
} from './ProductCategory.request'

export interface Category {
  id: string
  name: string
  icon: string
  introduce: string
  subCategories: SubCategory[] | []
  createdAt: string
  updatedAt: string
}

export interface SubCategory {
  id: string
  name: string
  introduce: string
  createdAt: string
  updatedAt: string
}

export const useCategoryStore = defineStore('product-category', () => {
  const [categories, setCategories] = useRef<Category[]>([])
  const [allCategories, setAllCategories] = useRef<Category[]>([])
  const [page, setPage] = useRef<number>(1)
  const [row, setRow] = useRef<number>(10)
  const [total, setTotal] = useRef<number>(0)

  const setCategoriesAction = () => {
    return getCategoriesRequest({
      page: page.value,
      row: row.value
    })
      .then(res => {
        console.log(res)
        setTotal(res.meta.total)
        setCategories(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  const setAllCategoriesAction = () => {
    return getAllCategoriesRequest()
      .then(res => {
        console.log(res)
        setAllCategories(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  return {
    categories,
    setCategories,
    allCategories,
    setAllCategories,
    page,
    setPage,
    row,
    setRow,
    total,
    setTotal,
    setCategoriesAction,
    setAllCategoriesAction
  }
})
