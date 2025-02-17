import { defineStore } from 'pinia'
import { getUsersRequest } from './User.request'
import useRef from '@/hooks/useRef'
import { UserInfo } from '../../Main.store'
import { useSearchPanelStore } from '@/components/SearchPanel/SearchPanel.store'

interface UserInfoWithKey extends UserInfo {
  key: string
}

export const useUserStore = defineStore('system-user', () => {
  const [users, setUsers] = useRef<UserInfoWithKey[]>([])
  const [page, setPage] = useRef<number>(1)
  const [row, setRow] = useRef<number>(6)
  const [total, setTotal] = useRef<number>(0)
  const searchPanelStore = useSearchPanelStore()

  const setUsersAction = () => {
    return getUsersRequest({
      ...searchPanelStore.formState,
      page: String(page.value),
      row: String(row.value)
    })
      .then(res => {
        console.log(res)
        setTotal(res.meta.total)
        setUsers(res.data)
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  return {
    users,
    page,
    row,
    total,
    setUsersAction,
    setUsers,
    setPage,
    setRow,
    setTotal
  }
})
