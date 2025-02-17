import { defineStore } from 'pinia'
import { getAllRolesRequest, getRolesRequest } from './Role.request'
import useRef from '@/hooks/useRef'
import { Menu } from '../Menu/Menu.store'

export interface RoleState {
  id: string
  name: string
  introduce: string
  menus: Menu[]
}

export const useRoleStore = defineStore('system-role', () => {
  const [allRoles, setAllRoles] = useRef<RoleState[]>([])
  const [roles, setRoles] = useRef<RoleState[]>([])
  const [page, setPage] = useRef<number>(1)
  const [row, setRow] = useRef<number>(8)
  const [total, setTotal] = useRef<number>(0)

  const setAllRolesAction = () => {
    return getAllRolesRequest()
      .then(res => {
        setAllRoles(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  const setRolesAction = () => {
    return getRolesRequest({
      page: page.value,
      row: row.value
    })
      .then(res => {
        console.log(res)
        setTotal(res.meta.total)
        setRoles(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  return {
    allRoles,
    setAllRoles,
    setAllRolesAction,
    page,
    setPage,
    row,
    setRow,
    total,
    setTotal,
    roles,
    setRoles,
    setRolesAction
  }
})
