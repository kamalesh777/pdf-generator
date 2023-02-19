export const getBase64 = (file, cb) => { //eslint-disable-line
  const reader = new FileReader()
  if (!!file) {
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
    console.log('Error: ', error) //eslint-disable-line
    }
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

// Merge Array of Object without duplicate data
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMergeObject = (original, newdata, selector = 'key') => {
  newdata.forEach(dat => {
    const foundIndex = original.findIndex(ori => ori[selector] == dat[selector])
    if (foundIndex >= 0) original.splice(foundIndex, 1, dat)
    else original.push(dat)
  })
  return original
}

/* 
duplicate object will be delete  
if its true then the old object will show and if false then duplicate but the current data will show
use case: distinct(data, ['id'], false)
checking for id and data for all data and false used to show changes data or new data
*/
export const distinct = (arr, indexedKeys, isPrioritizeFormer = true): Array<Record<string, unknown>> => {
  const lookup = new Map()
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const makeIndex = el => indexedKeys.reduce((index, key) => `${index};;${el && el[key]}`, '')
  arr.forEach(el => {
    const index = makeIndex(el)
    if (lookup.has(index) && isPrioritizeFormer) {
      return
    }
    lookup.set(index, el)
  })

  return Array.from(lookup.values())
}

export const deleteDuplicateObj = (array): Array<Record<string, unknown>> =>
  Object.values(
    array.reduce((a, c) => {
      a[c?.id] = c
      return a
    }, {}),
  )
