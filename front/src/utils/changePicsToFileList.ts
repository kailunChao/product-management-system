import { BASE_URL } from '@/config'
import { File } from '@/views/Main/product/ProductInformation/ProductInformation.store'

interface ProcessedFile {
  name: string
  url: string
  thumbUrl: string
  status: 'done'
  uid: string
  process: boolean
}

const changePicsToFileList = (items: File[]): ProcessedFile[] =>
  items.map(item => ({
    name: item.originalname,
    url: BASE_URL + item.path,
    thumbUrl: BASE_URL + item.path,
    status: 'done',
    uid: item.id,
    process: true
  }))

export default changePicsToFileList
