import { Modal, Button } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { mutate } from 'swr'
import ToastMessage from './ToastMessage'

interface propTypes {
  objId: string
  deleteModalState: boolean
  setDeleteModalState: (params: boolean) => void
}

const DeleteModal = ({ objId, deleteModalState, setDeleteModalState }: propTypes): JSX.Element => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const deleteCorpHandler = async (): Promise<void> => {
    setBtnLoading(true)
    try {
      const response = await axios.post(`http://localhost:5000/api/corp-srv/delete-corp/${objId}`)
      mutate('http://localhost:5000/api/corp-srv/corp-list', null, true)
      ToastMessage('success', '', response.data.message)
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
      width={350}
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
      <p className="mt-0">Are you sure you want to delete?</p>
    </Modal>
  )
}

export default DeleteModal
