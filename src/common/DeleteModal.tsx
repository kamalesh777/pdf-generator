import { Modal, Button } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { mutate } from 'swr'
import ToastMessage from './ToastMessage'

interface propTypes {
  API_URL: string
  MUTATE_URL: string
  deleteModalState: boolean
  setDeleteModalState: (params: boolean) => void
  children?: React.ReactNode
  width?: number
}

const DeleteModal = ({ API_URL, deleteModalState, setDeleteModalState, MUTATE_URL, children, width }: propTypes): JSX.Element => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const deleteCorpHandler = async (): Promise<void> => {
    setBtnLoading(true)
    try {
      const response = await axios.post(API_URL)
      if (response.data.success) {
        mutate(MUTATE_URL, null, true)
        ToastMessage('success', '', response.data.message)
      } else {
        ToastMessage('error', '', response.data.message)
      }
    } catch (err) {
      ToastMessage('error', '', err.message)
    } finally {
      setBtnLoading(false)
      destroyModal()
    }
  }
  const destroyModal = (): void => {
    setDeleteModalState(false)
  }
  return (
    <Modal
      title="Delete"
      onCancel={destroyModal}
      centered
      width={width || 350}
      open={deleteModalState}
      footer={[
        <Button danger type="primary" key="button" disabled={btnLoading} loading={btnLoading} onClick={deleteCorpHandler}>
          Delete
        </Button>,
        <Button key="back" onClick={destroyModal}>
          Cancel
        </Button>,
      ]}
    >
      {children}
      <p className="mt-0">Are you sure you want to delete?</p>
    </Modal>
  )
}

export default DeleteModal
