const validatePhoneNumber = (value: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (value === '') reject('请输入手机号')
    if (value.length < 11) reject('请输入完整手机号')
    return resolve()
  })

export default validatePhoneNumber
