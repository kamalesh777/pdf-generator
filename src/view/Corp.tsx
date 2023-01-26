import { Button } from 'antd'
import React, { useState } from 'react'
import CreateCorp from '@/components/CreateCorp'

const Corp = (): JSX.Element => {
  const [modalState, setModalState] = useState<boolean>(false)
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Create a new corp</h3>
        <Button onClick={() => setModalState(true)} type="primary">
          Create
        </Button>
      </div>
      <CreateCorp {...{ modalState, setModalState }} />
    </>
  )
}

export default Corp
