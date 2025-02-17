const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return formData
}

export default uploadFile
