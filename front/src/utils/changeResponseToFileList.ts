interface OriginalItem {
  response: {
    data: {
      id: string
      path: string
      [key: string]: any
    }
  }
}

interface ProcessedItem {
  url: string
  status: 'done'
  uid: string
  [key: string]: any
}

function changeResponseToFileList(
  originalItems: OriginalItem[]
): ProcessedItem[] {
  return originalItems.map(item => ({
    ...item.response.data,
    url: item.response.data.path,
    status: 'done' as const,
    uid: item.response.data.id,
    process: true
  }))
}

export default changeResponseToFileList
