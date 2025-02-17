import request from '@/service'

export interface CreateMenuRequest {
  name: string
  icon?: string
  path?: string
  introduce?: string
  menuId?: string
}

type UpdateMenuRequest = Partial<CreateMenuRequest>

export const getMenuRequest = (params: { page: number; row: number }) =>
  request.get({
    url: '/menu',
    params
  })

export const getAllMenuRequest = () =>
  request.get({
    url: '/menu/all'
  })

export const createMenuRequest = (data: CreateMenuRequest) =>
  request.post({
    url: '/menu/firstMenu',
    data
  })

export const createSubMenuRequest = (data: CreateMenuRequest) =>
  request.post({
    url: '/menu/subMenu',
    data
  })

export const updateMenuRequest = (id: string, data: UpdateMenuRequest) =>
  request.patch({
    url: `/menu/firstMenu/${id}`,
    data
  })

export const updateSubMenuRequest = (id: string, data: UpdateMenuRequest) =>
  request.patch({
    url: `/menu/subMenu/${id}`,
    data
  })

export const removeMenusRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/menu/firstMenu',
    data
  })

export const removeSubMenusRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/menu/subMenu',
    data
  })
