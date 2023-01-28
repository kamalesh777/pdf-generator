import { Modal, Button } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { mutate } from 'swr'

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
      await axios.post(`http://localhost:5000/api/corp-srv/delete-corp/${objId}`)
      mutate('http://localhost:5000/api/corp-srv/corp-list', null, true)
    } catch (err) {
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
      width={500}
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
      <span>Are you sure you want to delete?</span>
    </Modal>
  )
}

export default DeleteModal
