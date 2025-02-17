import request from '@/service'

interface CreateProductRequest {
  name: string
  price: number
  quantity: number
  subCategoryId: string
}

type UpdateProductRequest = Partial<CreateProductRequest>

export const getProductsRequest = (params: { page: number; row: number }) =>
  request.get({
    url: '/product',
    params
  })

export const createProductRequest = (data: CreateProductRequest) =>
  request.post({
    url: '/product',
    data
  })

export const removeProductsRequest = (data: { ids: string[] }) =>
  request.delete({
    url: '/product',
    data
  })

export const updateProductRequest = (id: string, data: UpdateProductRequest) =>
  request.patch({
    url: `/product/${id}`,
    data
  })

export const removeProductPicRequest = (id: string) =>
  request.delete({
    url: `/upload/${id}`
  })
