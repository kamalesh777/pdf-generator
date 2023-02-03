export const getBase64 = (file, cb) => { //eslint-disable-line
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    cb(reader.result)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error) //eslint-disable-line
  }
}

// generate ranmod character
export const makeRandomCharacter = (length): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

// generate random string
export const randomString = Math.random().toString(36).substring(2, 8)

export const byteArrayToPDF = (result): void => {
  const bytes = new Uint8Array(result?.bytecode?.data) // pass your byte response to this constructor
  const blob = new Blob([bytes], { type: 'application/pdf' }) // change resultByte to bytes

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = result.filename
  link.click()
}
