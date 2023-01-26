import { Button } from 'antd'
import React, { useState } from 'react'
import CreateInvoice from '@/components/CreateInvoice'

const Invoice = (): JSX.Element => {
  const [modalState, setModalState] = useState<boolean>(false)
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Create a new invoice</h3>
        <Button onClick={() => setModalState(true)} type="primary">
          Create
        </Button>
      </div>
      <CreateInvoice {...{ modalState, setModalState }} />
    </>
  )
}

export default Invoice
