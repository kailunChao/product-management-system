import { defineStore } from 'pinia'
import { getProductsRequest } from './ProductInformation.request'
import useRef from '@/hooks/useRef'
import { Category, SubCategory } from '../ProductCategory/ProductCategory.store'
import { useSearchPanelStore } from '@/components/SearchPanel/SearchPanel.store'

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  category: ProductCategory
  pics: File[]
}

export interface File {
  id: string
  type: string
  userId: string
  itemId: string
  fieldname: string
  originalname: string
  mimetype: string
  filename: string
  path: string
  size: string
  createdAt: string
  updatedAt: string
}

interface ProductCategory extends Omit<Category, 'subCategories'> {
  subCategory: SubCategory
}

export const useProductStore = defineStore('system-product', () => {
  const [products, setProducts] = useRef<Product[]>([])
  const [page, setPage] = useRef<number>(1)
  const [row, setRow] = useRef<number>(8)
  const [total, setTotal] = useRef<number>(0)
  const searchPanelStore = useSearchPanelStore()

  const setProductsAction = () => {
    return getProductsRequest({
      ...searchPanelStore.formState,
      page: page.value,
      row: row.value
    })
      .then(res => {
        console.log(res)
        setTotal(res.meta.total)
        setProducts(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  return {
    page,
    setPage,
    row,
    setRow,
    total,
    setTotal,
    products,
    setProducts,
    setProductsAction
  }
})
