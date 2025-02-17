import request from '@/service'
import { UserInfo } from '../../Main.store'

export type CreateUserRequest = Omit<
  UserInfo,
  'id' | 'createdAt' | 'updatedAt' | 'avatar'
>

export type UpdateUserRequest = Omit<
  UserInfo,
  'createdAt' | 'updatedAt' | 'avatar'
>

export const createUserRequest = (data: CreateUserRequest) =>
  request.post({
    url: '/user',
    data
  })

export const getUsersRequest = (params: {
  page: string
  row: string
  name?: string
  realname?: string
  phoneNumber?: string
  enable?: string
}) =>
  request.get({
    url: '/user',
    params
  })

export const removeUsersRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/user',
    data
  })

export const updateUserByIdRequest = (id: string, data: UpdateUserRequest) =>
  request.patch({
    url: `/user/${id}`,
    data
  })
