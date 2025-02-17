import { defineStore } from 'pinia'
import useRef from '@/hooks/useRef'
import { getAllMenuRequest, getMenuRequest } from './Menu.request'

export interface Menu {
  id: string
  name: string
  icon: string
  introduce: string
  subMenus: SubMenu[] | []
  createdAt: string
  updatedAt: string
}

export interface SubMenu {
  id: string
  name: string
  path: string
  introduce: string
  createdAt: string
  updatedAt: string
}

export const useMenuStore = defineStore('system-menu', () => {
  const [menus, setMenus] = useRef<Menu[]>([])
  const [allMenus, setAllMenus] = useRef<Menu[]>([])
  const [page, setPage] = useRef<number>(1)
  const [row, setRow] = useRef<number>(10)
  const [total, setTotal] = useRef<number>(0)

  const setMenusAction = () => {
    return getMenuRequest({
      page: page.value,
      row: row.value
    })
      .then(res => {
        console.log(res)
        setTotal(res.meta.total)
        setMenus(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  const setAllMenusAction = () => {
    return getAllMenuRequest()
      .then(res => {
        console.log(res)
        setAllMenus(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  return {
    menus,
    setMenus,
    page,
    setPage,
    row,
    setRow,
    total,
    setTotal,
    setMenusAction,
    allMenus,
    setAllMenus,
    setAllMenusAction
  }
})
