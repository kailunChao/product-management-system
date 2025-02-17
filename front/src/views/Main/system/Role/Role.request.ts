import request from '@/service'

interface CreateRoleRequest {
  name: string
  introduce: string
  subMenus: string[]
}

type UpdateRoleRequest = Partial<CreateRoleRequest>

export const getAllRolesRequest = () =>
  request.get({
    url: '/role/all'
  })

export const getRolesRequest = (params: { page: number; row: number }) =>
  request.get({
    url: '/role',
    params
  })

export const createRoleRequest = (data: CreateRoleRequest) =>
  request.post({
    url: '/role',
    data
  })

export const removeRolesRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/role',
    data
  })

export const updateRolesRequest = (id: string, data: UpdateRoleRequest) =>
  request.patch({
    url: `/role/${id}`,
    data
  })
