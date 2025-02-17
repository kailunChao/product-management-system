import request from '@/service'

export interface CreateCategoryRequest {
  name: string
  icon?: string
  introduce?: string
  categoryId?: string
}

type UpdateCategoryRequest = Partial<CreateCategoryRequest>

export const getCategoriesRequest = (params: { page: number; row: number }) =>
  request.get({
    url: '/category',
    params
  })

export const getAllCategoriesRequest = () =>
  request.get({
    url: '/category/all'
  })

export const createCategoryRequest = (data: CreateCategoryRequest) =>
  request.post({
    url: '/category/firstCategory',
    data
  })

export const createSubCategoryRequest = (data: CreateCategoryRequest) =>
  request.post({
    url: '/category/subCategory',
    data
  })

export const updateCategoryRequest = (
  id: string,
  data: UpdateCategoryRequest
) =>
  request.patch({
    url: `/category/firstCategory/${id}`,
    data
  })

export const updateSubCategoryRequest = (
  id: string,
  data: UpdateCategoryRequest
) =>
  request.patch({
    url: `/category/subCategory/${id}`,
    data
  })

export const removeCategoriesRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/category/firstCategory',
    data
  })

export const removeSubCategoriesRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/category/subCategory',
    data
  })
