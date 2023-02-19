import { message, Upload } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { getBase64, distinct } from '@/utils/commonFunc'

interface propTypes {
  mode?: boolean
  className?: string
  maxCount?: number
  maxSize?: number
  fileType?: string
  sizeErrorMsg?: string
  hideList?: boolean
  defaultFileList?: Array<Record<string, unknown>>
  removedList?: (params) => void
  filesArray?: (param) => void
  content: React.ReactNode
}

const DragAndDrop = ({
  filesArray,
  mode,
  className,
  content,
  maxCount,
  maxSize,
  fileType,
  sizeErrorMsg,
  hideList,
  defaultFileList,
  removedList,
}: propTypes): JSX.Element => {
  const { Dragger } = Upload
  const [fileList, setFileList] = useState(defaultFileList || [])
  const [base64Files, setBase64Files] = useState([])
  const [removedArr, setRemovedArr] = useState([])

  const props = useMemo(
    () => ({
      name: 'file',
      multiple: mode || true,
      beforeUpload: file => {
        const isLt2M = file.size / 1024 / 1024 < maxSize
        if (!isLt2M) {
          message.error(sizeErrorMsg || `Image must be smaller than ${maxSize}mb!`)
        }
        return isLt2M || Upload.LIST_IGNORE
      },
      // eslint-disable-next-line consistent-return
      onChange: ({ file, fileList: arr }) => {
        if (file) {
          const isUniqueFile = fileList.filter(f => f.name === file.name).length > 0
          const isMaximum = arr.length > maxCount

          if (isUniqueFile) {
            setFileList(state => [...state])
            // message.error(`${file.name} is duplicate file`);
            return false
          }

          if (isMaximum) {
            setFileList(arr.slice(0, maxCount))
            // message.error(`Maximum ${maxCount} files are allowed`);
            return false
          }
          setFileList(prevState => [...prevState, file])
        }
      },
      onRemove: file => {
        if (fileList.some(item => item.uid === file.uid || item?._id === file?._id)) {
          setFileList(fList => fList.filter(item => item.uid !== file.uid))
          setBase64Files(fList => fList.filter(item => item.uid !== file.uid))

          const arr = fileList.filter(item => item.uid === file.uid)
          setRemovedArr([...removedArr, ...arr])
        }
        return false
      },
      defaultFileList,
    }),
    [fileList],
  )

  // on every removed id will be add on removeArr
  useEffect(() => {
    removedList(removedArr)
  }, [fileList])

  // onChange of fileList fileArray function will call
  useEffect(() => {
    fileList?.map(file =>
      !file.hasOwnProperty('_id')
        ? getBase64(file.originFileObj, url => {
            setBase64Files(prevState => [
              ...prevState,
              {
                name: file?.name,
                file: url,
                uid: file?.uid,
                type: file?.type,
              },
            ])
          })
        : setBase64Files(prevState => [...prevState, { name: file?.name, _id: file?._id, type: file?.mime_type }]),
    )
  }, [fileList])

  useEffect(() => {
    // object will merge with same uid
    filesArray(distinct(base64Files, ['uid'], false))
  }, [base64Files])

  return (
    <div className={`drag-box ${className}`}>
      <Dragger {...props} fileList={fileList} removedList={removedList} accept={fileType} showUploadList={!hideList}>
        {content}
      </Dragger>
    </div>
  )
}

export default DragAndDrop
